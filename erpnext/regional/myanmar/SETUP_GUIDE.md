# Myanmar Localization Setup Guide
# မြန်မာနိုင်ငံဆိုင်ရာ ပြင်ဆင်မှုလမ်းညွှန်

## Complete Setup Configuration for Myanmar Business Operations
## မြန်မာလုပ်ငန်းလည်ပတ်မှုများအတွက် စုံလင်သောပြင်ဆင်မှုဖွဲ့စည်းပုံ

---

## 1. SYSTEM REQUIREMENTS (စနစ်လိုအပ်ချက်များ)

### Server Requirements
- **ERPNext Version**: 15.x or higher
- **Python**: 3.10+
- **Node.js**: 18.x or higher
- **Database**: MariaDB 10.6+ or PostgreSQL 13+

### Font Requirements (ဖောင့်လိုအပ်ချက်များ)
```bash
# Install Pyidaungsu Font (Primary - Myanmar Government Standard)
sudo apt-get install fonts-pyidaungsu  # Ubuntu/Debian
# OR manually download from: https://github.com/andjc/pyidaungsu-font

# Install Padauk Font (Fallback - SIL Open Font License)
sudo apt-get install fonts-padauk  # Ubuntu/Debian
# OR download from: https://fonts.google.com/specimen/Padauk

# Verify font installation
fc-list | grep -i "pyidaungsu\|padauk"
```

---

## 2. MODULE INSTALLATION (မော်ဒျူးထည့်သွင်းခြင်း)

### Step 2.1: Enable Myanmar Regional Module
```bash
# Navigate to bench directory
cd ~/frappe-bench

# Install Myanmar regional module
bench --site [your-site-name] install-app erpnext

# Enable Myanmar localization in System Settings
bench --site [your-site-name] console << EOF
import frappe
from erpnext.regional.myanmar import after_install
after_install()
frappe.db.commit()
EOF
```

### Step 2.2: Verify Installation
```bash
# Check if Myanmar fixtures are loaded
bench --site [your-site-name] console << EOF
import frappe
business_types = frappe.get_all("Myanmar Business Type", pluck="name")
print(f"Loaded {len(business_types)} Myanmar business types")
for bt in business_types[:5]:
    print(f"  - {bt}")
EOF
```

---

## 3. FONT CONFIGURATION (ဖောင့်ဖွဲ့စည်းမှု)

### Primary Font Stack Implementation
**Font Order**: Pyidaungsu → Padauk → Sans-Serif

#### CSS Implementation (Print Formats)
```css
font-family: 'Pyidaungsu', 'Padauk', sans-serif;
```

#### All Print Formats Using Myanmar Fonts:
1. **Myanmar Tax Invoice** (အရောင်းအဝယ်ဘောင်ချာ)
   - DocType: Sales Invoice
   - Font: Pyidaungsu, Size: 14px
   
2. **Myanmar Purchase Invoice** (အဝယ်ဘောင်ချာ)
   - DocType: Purchase Invoice
   - Font: Pyidaungsu, Size: 14px
   
3. **Myanmar Delivery Note** (ပစ္စည်းပို့ဆောင်ရေးမှတ်တမ်း)
   - DocType: Delivery Note
   - Font: Pyidaungsu, Size: 14px
   
4. **Myanmar Quotation** (ဈေးနှုန်းသဘောတူညီချက်)
   - DocType: Quotation
   - Font: Pyidaungsu, Size: 14px
   
5. **Myanmar Purchase Order** (အဝယ်မှာကြားလွှာ)
   - DocType: Purchase Order
   - Font: Pyidaungsu, Size: 14px

### PDF Generation Configuration
```python
# In Print Format JSON
{
  "font": "Pyidaungsu",
  "font_size": 14,
  "pdf_generator": "chrome"
}
```

---

## 4. BUSINESS TYPES SETUP (လုပ်ငန်းအမျိုးအစားများ)

### Pre-loaded Myanmar Business Types (၂၄ မျိုး)

#### Legal Structure Types
1. Sole Proprietorship (တစ်ဦးတိုင်လုပ်ငန်း)
2. Partnership (ပူးပေါင်းလုပ်ငန်း)
3. Private Limited Company (ကုမ္ပဏီလimited)
4. Public Limited Company (အများပိုင်ကုမ္ပဏီ)
5. Cooperative Society (သမဝါယမအသင်း)
6. Non-Profit Organization (အမြတ်မယူသောအဖွဲ့အစည်း)
7. Branch Office (ကိုယ်စားလှယ်ရုံး)
8. Representative Office (သတင်းအချက်အလက်ရုံး)
9. Joint Venture (ပူးပေါင်းဆောင်ရွက်ရေးလုပ်ငန်း)

#### Business Size & Management
10. Small and Medium Enterprise (အသေးစားနှင့်အလတ်စားလုပ်ငန်း)
11. Family Business (မိသားစုလုပ်ငန်း)

#### Industry-Specific Types
12. Retail Shop (လက်လီအရောင်းဆိုင်)
13. Wholesale Trader (လက်ကားကုန်သည်)
14. Manufacturer (ထုတ်လုပ်သူ)
15. Service Provider (ဝန်ဆောင်မှုပေးသူ)
16. Trading Company (ကုန်သွယ်ရေးကုမ္ပဏီ)
17. Agricultural Business (စိုက်ပျိုးရေးလုပ်ငန်း)
18. Livestock Business (မွေးမြူရေးလုပ်ငန်း)
19. Fishery Business (ငါးလုပ်ငန်း)
20. Construction Company (ဆောက်လုပ်ရေးကုမ္ပဏီ)
21. Hotel & Tourism (ဟိုတယ်နှင့်ခရီးသွားလုပ်ငန်း)
22. Restaurant & Food Service (စားသောက်ဆိုင်နှင့်အစားအစာဝန်ဆောင်မှု)
23. Gem & Jewelry Business (ရတနာနှင့်ရွှေချည်လုပ်ငန်း)
24. Textile & Garment (အထည်အလိပ်နှင့်အဝတ်အထည်လုပ်ငန်း)

### Access Business Types
```
Desk > Myanmar Local Business > Myanmar Business Type
```

---

## 5. TAX CONFIGURATION (အခွန်ဖွဲ့စည်းမှု)

### Myanmar Tax Rules (Internal Revenue Department Compliance)

#### 5.1 Commercial Tax (ကုန်သွယ်ရေးအခွန်)
- **Rate**: 5% (Standard)
- **Applicable On**: Goods and Services
- **Exemptions**:
  - Basic food items
  - Medicines and medical equipment
  - Educational materials
  - Agricultural products (raw)

#### 5.2 Individual Income Tax (ပုဂ္ဂိုလ်ဝင်ငွေခွန်)
**Progressive Tax Slabs (MMK)**:
| Income Range (MMK) | Tax Rate |
|-------------------|----------|
| 0 - 2,000,000     | 0%       |
| 2,000,001 - 3,000,000 | 5%   |
| 3,000,001 - 5,000,000 | 10%  |
| 5,000,001 - 10,000,000 | 15% |
| 10,000,001 - 20,000,000 | 20% |
| Above 20,000,000  | 25%      |

#### 5.3 Corporate Income Tax (ကော်ပိုရိတ်ဝင်ငွေခွန်)
- **Rate**: 25% (Flat rate on Net Profit)

#### 5.4 Withholding Tax (အခွန်ဖြတ်တောက်ထားရှိခြင်း)
| Payment Type | Rate |
|-------------|------|
| Service     | 3.5% |
| Royalty     | 15%  |
| Rent        | 10%  |
| Interest    | 15%  |

### Create Tax Templates
```bash
bench --site [your-site-name] console << EOF
from erpnext.regional.myanmar.tax_rules import create_myanmar_tax_templates
result = create_myanmar_tax_templates()
print(result)
EOF
```

### Access Tax Configuration
```
Desk > Myanmar Local Business > Tax & Compliance
  - Tax Template
  - Create Tax Templates (Action)
  - Commercial Tax Rules
```

---

## 6. WORKSPACE ACCESS (ဝပ်စပေ့စ်ရယူခြင်း)

### Myanmar Local Business Workspace
**Path**: Desk > Myanmar Local Business

#### Quick Shortcuts
1. **Myanmar Business Type** - View all 24 business types
2. **Myanmar Tax Report** - Generate tax compliance reports

#### Cards Sections

**Business Setup Card**
- Myanmar Business Type (DocType)
- Setup Wizard (Page)

**Tax & Compliance Card**
- Sales Taxes and Charges Template (DocType)
- Create Tax Templates (Action)
- Commercial Tax Rules (Report)

**Reports Card**
- Myanmar Tax Report (Query Report)
- Sales Register (Report)

---

## 7. PRINT FORMAT USAGE (ပုံနှိပ်ဖော်မတ်အသုံးပြုခြင်း)

### How to Select Myanmar Print Formats

#### For Sales Invoice:
1. Open Sales Invoice list
2. Select any invoice
3. Click **Print** button
4. Choose **"Myanmar Tax Invoice"** from Print Format dropdown
5. Preview shows bilingual labels (Burmese + English)

#### For Purchase Invoice:
1. Open Purchase Invoice list
2. Select any invoice
3. Click **Print**
4. Choose **"Myanmar Purchase Invoice"**

#### For Delivery Note:
1. Open Delivery Note list
2. Select any document
3. Click **Print**
4. Choose **"Myanmar Delivery Note"**

#### For Quotation:
1. Open Quotation list
2. Select any quotation
3. Click **Print**
4. Choose **"Myanmar Quotation"**

#### For Purchase Order:
1. Open Purchase Order list
2. Select any order
3. Click **Print**
4. Choose **"Myanmar Purchase Order"**

### Bilingual Label Examples
- "Tax Invoice" → "အရောင်းအဝယ်ဘောင်ချာ (Tax Invoice)"
- "Purchase Invoice" → "အဝယ်ဘောင်ချာ (Purchase Invoice)"
- "Delivery Note" → "ပစ္စည်းပို့ဆောင်ရေးမှတ်တမ်း (Delivery Note)"
- "Quotation" → "ဈေးနှုန်းသဘောတူညီချက် (Quotation)"
- "Purchase Order" → "အဝယ်မှာကြားလွှာ (Purchase Order)"
- "Thank You" → "ကျေးဇူးတင်ပါသည် (Thank You)"

---

## 8. CURRENCY & LOCALE SETTINGS (ငွေကြေးနှင့်ဒေသဆိုင်ရာသတ်မှတ်ချက်များ)

### Currency Configuration
```python
# Default Currency: MMK (Myanmar Kyat)
# Symbol: Ks
# Format: #,##,###.## (Indian numbering system adapted)

# In Company settings:
Default Currency = "MMK"
Currency Precision = 2
```

### Date Format
```
DD/MM/YYYY (Commonly used in Myanmar business)
```

### Fiscal Year
```
April 1st to March 31st (Myanmar Fiscal Year)
```

---

## 9. VERIFICATION CHECKLIST (စစ်ဆေးရမည့်စာရင်း)

### Post-Installation Verification
- [ ] Pyidaungsu font installed on server
- [ ] Padauk font available as fallback
- [ ] 24 Myanmar business types loaded
- [ ] Tax templates created successfully
- [ ] 5 print formats available in system
- [ ] Myanmar Local Business workspace accessible
- [ ] Bilingual labels rendering correctly
- [ ] PDF generation working with Myanmar fonts
- [ ] Tax report generating properly

### Test Commands
```bash
# Verify fonts
fc-list | grep -i "pyidaungsu"
fc-list | grep -i "padauk"

# Verify business types
bench --site [site-name] execute "import frappe; print(len(frappe.get_all('Myanmar Business Type')))"

# Verify print formats
bench --site [site-name] execute "import frappe; print(frappe.get_all('Print Format', filters={'module': 'Myanmar Regional'}, pluck='name'))"

# Verify tax templates
bench --site [site-name] execute "import frappe; print(frappe.get_all('Sales Taxes and Charges Template', filters={'title': ['like', '%Myanmar%']}, pluck='name'))"
```

---

## 10. TROUBLESHOOTING (ပြဿနာဖြေရှင်းခြင်း)

### Issue: Myanmar Text Not Rendering Properly
**Solution**: 
1. Verify Pyidaungsu font is installed: `fc-list | grep Pyidaungsu`
2. Restart Frappe server: `bench restart`
3. Clear browser cache
4. Check browser font settings

### Issue: PDF Generation Shows Boxes Instead of Myanmar Text
**Solution**:
1. Install fonts on server (not just client)
2. Use Chrome PDF generator (not wkhtmltopdf)
3. Verify font permissions: `chmod 644 /usr/share/fonts/truetype/pyidaungsu/*`
4. Rebuild assets: `bench build`

### Issue: Business Types Not Showing
**Solution**:
```bash
bench --site [site-name] console << EOF
from erpnext.regional.myanmar import setup_business_types
setup_business_types()
frappe.db.commit()
EOF
```

### Issue: Tax Templates Missing
**Solution**:
```bash
bench --site [site-name] console << EOF
from erpnext.regional.myanmar.tax_rules import create_myanmar_tax_templates
create_myanmar_tax_templates()
frappe.db.commit()
EOF
```

---

## 11. API ENDPOINTS (API အဆုံးမှတ်များ)

### Available Endpoints for Myanmar Localization

#### Get Tax Rules Data
```python
GET /api/method/erpnext.regional.myanmar.tax_rules.get_data
Response: List of tax rules with rates and slabs
```

#### Create Tax Templates
```python
POST /api/method/erpnext.regional.myanmar.tax_rules.create_myanmar_tax_templates
Response: {"success": true/false, "message": "..."}
```

#### Get Myanmar Fonts
```python
from erpnext.regional.myanmar import get_myanmar_fonts
fonts = get_myanmar_fonts()
# Returns: {
#   "primary": "Pyidaungsu",
#   "fallback": "Padauk",
#   "generic": "sans-serif",
#   "font_stack": "'Pyidaungsu', 'Padauk', sans-serif"
# }
```

#### Get Bilingual Label
```python
from erpnext.regional.myanmar import get_bilingual_label
label = get_bilingual_label("Tax Invoice", "အရောင်းအဝယ်ဘောင်ချာ")
# Returns: "အရောင်းအဝယ်ဘောင်ချာ (Tax Invoice)"
```

---

## 12. FILE STRUCTURE (ဖိုင်ဖွဲ့စည်းပုံ)

```
erpnext/regional/myanmar/
├── __init__.py                 # Main module initialization
├── tax_rules.py                # Tax calculation rules
├── doctype/
│   └── myanmar_business_type/
│       ├── myanmar_business_type.json
│       └── myanmar_business_type.py
├── fixtures/
│   └── business_types.json     # 24 pre-defined business types
├── fonts/
│   └── README.md               # Font installation guide
├── print_format/
│   ├── myanmar_tax_invoice/
│   │   └── myanmar_tax_invoice.json
│   ├── myanmar_purchase_invoice/
│   │   └── myanmar_purchase_invoice.json
│   ├── myanmar_delivery_note/
│   │   └── myanmar_delivery_note.json
│   ├── myanmar_quotation/
│   │   └── myanmar_quotation.json
│   └── myanmar_purchase_order/
│       └── myanmar_purchase_order.json
├── report/
│   └── myanmar_tax_report/
│       ├── myanmar_tax_report.json
│       └── myanmar_tax_report.py
└── workspace/
    └── myanmar_local_business.json
```

---

## 13. TECHNICAL STANDARDS (နည်းပညာစံနှုန်းများ)

### Encoding
- **Standard**: UTF-8 throughout the system
- **Myanmar Unicode Block**: U+1000–U+109F

### Font Specifications
- **Primary**: Pyidaungsu (TrueType, .ttf)
- **Fallback**: Padauk (SIL Open Font License)
- **Size**: 14px default for print formats
- **Stack**: `'Pyidaungsu', 'Padauk', sans-serif`

### Compliance Standards
- Myanmar Internal Revenue Department requirements
- Unicode Consortium standards for Myanmar script
- ERPNext internationalization best practices
- SIL Open Font License for Padauk font

---

## 14. SUPPORT & DOCUMENTATION (ပံ့ပိုးကူညီမှုနှင့်စာရွက်စာတမ်းများ)

### Resources
- **Myanmar Unicode**: https://unicode.org/versions/Unicode15.0.0/chapters/ch10.pdf
- **Pyidaungsu Font**: https://github.com/andjc/pyidaungsu-font
- **Padauk Font**: https://fonts.google.com/specimen/Padauk
- **ERPNext Docs**: https://docs.frappe.io/erpnext
- **Myanmar IRD**: https://www.myanmar-ird.gov.mm (Official)

### Contact
For issues related to Myanmar localization:
1. Check this setup guide first
2. Review troubleshooting section
3. Create issue on GitHub with tag: `myanmar-localization`
4. Include system information and error logs

---

## 15. VERSION INFORMATION (ဗားရှင်းအချက်အလက်)

- **Module Version**: 1.0.0
- **ERPNext Compatibility**: 15.x+
- **Last Updated**: 2024
- **License**: GNU General Public License v3

---

## SUMMARY (အနှစ်ချုပ်)

This complete setup guide provides step-by-step instructions for implementing Myanmar business operations logic, company culture data, and local compliance requirements in ERPNext. The system features:

✅ **24 Myanmar Business Types** with bilingual labels
✅ **5 Professional Print Formats** with Pyidaungsu font
✅ **Complete Tax Framework** (Commercial, Income, Withholding)
✅ **Bilingual Support** (English primary, Burmese secondary)
✅ **Workspace Integration** for easy access
✅ **UTF-8 Encoding** for proper Myanmar Unicode rendering
✅ **Compliance Ready** for Myanmar Internal Revenue Department

**Primary Language**: English (default business language)
**Secondary Language**: Burmese (Unicode, Pyidaungsu font)

All components are production-ready and follow enterprise-grade standards while maintaining cultural sensitivity and regulatory compliance for Myanmar business operations.

---

*Generated for Myanmar Business Localization Package*
*မြန်မာလုပ်ငန်းဒေသဆိုင်ရာ ပackageအတွက် ထုတ်လုပ်သည်*
