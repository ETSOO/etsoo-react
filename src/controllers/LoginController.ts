import { IApiErrorHandler, ApiResult } from '@etsoo/restclient';
import { EntityController } from './EntityController';
import { UserAction, UserActionType, IUserUpdate } from '../states/UserState';
import { ChangePasswordModel } from '../models/ChangePasswordModel';
import {
    LoginResultData,
    AuthorizationResultData
} from '../views/LoginResultData';
import { IResult } from '../api/IResult';
import { SaveLogin } from '../api/SaveLogin';
import { LoginModel } from '../models/LoginModel';
import { LoginTokenModel } from '../models/LoginTokenModel';

/**
 * User login success callback
 */
export interface UserLoginSuccess {
    /**
     * Callback function
     */
    (userId: number): Promise<IUserUpdate | undefined>;
}

/**
 * Login data factory callback
 * Format the data to unified object
 */
export interface ILoginDataFactory {
    /**
     * Callback function
     */
    (data: any): IResult<LoginResultData>;
}

/**
 * Login API controller
 */
export abstract class LoginController extends EntityController {
    /**
     * Login result format callback
     */
    public loginFormat?: ILoginDataFactory;

    /**
     * Login with token format callback
     */
    public loginTokenFormat?: ILoginDataFactory;

    /**
     * Change password
     * @param model Data model
     * @param onError Error handler
     */
    async changePassword(
        model: ChangePasswordModel,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi('ChangePassword');
        const result = await this.api.post(url, model, {
            onError,
            parser: EntityController.resultParser()
        });
        return result;
    }

    // Login result process
    async loginResult(
        dispatch: React.Dispatch<UserAction>,
        result: IResult<LoginResultData>,
        dataCallback?: UserLoginSuccess,
        model?: LoginModel
    ) {
        if (result.ok) {
            // ! is non-null assertion operator
            const data = result.data!;

            // Save login
            if (model) {
                // Add or update totally
                const loginData: SaveLogin.Data = {
                    rawId: model.id,
                    id: data.token_user_id,
                    token: data.token
                };
                SaveLogin.save(loginData);
            } else {
                // Update the saved login with the new token
                SaveLogin.update(data.token);
            }

            // Update token
            this.singleton.UpdateToken(data.authorization);

            // Login action
            const action: UserAction = {
                type: UserActionType.Login,
                user: {
                    accessToken: data.access_token,
                    id: data.token_user_id,
                    organizationId: data.organization_id,
                    visitOrganizationId: data.visit_organization_id,
                    refreshSeconds: data.refresh_seconds || 300
                }
            };

            // Callback
            if (dataCallback) {
                // Update action
                const cbResult = await dataCallback(data.token_user_id);
                if (cbResult) {
                    action.update = cbResult;
                }
            }

            // Update user
            dispatch(action);
        } else {
            // Clear token
            SaveLogin.update(undefined);
        }
    }

    /**
     * Login
     * @param dispatch User state dispatch
     * @param model Login model
     * @param dataCallback Login success callback
     * @param onError Error handler
     */
    async login(
        dispatch: React.Dispatch<UserAction>,
        model: LoginModel,
        dataCallback?: UserLoginSuccess,
        onError?: IApiErrorHandler
    ) {
        const {
            method,
            currentLanguage: languageCid
        } = this.singleton.settings;
        const post = Object.assign(model, { method, languageCid });
        const url = this.buildEntityApi('Login');
        const parser = this.loginFormat
            ? (data: any): ApiResult<IResult<LoginResultData>> => [
                  undefined,
                  this.loginFormat!(data)
              ]
            : EntityController.resultParser<LoginResultData>();

        // Act
        const result = await this.api.post<IResult<LoginResultData>>(
            url,
            post,
            { onError, parser }
        );

        if (result) {
            await this.loginResult(dispatch, result, dataCallback, model);
        }

        return result;
    }

    /**
     * Login token
     * @param dispatch User state dispatch
     * @param model Login token model
     * @param dataCallback Login success callback
     * @param onError Error handler
     */
    async loginToken(
        dispatch: React.Dispatch<UserAction>,
        model: LoginTokenModel,
        dataCallback?: UserLoginSuccess,
        onError?: IApiErrorHandler
    ) {
        const {
            method,
            currentLanguage: languageCid
        } = this.singleton.settings;
        const post = Object.assign(model, { method, languageCid });
        const url = this.buildEntityApi('LoginToken');
        const parser = this.loginTokenFormat
            ? (data: any): ApiResult<IResult<LoginResultData>> => [
                  undefined,
                  this.loginTokenFormat!(data)
              ]
            : EntityController.resultParser<LoginResultData>();

        // Act
        const result = await this.api.post<IResult<LoginResultData>>(
            url,
            post,
            { onError, parser }
        );

        if (result) {
            await this.loginResult(dispatch, result, dataCallback, undefined);
        }

        return result;
    }

    /**
     * Refresh token
     * @param onError Error handler
     */
    async refreshToken(onError?: IApiErrorHandler) {
        const url = this.buildEntityApi('RefreshToken');
        const result = await this.api.put(url, undefined, {
            onError,
            parser: EntityController.resultParser<AuthorizationResultData>()
        });
        if (result?.ok) {
            // Update token
            this.singleton.UpdateToken(result.data?.authorization);
        }
        return result;
    }

    /**
     * Service summary data
     * @param id Field of data
     * @param onError Error handler
     */
    async serviceSummary<D>(id: string, onError?: IApiErrorHandler) {
        const url = this.buildEntityApi(`servicesummary/${id}`);
        const result = await this.api.get<D>(url, undefined, {
            onError,
            parser: EntityController.searchResultParser<D>()
        });
        return result;
    }

    /**
     * Signout
     * @param dispatch User state dispatch
     * @param clearToken Clear saved login token
     * @param onError Error handler
     */
    async signout(
        dispatch: React.Dispatch<UserAction>,
        clearToken: boolean,
        onError?: IApiErrorHandler
    ) {
        const { method } = this.singleton.settings;
        const api = this.buildEntityApi(
            `Signout?method=${method}&clear=${clearToken}`
        );
        const result = await this.api.put(api, undefined, {
            onError,
            parser: EntityController.resultParser()
        });
        if (result?.ok) {
            // Clear API token
            this.singleton.UpdateToken(undefined);

            if (clearToken) {
                // Clear saved login token
                SaveLogin.update(undefined);
            }

            // Logout action, last step rsfaczcxcqqqq   bto avoid any router change issues
            const action: UserAction = {
                type: UserActionType.Logout
            };
            dispatch(action);
        }
        return result;
    }
}
