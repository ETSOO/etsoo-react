import { EntityController } from './EntityController';
import { UserActionType } from '../states/UserState';
import { SaveLogin } from '../api/SaveLogin';
/**
 * Login API controller
 */
export class LoginController extends EntityController {
    /**
     * Constructor
     * @param user Current user
     * @param entity Service entity
     * @param configs Configurations
     * @param dispatch User state dispatch
     */
    constructor(user, entity, configs, dispatch) {
        super(user, entity, configs);
        this.dispatch = dispatch;
    }
    /**
     * Change password
     * @param model Data model
     */
    async changePassword(model) {
        return EntityController.formatResult((await this.api.post('ChangePassword', model)).data);
    }
    // Login result process
    async loginResult(result, dataCallback, model) {
        if (result.ok) {
            // ! is non-null assertion operator
            const data = result.data;
            // Save login
            if (model) {
                // Add or update totally
                const loginData = {
                    rawId: model.id,
                    id: data.token_user_id,
                    token: data.token
                };
                SaveLogin.save(loginData);
            }
            else {
                // Update the saved login with the new token
                SaveLogin.update(data.token);
            }
            // Update token
            this.singleton.UpdateToken(data.authorization);
            // Login action
            const action = {
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
                action.update = await dataCallback(data.token_user_id);
                // Update user
                this.dispatch(action);
            }
            else {
                // Update user
                this.dispatch(action);
            }
        }
        else {
            // Clear token
            SaveLogin.update(undefined);
        }
    }
    /**
     * Login
     * @param model Login model
     */
    async login(model, dataCallback) {
        const { method, currentLanguage: languageCid } = this.singleton.settings;
        const post = Object.assign(model, { method, languageCid });
        const { data } = (await this.api.post('Login', post));
        const result = this.loginFormat
            ? this.loginFormat(data)
            : EntityController.formatResult(data);
        await this.loginResult(result, dataCallback, model);
        return result;
    }
    /**
     * Login token
     * @param model Login token model
     */
    async loginToken(model, dataCallback) {
        const { method, currentLanguage: languageCid } = this.singleton.settings;
        const post = Object.assign(model, { method, languageCid });
        const { data } = (await this.api.post('LoginToken', post));
        const result = this.loginTokenFormat
            ? this.loginTokenFormat(data)
            : EntityController.formatResult(data);
        await this.loginResult(result, dataCallback, undefined);
        return result;
    }
    /**
     * Refresh token
     */
    async refreshToken() {
        var _a;
        const result = EntityController.formatResult((await this.api.put('RefreshToken')).data);
        if (result.ok) {
            // Update token
            this.singleton.UpdateToken((_a = result.data) === null || _a === void 0 ? void 0 : _a.authorization);
        }
        return result;
    }
    /**
     * Service summary data
     * @param id Field of data
     */
    async serviceSummary(id) {
        return (await this.api.get(`servicesummary/${id}`)).data;
    }
    /**
     * Signout
     * @param clearToken Clear saved login token
     */
    async signout(clearToken) {
        const { method } = this.singleton.settings;
        const api = `Signout?method=${method}&clear=${clearToken}`;
        const result = EntityController.formatResult((await this.api.put(api)).data);
        if (result.ok) {
            // Clear API token
            this.singleton.UpdateToken(undefined);
            if (clearToken) {
                // Clear saved login token
                SaveLogin.update(undefined);
            }
            // Logout action, last step to avoid any router change issues
            const action = {
                type: UserActionType.Logout
            };
            this.dispatch(action);
        }
        return result;
    }
}
