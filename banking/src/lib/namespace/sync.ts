/**
 * Frappe Model Sync Utilities
 * Handles document synchronization between server and client for Myanmar business operations
 */

import isPlainObject from "lodash.isplainobject";
import type { Document, SyncResponse, DocInfo, LocalsMap } from './types';

// Ensure frappe namespace exists
if (!window.frappe) {
    window.frappe = {} as any;
}

const frappe = window.frappe;

// Initialize docinfo if not exists
if (!frappe.model) {
    frappe.model = {} as any;
}

interface FrappeModelExtended {
    docinfo: Record<string, Record<string, DocInfo>>;
    sync: (r: SyncResponse) => unknown[];
    sync_docinfo: (r: SyncResponse) => unknown[];
    add_to_locals: (doc: Document) => void;
    update_in_locals: (doc: Document) => void;
    remove_from_locals: (doctype: string, name: string) => void;
    get_new_name: (doctype: string) => string;
    clear_doc: (doc: Document) => void;
    get_field: (doctype: string, fieldname: string) => any | null;
    table_fields: string[];
    [key: string]: unknown;
}

const model = frappe.model as FrappeModelExtended;

model.docinfo = {};

/**
 * Sync documents from server response to local storage
 * @param r - Server response containing docs and/or docinfo
 * @returns Array of synced documents
 */
model.sync = function(r: SyncResponse): unknown[] {
    let isPlain: boolean;
    
    // Normalize input - wrap single doc in array
    if (!r.docs && !r.docinfo) {
        r = { docs: r };
    }

    isPlain = isPlainObject(r.docs);
    if (isPlain) {
        r.docs = [r.docs as Document];
    }

    // Sync each document
    if (r.docs) {
        for (let i = 0, l = r.docs.length; i < l; i++) {
            const d = r.docs[i] as Document;

            if ((window.locals as LocalsMap)[d.doctype] && 
                (window.locals as LocalsMap)[d.doctype][d.name!]) {
                // Update existing document in locals
                model.update_in_locals(d);
            } else {
                // Add new document to locals
                model.add_to_locals(d);
            }

            d.__last_sync_on = new Date();
        }
    }

    // Sync document info (attachments, comments, assignments)
    model.sync_docinfo(r);
    return r.docs as unknown[];
};

/**
 * Sync document info (comments, assignments, attachments)
 * @param r - Server response with docinfo
 * @returns Array of docs
 */
model.sync_docinfo = (r: SyncResponse): unknown[] => {
    if (r.docinfo) {
        const { doctype, name } = r.docinfo;
        
        if (!model.docinfo[doctype]) {
            model.docinfo[doctype] = {};
        }
        model.docinfo[doctype][name] = r.docinfo;

        // Copy user info to boot for easy access
        if (r.docinfo.user_info && frappe.boot) {
            Object.assign(frappe.boot.user_info, r.docinfo.user_info);
        }
    }

    return r.docs as unknown[] || [];
};

/**
 * Add document to locals map
 * @param doc - Document to add
 */
model.add_to_locals = function(doc: Document): void {
    const locals = window.locals as LocalsMap;
    
    if (!locals[doc.doctype]) {
        locals[doc.doctype] = {};
    }

    // Generate new name for local documents without parentfield
    if (!doc.name && doc.__islocal) {
        if (!doc.parentfield) {
            model.clear_doc(doc);
        }

        doc.name = model.get_new_name(doc.doctype);

        if (!doc.parentfield) {
            frappe.provide(`frappe.model.docinfo.${doc.doctype}.${doc.name}`);
        }
    }

    locals[doc.doctype][doc.name!] = doc;
};

/**
 * Update document values in locals instead of replacing
 * @param doc - Document with updated values
 */
model.update_in_locals = function(doc: Document): void {
    const locals = window.locals as LocalsMap;
    const local_doc = locals[doc.doctype][doc.name!];
    
    /**
     * Clear keys that don't exist in source
     */
    const clear_keys = (source: Document, target: Document): void => {
        Object.keys(target).forEach((key) => {
            if (source[key] === undefined) {
                delete target[key];
            }
        });
    };

    for (const fieldname in doc) {
        const df = model.get_field ? model.get_field(doc.doctype, fieldname) : null;
        
        if (df && model.table_fields?.includes(df.fieldtype)) {
            // Handle table fields (child tables)
            if (!(doc[fieldname] instanceof Array)) {
                doc[fieldname] = [];
            }

            if (!(local_doc[fieldname] instanceof Array)) {
                local_doc[fieldname] = [];
            }

            // Process each row in child table
            for (let i = 0; i < doc[fieldname].length; i++) {
                const d = doc[fieldname][i] as Document;
                const local_d = local_doc[fieldname][i] as Document;
                
                if (local_d) {
                    // Ensure doctype is registered
                    if (!locals[d.doctype]) {
                        locals[d.doctype] = {};
                    }

                    // Handle new incoming rows
                    if (!d.name) {
                        d.name = model.get_new_name(doc.doctype);
                    }

                    // Re-register if needed
                    if (!locals[d.doctype][d.name!]) {
                        delete locals[d.doctype][local_d.name!];
                        locals[d.doctype][d.name!] = local_d;
                    }

                    // Update row values
                    Object.assign(local_d, d);
                    clear_keys(d, local_d);
                } else {
                    // New row - append to table
                    local_doc[fieldname].push(d);
                    if (!d.parent) {
                        d.parent = doc.name!;
                    }
                    model.add_to_locals(d);
                }
            }

            // Remove extra rows that no longer exist
            if (local_doc[fieldname].length > doc[fieldname].length) {
                for (let i = doc[fieldname].length; i < local_doc[fieldname].length; i++) {
                    const d = local_doc[fieldname][i] as Document;
                    if (locals[d.doctype] && locals[d.doctype][d.name!]) {
                        delete locals[d.doctype][d.name!];
                    }
                }
                local_doc[fieldname].length = doc[fieldname].length;
            }
        } else {
            // Handle literal fields
            local_doc[fieldname] = doc[fieldname];
        }
    }

    // Clear removed keys on parent
    clear_keys(doc, local_doc);
};

/**
 * Remove document from locals
 * @param doctype - Document type
 * @param name - Document name
 */
model.remove_from_locals = function(doctype: string, name: string): void {
    const locals = window.locals as LocalsMap;
    
    const clear_doc = (dt: string, nm: string): void => {
        const doc = locals[dt] && locals[dt][nm];
        if (!doc) return;

        let parent: string | null = null;
        let parenttype: string | undefined;
        let parentfield: string | undefined;
        
        if (doc.parenttype) {
            parent = doc.parent!;
            parenttype = doc.parenttype;
            parentfield = doc.parentfield;
        }
        
        delete locals[dt][nm];
        
        if (parent && parenttype && parentfield) {
            const parent_doc = locals[parenttype][parent];
            const newlist: Document[] = [];
            let idx = 1;
            
            parent_doc[parentfield]?.forEach((d: Document) => {
                if (d.name !== nm) {
                    newlist.push(d);
                    d.idx = idx;
                    idx++;
                }
            });
            
            parent_doc[parentfield] = newlist;
        }
    };

    clear_doc(doctype, name);
};

export default model;
