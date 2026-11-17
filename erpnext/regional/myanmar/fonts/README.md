# Myanmar Fonts for ERPNext

## Primary Font: Pyidaungsu (ပြည်ထောင်စု)

**Pyidaungsu** is the official Unicode font developed by the Myanmar government, designed to be the standard font for all digital communications in Myanmar. It provides excellent rendering of Myanmar script with proper accent handling.

### Font Characteristics:
- **Name**: Pyidaungsu (ပြည်ထောင်စု)
- **Type**: Unicode sans-serif
- **Coverage**: Full Myanmar Unicode block (U+1000–U+109F)
- **Usage**: Primary font for all Myanmar print formats
- **Fallback**: Padauk font (Google Fonts open source)

### Font Stack Implementation:
```css
font-family: 'Pyidaungsu', 'Padauk', sans-serif;
```

This ensures:
1. **Primary**: Pyidaungsu for native Myanmar rendering
2. **Fallback**: Padauk if Pyidaungsu is not available
3. **Universal**: sans-serif as final fallback

## Print Formats Using Myanmar Fonts

All Myanmar regional print formats now use the Pyidaungsu font stack:

1. **Myanmar Tax Invoice** (အရောင်းအဝယ်ဘောင်ချာ)
2. **Myanmar Purchase Invoice** (အဝယ်ဘောင်ချာ)
3. **Myanmar Delivery Note** (ပစ္စည်းပို့ဆောင်ရေးမှတ်တမ်း)
4. **Myanmar Quotation** (ဈေးနှုန်းသဘောတူညီချက်)
5. **Myanmar Purchase Order** (အဝယ်မှာကြားလွှာ)

## Installation

### Server-Side (PDF Generation):
The Pyidaungsu font should be installed on the server for PDF generation via Chrome/WKHTMLTOPDF:

```bash
# Ubuntu/Debian
sudo apt-get install fonts-pyidaungsu

# Or manually download from:
# https://github.com/andjc/pyidaungsu-font
```

### Client-Side (Browser Display):
Modern browsers on Windows 10+ and macOS include Pyidaungsu by default. For older systems, the Padauk fallback ensures proper rendering.

## Bilingual Support

All print formats support bilingual display:
- **Primary Language**: English (default business language)
- **Secondary Language**: Burmese (Unicode)

Example labels:
- "Tax Invoice" → "အရောင်းအဝယ်ဘောင်ချာ (Tax Invoice)"
- "Thank You" → "ကျေးဇူးတင်ပါသည် (Thank You)"

## Technical Standards

- **Encoding**: UTF-8
- **Unicode Version**: Myanmar Unicode Block (U+1000–U+109F)
- **Font Format**: TrueType (.ttf)
- **License**: Open Source (SIL Open Font License)

## Compliance

This implementation follows:
- Myanmar Internal Revenue Department requirements
- Unicode Consortium standards for Myanmar script
- ERPNext internationalization best practices
