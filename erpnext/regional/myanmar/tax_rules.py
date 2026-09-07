# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe

def get_data():
    """Get Myanmar Commercial Tax rates as per Internal Revenue Department"""
    return [
        {
            "tax_type": "Commercial Tax",
            "description": "Standard Commercial Tax Rate (Myanmar)",
            "rate": 5.0,
            "applicable_on": "Goods and Services",
            "exemptions": [
                "Basic food items",
                "Medicines and medical equipment",
                "Educational materials",
                "Agricultural products (raw)"
            ]
        },
        {
            "tax_type": "Income Tax - Individual",
            "description": "Progressive individual income tax rates",
            "slabs": [
                {"up_to": 2000000, "rate": 0},
                {"up_to": 3000000, "rate": 5},
                {"up_to": 5000000, "rate": 10},
                {"up_to": 10000000, "rate": 15},
                {"up_to": 20000000, "rate": 20},
                {"above": 20000000, "rate": 25}
            ],
            "currency": "MMK"
        },
        {
            "tax_type": "Income Tax - Corporate",
            "description": "Corporate income tax rate",
            "rate": 25.0,
            "applicable_on": "Net Profit"
        },
        {
            "tax_type": "Withholding Tax",
            "description": "Withholding tax on various payments",
            "rates": [
                {"type": "Service", "rate": 3.5},
                {"type": "Royalty", "rate": 15},
                {"type": "Rent", "rate": 10},
                {"type": "Interest", "rate": 15}
            ]
        }
    ]

def update_itemised_tax_data(itemised_tax):
    """
    Update itemised tax data for Myanmar commercial tax compliance
    This hook is called when tax data is being prepared for invoices
    """
    # Apply Myanmar-specific tax calculations if needed
    # For now, return the default calculation
    return itemised_tax

@frappe.whitelist()
def create_myanmar_tax_templates():
    """Create Sales Tax Templates for Myanmar"""
    try:
        company = frappe.defaults.get_user_default("company")
        if not company:
            company = frappe.get_all("Company", limit=1)[0].name
        
        # Create Commercial Tax template
        if not frappe.db.exists("Sales Taxes and Charges Template", "Myanmar Commercial Tax 5%"):
            tax_template = frappe.get_doc({
                "doctype": "Sales Taxes and Charges Template",
                "title": "Myanmar Commercial Tax 5%",
                "company": company,
                "taxes": [
                    {
                        "charge_type": "On Net Total",
                        "account": frappe.get_all("Account", 
                                                 filters={"account_type": "Tax", "company": company},
                                                 limit=1)[0].name if frappe.get_all("Account", 
                                                                                 filters={"account_type": "Tax", "company": company}) 
                                else "Commercial Tax - CP",
                        "rate": 5.0,
                        "description": "Commercial Tax @ 5%"
                    }
                ]
            })
            tax_template.insert(ignore_permissions=True)
        
        frappe.db.commit()
        return {"success": True, "message": "Myanmar tax templates created successfully"}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Myanmar Tax Template Creation Error")
        return {"success": False, "message": str(e)}
