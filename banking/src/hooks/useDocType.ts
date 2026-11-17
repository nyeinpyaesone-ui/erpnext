import { useFrappeGetCall } from "frappe-react-sdk"
import type { LocalsMap, Document } from '../lib/namespace/types'

interface DocTypeResponse {
    docs?: Document[];
    [key: string]: unknown;
}

declare const locals: LocalsMap | undefined;

export const useDocType = (doctype: string, with_parent: 0 | 1 = 1, cached_timestamp?: Date) => {
    const localData = (locals as LocalsMap | undefined)?.['DocType']?.[doctype] || null
    
    const { data, error, isLoading } = useFrappeGetCall<DocTypeResponse>(
        'frappe.desk.form.load.getdoctype',
        {
            doctype: doctype,
            with_parent: with_parent,
            cached_timestamp: cached_timestamp ?? null,
        },
        localData || !doctype ? null : undefined,
        {
            onSuccess: (data) => {
                if (data && window.frappe?.model) {
                    data.docs?.forEach((doc: Document) => {
                        window.frappe.model.add_to_locals(doc)
                    })
                }
            },
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )

    return {
        data: localData || (data?.docs?.[0] ?? null),
        error,
        isLoading: localData ? false : isLoading
    }
}