/**
 * Frappe Namespace Management
 * Provides namespace creation and initialization for Myanmar business operations
 */

import type { FrappeNamespace } from './types';

// Initialize frappe namespace if not exists
if (!window.frappe) {
    window.frappe = {} as FrappeNamespace;
}

const frappe = window.frappe;

/**
 * Create a nested namespace structure
 * @param namespace - Dot-separated namespace string (e.g., "frappe.model")
 * @returns The created or existing namespace object
 */
frappe.provide = function(namespace: string): Record<string, unknown> {
    const nsl = namespace.split(".");
    let parent: any = window;
    
    for (let i = 0; i < nsl.length; i++) {
        const n = nsl[i];
        if (!parent[n]) {
            parent[n] = {};
        }
        parent = parent[n];
    }
    return parent;
};

// Initialize core namespaces for Myanmar business support
frappe.provide("locals");
frappe.provide("frappe.flags");
frappe.provide("frappe.settings");
frappe.provide("locals.DocType");
frappe.provide("frappe.model");
frappe.provide("frappe.defaults");

export default frappe;
