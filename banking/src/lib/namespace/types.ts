/**
 * Type definitions for Frappe namespace and global objects
 * Supports Myanmar business operations and localization
 */

// Global Frappe namespace types
export interface FrappeNamespace {
    boot?: FrappeBoot;
    model: FrappeModel;
    defaults: FrappeDefaults;
    flags: Record<string, unknown>;
    settings: Record<string, unknown>;
    provide: (namespace: string) => Record<string, unknown>;
}

export interface FrappeBoot {
    sysdefaults: SystemDefaults;
    user: {
        defaults: UserDefaults;
        [key: string]: unknown;
    };
    user_info: Record<string, UserInfo>;
    [key: string]: unknown;
}

export interface SystemDefaults {
    currency?: string;
    hide_currency_symbol?: string;
    [key: string]: string | undefined;
}

export interface UserDefaults {
    company?: string;
    [key: string]: string | string[] | undefined;
}

export interface UserInfo {
    name?: string;
    full_name?: string;
    image?: string;
    [key: string]: string | undefined;
}

export interface FrappeModel {
    docinfo: DocInfoMap;
    sync: (r: SyncResponse) => unknown[];
    sync_docinfo: (r: SyncResponse) => unknown[];
    add_to_locals: (doc: Document) => void;
    update_in_locals: (doc: Document) => void;
    remove_from_locals: (doctype: string, name: string) => void;
    get_new_name: (doctype: string) => string;
    clear_doc: (doc: Document) => void;
    get_field: (doctype: string, fieldname: string) => FieldMeta | null;
    table_fields: string[];
    [key: string]: unknown;
}

export interface DocInfoMap {
    [doctype: string]: {
        [name: string]: DocInfo;
    };
}

export interface DocInfo {
    doctype: string;
    name: string;
    attachments?: Attachment[];
    comments?: Comment[];
    assignments?: Assignment[];
    user_info?: Record<string, UserInfo>;
    [key: string]: unknown;
}

export interface Attachment {
    file_name: string;
    file_url: string;
    attached_to_doctype?: string;
    attached_to_name?: string;
    [key: string]: string | undefined;
}

export interface Comment {
    content: string;
    owner: string;
    creation: string;
    comment_type: string;
    [key: string]: string;
}

export interface Assignment {
    owner: string;
    description: string;
    status: string;
    [key: string]: string;
}

export interface SyncResponse {
    docs?: Document | Document[];
    docinfo?: DocInfo;
    [key: string]: unknown;
}

export interface Document {
    doctype: string;
    name?: string;
    __islocal?: boolean;
    parentfield?: string;
    parent?: string;
    parenttype?: string;
    idx?: number;
    [key: string]: unknown;
}

export interface FieldMeta {
    fieldname: string;
    fieldtype: string;
    label?: string;
    options?: string;
    [key: string]: string | undefined;
}

export interface FrappeDefaults {
    get_user_default: (key: string) => string | undefined;
    [key: string]: unknown;
}

export interface LocalsMap {
    [doctype: string]: {
        [name: string]: Document;
    };
}

// Extend window interface
declare global {
    interface Window {
        frappe?: FrappeNamespace;
    }
    
    const locals: LocalsMap;
}

// Myanmar-specific business types
export interface MyanmarBusinessType {
    name: string;
    business_type: string;
    description?: string;
    enabled: boolean;
    additional_info?: string;
}

// Myanmar tax configuration
export interface MyanmarTaxConfig {
    tax_type: string;
    description: string;
    rate?: number;
    slabs?: TaxSlab[];
    rates?: TaxRate[];
    applicable_on?: string;
    exemptions?: string[];
    currency?: string;
}

export interface TaxSlab {
    up_to?: number;
    above?: number;
    rate: number;
}

export interface TaxRate {
    type: string;
    rate: number;
}
