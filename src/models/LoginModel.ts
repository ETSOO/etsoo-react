/**
 * Login id type
 */
export enum LoginIdType {
    // Unknown, determined by logic
    Unknown = 0,

    // Number id
    Id = 1,

    // Mobile phone number
    Mobile = 2,

    // Email address
    Email = 4,

    // Cid
    Cid = 8
}

/**
 * Login model
 */
export interface LoginModel {
    /**
     * Verification code
     */
    code?: string;

    /**
     * Login id, number id/email/mobile
     */
    id: string;

    /**
     * Id type
     */
    idType?: LoginIdType;

    /**
     * Language cid like zh-CN, en-US
     */
    languageCid?: string;

    /**
     * Current organization id
     */
    org?: number;

    /**
     * Raw password
     */
    password: string;

    /**
     * Save login
     */
    save?: boolean;
}
