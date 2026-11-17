/**
 * Myanmar Business Operations Utilities
 * Provides localization and business logic for Myanmar companies
 */

import type { MyanmarBusinessType, MyanmarTaxConfig } from './namespace/types';

/**
 * Get Myanmar Commercial Tax rate (standard 5%)
 * @returns The standard commercial tax rate
 */
export const getMyanmarCommercialTaxRate = (): number => {
    return 5.0;
};

/**
 * Get Myanmar income tax slab for individuals
 * Based on Internal Revenue Department rates
 * @param income - Annual income in MMK
 * @returns Applicable tax rate percentage
 */
export const getMyanmarIndividualIncomeTaxRate = (income: number): number => {
    const slabs = [
        { upTo: 2_000_000, rate: 0 },
        { upTo: 3_000_000, rate: 5 },
        { upTo: 5_000_000, rate: 10 },
        { upTo: 10_000_000, rate: 15 },
        { upTo: 20_000_000, rate: 20 },
        { upTo: Infinity, rate: 25 },
    ];

    for (const slab of slabs) {
        if (income <= slab.upTo) {
            return slab.rate;
        }
    }

    return 25; // Default maximum rate
};

/**
 * Get Myanmar corporate income tax rate
 * @returns Corporate tax rate percentage
 */
export const getMyanmarCorporateTaxRate = (): number => {
    return 25.0;
};

/**
 * Get Myanmar withholding tax rates
 * @param type - Type of payment (service, royalty, rent, interest)
 * @returns Withholding tax rate percentage
 */
export const getMyanmarWithholdingTaxRate = (type: string): number => {
    const rates: Record<string, number> = {
        service: 3.5,
        royalty: 15,
        rent: 10,
        interest: 15,
    };

    return rates[type.toLowerCase()] || 0;
};

/**
 * Check if business type is enabled for Myanmar operations
 * @param businessType - Business type name
 * @returns True if enabled
 */
export const isMyanmarBusinessTypeEnabled = (businessType: string): boolean => {
    // Check if frappe locals has the business type
    if (typeof window !== 'undefined' && window.frappe?.boot) {
        const businessTypes = (window.locals as any)['Myanmar Business Type'];
        if (businessTypes && businessTypes[businessType]) {
            return businessTypes[businessType].enabled === 1;
        }
    }
    return true; // Default to enabled if not found
};

/**
 * Format amount in Myanmar Kyat (MMK)
 * @param amount - Amount to format
 * @param showSymbol - Whether to show currency symbol
 * @returns Formatted amount string
 */
export const formatMMK = (amount: number, showSymbol: boolean = true): string => {
    const formatter = new Intl.NumberFormat('en-MM', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const formatted = formatter.format(amount);
    return showSymbol ? `Ks ${formatted}` : formatted;
};

/**
 * Get Myanmar tax exemptions list
 * @returns Array of exempted items
 */
export const getMyanmarTaxExemptions = (): string[] => {
    return [
        'Basic food items',
        'Medicines and medical equipment',
        'Educational materials',
        'Agricultural products (raw)',
    ];
};

/**
 * Validate Myanmar company registration number format
 * @param regNumber - Company registration number
 * @returns True if valid format
 */
export const isValidMyanmarCompanyRegistration = (regNumber: string): boolean => {
    // Myanmar company registration numbers typically follow specific patterns
    const patterns = [
        /^C\d+$/, // Private company
        /^M\d+$/, // Public company
        /^\d+\/[A-Z]+\(I\)$/, // Foreign company branch
    ];

    return patterns.some(pattern => pattern.test(regNumber));
};

/**
 * Get Myanmar fiscal year dates
 * Fiscal year in Myanmar starts from April 1st
 * @param year - Calendar year
 * @returns Start and end dates of fiscal year
 */
export const getMyanmarFiscalYear = (year: number): { start: Date; end: Date } => {
    const startDate = new Date(year, 3, 1); // April 1st (month is 0-indexed)
    const endDate = new Date(year + 1, 2, 31); // March 31st of next year

    return { start: startDate, end: endDate };
};

/**
 * Calculate commercial tax for goods/services in Myanmar
 * @param amount - Taxable amount in MMK
 * @param isExempt - Whether the item is tax-exempt
 * @returns Tax amount in MMK
 */
export const calculateMyanmarCommercialTax = (amount: number, isExempt: boolean = false): number => {
    if (isExempt) {
        return 0;
    }
    return amount * (getMyanmarCommercialTaxRate() / 100);
};

/**
 * Get list of major Myanmar cities for business operations
 * @returns Array of city names
 */
export const getMyanmarMajorCities = (): string[] => {
    return [
        'Yangon',
        'Mandalay',
        'Nay Pyi Taw',
        'Mawlamyine',
        'Bago',
        'Pathein',
        'Monywa',
        'Sittwe',
        'Taunggyi',
        'Myitkyina',
    ];
};

export default {
    getMyanmarCommercialTaxRate,
    getMyanmarIndividualIncomeTaxRate,
    getMyanmarCorporateTaxRate,
    getMyanmarWithholdingTaxRate,
    isMyanmarBusinessTypeEnabled,
    formatMMK,
    getMyanmarTaxExemptions,
    isValidMyanmarCompanyRegistration,
    getMyanmarFiscalYear,
    calculateMyanmarCommercialTax,
    getMyanmarMajorCities,
};
