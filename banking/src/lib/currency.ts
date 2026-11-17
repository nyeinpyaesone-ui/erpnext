import type { SystemDefaults } from './namespace/types';

/**
 * Get currency symbol for display
 * @param currency - Currency code
 * @returns Currency symbol or empty string if hidden
 */
export const getCurrencySymbol = (currency?: string): string => {
    const boot = window.frappe?.boot;
    
    if (boot) {
        const sysdefaults = boot.sysdefaults as SystemDefaults | undefined;
        
        if (sysdefaults?.hide_currency_symbol === "Yes") {
            return "";
        }
        
        if (!currency) {
            currency = sysdefaults?.currency;
        }

        return getCurrencyProperty(currency, 'symbol') || currency || '';
    }
    
    return getCurrencyProperty(currency, 'symbol') || currency || '';
};

/**
 * Get number format for currency
 * @param currency - Currency code
 * @returns Number format string
 */
export const getCurrencyNumberFormat = (currency: string): string | undefined => {
    return getCurrencyProperty(currency, 'number_format');
};

/**
 * Get currency property from locals
 * @param currency - Currency code
 * @param property - Property to retrieve
 * @returns Property value or undefined
 */
export const getCurrencyProperty = (
    currency: string | undefined, 
    property: 'symbol' | 'symbol_on_right' | 'number_format'
): string | undefined => {
    if (!currency) return undefined;
    
    const currencyLocals = (window.locals as any)?.[':Currency'];
    return currencyLocals?.[currency]?.[property];
};