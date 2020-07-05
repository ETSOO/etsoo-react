import { EntityController } from "./EntityController"
import { UserAction, UserActionType, IUserUpdate } from "../states/UserState"
import { IApiUser } from "../api/IApiUser"
import { IApiConfigs } from "./IApiConfigs"
import { IApiEntity } from "../api/IApiEntity"
import { ChangePasswordModel } from "../models/ChangePasswordModel"
import { LoginResultData, AuthorizationResultData } from "../views/LoginResultData"
import { IResult } from "../api/IResult"
import { SaveLoginData, SaveLogin } from "../api/SaveLogin"
import { LoginModel } from "../models/LoginModel"
import { LoginTokenModel } from "../models/LoginTokenModel"

/**
 * User login success callback
 */
export interface UserLoginSuccess
{
    /**
     * Callback function
     */
    (userId: number): Promise<IUserUpdate>
}

/**
 * Login data factory callback
 * Format the data to unified object
 */
export interface ILoginDataFactory
{
    /**
     * Callback function
     */
    (data: any): IResult<LoginResultData>
}

/**
 * Login API controller
 */
export abstract class LoginController extends EntityController
{
    /**
     * User state dispatch
     */
    protected dispatch: React.Dispatch<UserAction>

    /**
     * Login result format callback
     */
    public loginFormat?: ILoginDataFactory

    /**
     * Login with token format callback
     */
    public loginTokenFormat?: ILoginDataFactory
    
    /**
     * Constructor
     * @param user Current user
     * @param entity Service entity
     * @param configs Configurations
     * @param dispatch User state dispatch
     */
    protected constructor(user: IApiUser, entity: IApiEntity, configs: IApiConfigs, dispatch: React.Dispatch<UserAction>) {
        super(user, entity, configs)
        this.dispatch = dispatch
    }

   /**
     * Change password
     * @param model Data model
     */
    async changePassword(model: ChangePasswordModel) {
        return this.formatResult((await this.api.post('ChangePassword', model)).data)
    }

    // Login result process
    async loginResult(result: IResult<LoginResultData>, dataCallback: UserLoginSuccess | null, model: LoginModel | undefined) {
        if(result.ok) {
            // ! is non-null assertion operator
            let data = result.data!
      
            // Save login
            if(model) {
              // Add or update totally
              const loginData: SaveLoginData = {
                rawId: model.id,
                id: data.token_user_id,
                token: data.token
              }
              SaveLogin.save(loginData)
            } else {
              // Update the saved login with the new token
              SaveLogin.update(data.token)
            }
      
            // Update token
            this.singleton.UpdateToken(data.authorization)

            // Login action
            let action: UserAction = {
                type: UserActionType.Login,
                user: {
                    accessToken: data.access_token,
                    id: data.token_user_id,
                    organizationId: data.organization_id,
                    visitOrganizationId: data.visit_organization_id,
                    refreshSeconds: data.refresh_seconds || 300
                }
            }
            
            // Callback
            if(dataCallback) {
                // Update action
                action.update = await dataCallback(data.token_user_id)

                // Update user
                this.dispatch(action)
            } else {
                // Update user
                this.dispatch(action)
            }
        } else {
            // Clear token
            SaveLogin.update(undefined)
        }
    }
    
    /**
     * Login
     * @param model Login model
     */
    async login(model: LoginModel, dataCallback: UserLoginSuccess | null = null) {
        const { method, currentLanguage: languageCid } = this.singleton.settings
        const post = Object.assign(model, { method, languageCid })
        const data = (await this.api.post('Login', post)).data
        const result = this.loginFormat ? this.loginFormat(data) : this.formatResult<LoginResultData>(data)
        await this.loginResult(result, dataCallback, model)
        return result
    }

    /**
     * Login token
     * @param model Login token model
     */
    async loginToken(model: LoginTokenModel, dataCallback: UserLoginSuccess | null = null) {
        const { method, currentLanguage: languageCid } = this.singleton.settings
        const post = Object.assign(model, { method, languageCid })
        const data = (await this.api.post('LoginToken', post)).data
        const result = this.loginTokenFormat ? this.loginTokenFormat(data) : this.formatResult<LoginResultData>(data)
        await this.loginResult(result, dataCallback, undefined)
        return result
    }

    /**
     * Refresh token
     */
    async refreshToken() {
        const result = this.formatResult<AuthorizationResultData>((await this.api.put('RefreshToken')).data)
        if(result.ok) {
            // Update token
            this.singleton.UpdateToken(result.data?.authorization)
        }
        return result
    }

    /**
     * Service summary data
     * @param id Field of data
     */
    async serviceSummary<D>(id: string) {
        return (await this.api.get(`servicesummary/${id}`)).data as D
    }

    /**
     * Signout
     * @param clearToken Clear saved login token
     */
    async signout(clearToken: boolean) {
        const { method } = this.singleton.settings
        const api = `Signout?method=${method}&clear=${clearToken}`
        const result = this.formatResult((await this.api.put(api)).data)
        if(result.ok) {
            // Clear API token
            this.singleton.UpdateToken(undefined)

            if(clearToken) {
                // Clear saved login token
                SaveLogin.update(undefined)
            }

            // Logout action, last step to avoid any router change issues
            const action: UserAction = {
                type: UserActionType.Logout
            }
            this.dispatch(action)
        }
        return result
    }
}