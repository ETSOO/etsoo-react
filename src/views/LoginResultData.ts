import { IResultData } from '../api/IResult';

/**
 * Authorization data result
 */
export interface AuthorizationResultData extends IResultData {
    /**
     * Authorization token
     */
    authorization: string;
}

/**
 * Login result data result
 */
/* eslint-disable camelcase */
export interface LoginResultData extends AuthorizationResultData {
    /**
     * Temp access token
     */
    access_token: string;

    /**
     * Need to show verification code
     */
    code_required: boolean;

    /**
     * Language cid
     */
    language_cid: string;

    /**
     * Language id
     */
    language_id: number;

    /**
     * Organization id
     */
    organization_id: number;

    /**
     * Suggested authorization refresh seconds
     */
    refresh_seconds?: number;

    /**
     * Login saved token
     */
    token?: string;

    /**
     * User id
     */
    token_user_id: number;

    /**
     * Current visit organization id
     */
    visit_organization_id?: number;
}
