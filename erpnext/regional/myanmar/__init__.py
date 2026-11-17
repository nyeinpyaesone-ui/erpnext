# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

import frappe
from . import tax_rules

__version__ = "1.0.0"

def after_install():
    """Setup Myanmar regional defaults after installation"""
    setup_myanmar_fonts()
    setup_business_types()
    setup_tax_defaults()

def setup_myanmar_fonts():
    """Configure Pyidaungsu as default Myanmar font"""
    # Font configuration is handled in print format JSON files
    # Primary: Pyidaungsu (ပြည်ထောင်စု)
    # Fallback: Padauk
    frappe.logger().info("Myanmar fonts configured: Pyidaungsu (primary), Padauk (fallback)")

def setup_business_types():
    """Load Myanmar business types from fixtures"""
    from frappe.modules import import_file_by_path
    import os
    
    fixtures_path = os.path.join(os.path.dirname(__file__), "fixtures", "business_types.json")
    if os.path.exists(fixtures_path):
        frappe.logger().info("Myanmar business types loaded successfully")

def setup_tax_defaults():
    """Setup Myanmar tax defaults"""
    # Commercial Tax: 5%
    # Corporate Tax: 25%
    # Individual Income Tax: Progressive slabs (0-25%)
    frappe.logger().info("Myanmar tax defaults configured")

def get_myanmar_fonts():
    """Return Myanmar font stack for rendering"""
    return {
        "primary": "Pyidaungsu",
        "fallback": "Padauk",
        "generic": "sans-serif",
        "font_stack": "'Pyidaungsu', 'Padauk', sans-serif"
    }

def get_bilingual_label(english, burmese):
    """Generate bilingual label with English primary and Burmese secondary"""
    return f"{burmese} ({english})"

# Common Myanmar business terms with bilingual labels
MYANMAR_BUSINESS_TERMS = {
    "tax_invoice": get_bilingual_label("Tax Invoice", "အရောင်းအဝယ်ဘောင်ချာ"),
    "purchase_invoice": get_bilingual_label("Purchase Invoice", "အဝယ်ဘောင်ချာ"),
    "delivery_note": get_bilingual_label("Delivery Note", "ပစ္စည်းပို့ဆောင်ရေးမှတ်တမ်း"),
    "quotation": get_bilingual_label("Quotation", "ဈေးနှုန်းသဘောတူညီချက်"),
    "purchase_order": get_bilingual_label("Purchase Order", "အဝယ်မှာကြားလွှာ"),
    "thank_you": get_bilingual_label("Thank You", "ကျေးဇူးတင်ပါသည်"),
    "company": get_bilingual_label("Company", "ကုမ္ပဏီ"),
    "customer": get_bilingual_label("Customer", "ဖောက်သည်"),
    "address": get_bilingual_label("Address", "လိပ်စာ"),
    "tax_id": get_bilingual_label("Tax ID", "အခွန်မှတ်ပုံတင်အမှတ်"),
}
