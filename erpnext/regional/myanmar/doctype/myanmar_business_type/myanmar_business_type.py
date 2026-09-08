# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe

def get_myanmar_business_types():
    """
    Returns list of Myanmar-specific business types commonly used in local commerce
    """
    return [
        "Sole Proprietorship (တစ်ဦးတိုင်လုပ်ငန်း)",
        "Partnership (ပူးပေါင်းလုပ်ငန်း)",
        "Private Limited Company (ကုမ္ပဏီလimited)",
        "Public Limited Company (အများပိုင်ကုမ္ပဏီ)",
        "Cooperative Society (သမဝါယမအသင်း)",
        "Non-Profit Organization (အမြတ်မယူသောအဖွဲ့အစည်း)",
        "Branch Office (ကိုယ်စားလှယ်ရုံး)",
        "Representative Office (သတင်းအချက်အလက်ရုံး)",
        "Joint Venture (ပူးပေါင်းဆောင်ရွက်ရေးလုပ်ငန်း)",
        "Small and Medium Enterprise (အသေးစားနှင့်အလတ်စားလုပ်ငန်း)",
        "Family Business (မိသားစုလုပ်ငန်း)",
        "Retail Shop (လက်လီအရောင်းဆိုင်)",
        "Wholesale Trader (လက်ကားကုန်သည်)",
        "Manufacturer (ထုတ်လုပ်သူ)",
        "Service Provider (ဝန်ဆောင်မှုပေးသူ)",
        "Trading Company (ကုန်သွယ်ရေးကုမ္ပဏီ)",
        "Import/Export Business (သွင်းကုန်/ထုတ်ကုန်လုပ်ငန်း)",
        "Agricultural Business (စိုက်ပျိုးရေးလုပ်ငန်း)",
        "Livestock Business (မွေးမြူရေးလုပ်ငန်း)",
        "Fishery Business (ငါးလုပ်ငန်း)",
        "Mining Business (တွင်းထွက်လုပ်ငန်း)",
        "Construction Company (ဆောက်လုပ်ရေးကုမ္ပဏီ)",
        "Transportation Service (သယ်ယူပို့ဆောင်ရေးဝန်ဆောင်မှု)",
        "Hotel & Tourism (ဟိုတယ်နှင့်ခရီးသွားလုပ်ငန်း)",
        "Restaurant & Food Service (စားသောက်ဆိုင်နှင့်အစားအစာဝန်ဆောင်မှု)",
        "Healthcare Clinic (ကျန်းမာရေးကလင်နစ်)",
        "Educational Institution (ပညာရေးအဖွဲ့အစည်း)",
        "Religious Organization (ဘာသာရေးအဖွဲ့အစည်း)",
        "NGO/INGO (အစိုးရမဟုတ်သောအဖွဲ့အစည်း)",
        "Microfinance Institution (အဏုကြေးငွေအဖွဲ့အစည်း)",
        "Money Changer (ငွေလဲလှယ်ရေးလုပ်ငန်း)",
        "Gem & Jewelry Business (ရတနာနှင့်ရွှေချည်လုပ်ငန်း)",
        "Textile & Garment (အထည်အလိပ်နှင့်အဝတ်အထည်လုပ်ငန်း)",
        "IT & Technology Service (နည်းပညာနှင့်အိုင်တီဝန်ဆောင်မှု)",
        "Telecommunications (ဆက်သွယ်ရေးလုပ်ငန်း)",
        "Energy & Power (စွမ်းအင်နှင့်လျှပ်စစ်ဓာတ်အားလုပ်ငန်း)",
        "Real Estate Developer (အိမ်ခြံမြေဖွံ့ဖြိုးရေးလုပ်ငန်း)",
        "Consulting Firm (အကြံပေးကုမ္ပဏီ)",
        "Advertising Agency (ကြော်ငြာအေဂျင်စီ)",
        "Media & Publishing (မီဒီယာနှင့်ထုတ်ဝေရေးလုပ်ငန်း)",
        "Entertainment Business (ဖျော်ဖြေရေးလုပ်ငန်း)",
        "Sports & Recreation (အားကစားနှင့်အပန်းဖြေရေးလုပ်ငန်း)"
    ]

@frappe.whitelist()
def setup_myanmar_localization():
    """
    Setup Myanmar-specific localization including business types, tax rules, and compliance
    """
    try:
        # Create Myanmar Business Type records
        business_types = get_myanmar_business_types()
        
        for bt_name in business_types:
            if not frappe.db.exists("Myanmar Business Type", {"business_type": bt_name}):
                doc = frappe.get_doc({
                    "doctype": "Myanmar Business Type",
                    "business_type": bt_name,
                    "enabled": 1
                })
                doc.insert(ignore_permissions=True)
        
        frappe.db.commit()
        return {"success": True, "message": "Myanmar localization setup completed successfully"}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Myanmar Localization Setup Error")
        return {"success": False, "message": str(e)}
