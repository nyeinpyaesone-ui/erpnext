import { FrappeError } from "frappe-react-sdk"

interface ParsedErrorMessage {
    message: string,
    title?: string,
    indicator?: string,
}

interface ServerMessage {
    message: string;
    title?: string;
    indicator?: string;
    [key: string]: unknown;
}

/**
 * Get formatted error message from FrappeError
 * @param error - The FrappeError object to parse
 * @returns Formatted error message string
 */
export const getErrorMessage = (error?: FrappeError | null): string => {
    const messages = getErrorMessages(error);
    return messages.map(m => m.message).join('\n');
};

/**
 * Standard function to parse the error messages from the FrappeError object
 * @param error The FrappeError object to parse
 * @returns An array of ParsedErrorMessage objects
 */
export const getErrorMessages = (error?: FrappeError | null): ParsedErrorMessage[] => {
    if (!error) return [];
    
    let eMessages: ParsedErrorMessage[] = error?._server_messages 
        ? JSON.parse(error?._server_messages) as ServerMessage[]
        : [];
    
    eMessages = eMessages.map((m) => {
        try {
            // Handle both string and object messages
            if (typeof m === 'string') {
                return JSON.parse(m) as ParsedErrorMessage;
            }
            return m as ParsedErrorMessage;
        } catch {
            // If parsing fails, treat as string message
            return { message: typeof m === 'string' ? m : JSON.stringify(m) };
        }
    });

    // Handle _error_message if present
    const hasErrorMessage = error && '_error_message' in error && error._error_message;
    if (hasErrorMessage) {
        eMessages.push({
            message: String(error._error_message),
            title: "Error",
            indicator: "red"
        });
    }

    if (eMessages.length === 0) {
        // Get the message from the exception by removing the exc_type
        const indexOfFirstColon = error?.exception?.indexOf(':');
        if (indexOfFirstColon !== undefined && indexOfFirstColon > -1) {
            const exception = error?.exception?.slice(indexOfFirstColon + 1);
            if (exception) {
                eMessages = [{
                    message: exception,
                    title: "Error"
                }];
            }
        }

        if (eMessages.length === 0) {
            eMessages = [{
                message: error?.message || "An error occurred",
                title: "Error",
                indicator: "red"
            }];
        }
    }
    return eMessages;
};

export const slug = (name?: string) => {
    return name?.toLowerCase().replace(/ /g, "-") ?? "";
}

export const scrub = (txt?: string) => {
    return (txt || "").replace(/ /g, "_").toLowerCase(); // use
}

export const unscrub = (txt?: string) => {
    return (txt || "").replace(/-|_/g, " ").replace(/\w*/g, function (keywords) {
        return keywords.charAt(0).toUpperCase() + keywords.substring(1).toLowerCase();
    });
}

export const getSystemDefault = (fieldName: string, fallback?: string) => {
    return window.frappe?.boot?.sysdefaults?.[fieldName] ?? fallback
}

export const getUserDefault = (fieldName: string, fallback?: string) => {
    return window.frappe?.boot?.user?.defaults?.[fieldName] ?? fallback
}

export const getBootFieldData = (fieldName: string, fallback?: string) => {
    return window.frappe?.boot?.[fieldName] ?? fallback
}
