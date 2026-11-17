/**
 * Frappe Defaults Management
 * Handles user and system defaults for Myanmar business operations
 */

import type { FrappeDefaults } from './types';

// Ensure frappe namespace exists
if (!window.frappe) {
    window.frappe = {} as any;
}

const frappe = window.frappe;

/**
 * Get user default value with fallback handling
 * @param key - The default key to retrieve
 * @returns The default value or undefined
 */
export const get_user_default = (key: string): string | undefined => {
    const boot = frappe.boot;
    if (!boot?.user?.defaults) {
        return undefined;
    }
    
    const defaults = boot.user.defaults;
    let d = defaults[key];
    
    if (!d) {
        // Try normalized key (replace spaces with underscores)
        const normalizedKey = key.replace(/ /g, "_").toLowerCase();
        d = defaults[normalizedKey];
    }
    
    // Handle array values - return first element
    if (Array.isArray(d)) {
        return d[0];
    }
    
    return d;
};

// Initialize defaults object
frappe.defaults = {
    get_user_default,
} as FrappeDefaults;

export default frappe.defaults;
