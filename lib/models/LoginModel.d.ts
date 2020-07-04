/**
 * Login id type
 */
export declare enum LoginIdType {
    Unknown = 0,
    Id = 1,
    Mobile = 2,
    Email = 4,
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
