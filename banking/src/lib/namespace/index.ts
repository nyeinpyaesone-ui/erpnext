/**
 * Frappe Namespace Module Index
 * Initializes all namespace-related functionality for Myanmar business operations
 */

import './namespace';
import './defaults';
import './sync';

// Re-export types for convenience
export type {
    FrappeNamespace,
    FrappeBoot,
    FrappeModel,
    FrappeDefaults,
    Document,
    SyncResponse,
    DocInfo,
    LocalsMap,
    MyanmarBusinessType,
    MyanmarTaxConfig,
} from './types';
