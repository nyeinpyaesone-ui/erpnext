# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def execute(filters=None):
    """
    Myanmar Tax Report
    Generates tax report according to Myanmar Internal Revenue Department requirements
    """
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {
            "fieldname": "invoice_date",
            "label": _("Invoice Date"),
            "fieldtype": "Date",
            "width": 120
        },
        {
            "fieldname": "invoice_number",
            "label": _("Invoice Number"),
            "fieldtype": "Link",
            "options": "Sales Invoice",
            "width": 150
        },
        {
            "fieldname": "customer_name",
            "label": _("Customer Name"),
            "fieldtype": "Data",
            "width": 200
        },
        {
            "fieldname": "business_type",
            "label": _("Business Type"),
            "fieldtype": "Data",
            "width": 180
        },
        {
            "fieldname": "taxable_amount",
            "label": _("Taxable Amount (MMK)"),
            "fieldtype": "Currency",
            "options": "Company:company:default_currency",
            "width": 150
        },
        {
            "fieldname": "tax_rate",
            "label": _("Tax Rate (%)"),
            "fieldtype": "Percent",
            "width": 100
        },
        {
            "fieldname": "tax_amount",
            "label": _("Tax Amount (MMK)"),
            "fieldtype": "Currency",
            "options": "Company:company:default_currency",
            "width": 150
        },
        {
            "fieldname": "total_amount",
            "label": _("Total Amount (MMK)"),
            "fieldtype": "Currency",
            "options": "Company:company:default_currency",
            "width": 150
        }
    ]

def get_data(filters=None):
    conditions = get_conditions(filters)
    
    data = frappe.db.sql("""
        SELECT 
            si.posting_date as invoice_date,
            si.name as invoice_number,
            si.customer_name,
            cb.business_type,
            si.net_total as taxable_amount,
            COALESCE(tax.rate, 0) as tax_rate,
            COALESCE(tax.tax_amount, 0) as tax_amount,
            si.grand_total as total_amount
        FROM `tabSales Invoice` si
        LEFT JOIN `tabMyanmar Business Type` cb ON si.customer_name = cb.name
        LEFT JOIN `tabSales Taxes and Charges` tax ON tax.parent = si.name AND tax.charge_type = 'On Net Total'
        WHERE si.docstatus = 1
        {conditions}
        ORDER BY si.posting_date DESC
    """.format(conditions=conditions), filters or {}, as_dict=1)
    
    return data

def get_conditions(filters):
    conditions = []
    
    if filters.get("company"):
        conditions.append("si.company = %(company)s")
    
    if filters.get("from_date"):
        conditions.append("si.posting_date >= %(from_date)s")
    
    if filters.get("to_date"):
        conditions.append("si.posting_date <= %(to_date)s")
    
    if filters.get("customer"):
        conditions.append("si.customer = %(customer)s")
    
    return " AND ".join(conditions) if conditions else ""
