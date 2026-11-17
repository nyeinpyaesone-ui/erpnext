import type { Document, LocalsMap } from './namespace/types';

interface CompanyDocument extends Document {
    default_currency?: string;
    cost_center?: string;
    [key: string]: unknown;
}

/**
 * Get default currency for a company
 * @param company - Company name
 * @returns Default currency code
 */
export const getCompanyCurrency = (company: string): string | undefined => {
    const companyLocals = (window.locals as LocalsMap)?.[':Company'];
    return companyLocals?.[company]?.['default_currency'] as string | undefined;
};

/**
 * Get default cost center for a company
 * @param company - Company name
 * @returns Cost center name
 */
export const getCompanyCostCenter = (company: string): string | undefined => {
    const companyLocals = (window.locals as LocalsMap)?.[':Company'];
    return companyLocals?.[company]?.['cost_center'] as string | undefined;
};

/**
 * Get company document from locals
 * @param company - Company name
 * @returns Company document or undefined
 */
export const getCompany = (company: string): CompanyDocument | undefined => {
    const companyLocals = (window.locals as LocalsMap)?.[':Company'];
    return companyLocals?.[company] as CompanyDocument | undefined;
};