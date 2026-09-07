// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on('Myanmar Business Type', {
    refresh: function(frm) {
        // Add custom buttons or actions here
    },
    
    before_save: function(frm) {
        // Validate before save
        if (!frm.doc.business_type) {
            frappe.throw(__('Business Type is required'));
        }
    }
});
