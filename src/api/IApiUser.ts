/**
 * Api user base interface
 */
export interface IApiUserBase {
    /**
     * Temp access token
     */
    accessToken: string

    /**
     * User id
     */
    id: number

    /**
     * Organization current user belongs
     */
    organizationId: number

    /**
     * Refresh seconds
     */
    refreshSeconds: number

    /**
     * Current visit organization id
     */
    visitOrganizationId?: number
}

/**
 * Api user interface
 */
export interface IApiUser extends IApiUserBase {
    /**
     * Authorized or not
     */
    authorized: boolean
}