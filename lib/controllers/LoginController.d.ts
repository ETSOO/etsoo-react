/// <reference types="react" />
import { EntityController } from "./EntityController";
import { UserAction, IUserUpdate } from "../states/UserState";
import { IApiUser } from "../api/IApiUser";
import { IApiConfigs } from "./IApiConfigs";
import { IApiEntity } from "../api/IApiEntity";
import { ChangePasswordModel } from "../models/ChangePasswordModel";
import { LoginResultData, AuthorizationResultData } from "../views/LoginResultData";
import { IResult } from "../api/IResult";
import { LoginModel } from "../models/LoginModel";
import { LoginTokenModel } from "../models/LoginTokenModel";
/**
 * User login success callback
 */
export interface UserLoginSuccess {
    /**
     * Callback function
     */
    (userId: number): Promise<IUserUpdate>;
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
export declare abstract class LoginController extends EntityController {
    /**
     * User state dispatch
     */
    protected dispatch: React.Dispatch<UserAction>;
    /**
     * Login result format callback
     */
    loginFormat?: ILoginDataFactory;
    /**
     * Login with token format callback
     */
    loginTokenFormat?: ILoginDataFactory;
    /**
     * Constructor
     * @param user Current user
     * @param entity Service entity
     * @param configs Configurations
     * @param dispatch User state dispatch
     */
    protected constructor(user: IApiUser, entity: IApiEntity, configs: IApiConfigs, dispatch: React.Dispatch<UserAction>);
    /**
      * Change password
      * @param model Data model
      */
    changePassword(model: ChangePasswordModel): Promise<IResult<import("../api/IResult").IResultData>>;
    loginResult(result: IResult<LoginResultData>, dataCallback: UserLoginSuccess | null, model: LoginModel | undefined): Promise<void>;
    /**
     * Login
     * @param model Login model
     */
    login(model: LoginModel, dataCallback?: UserLoginSuccess | null): Promise<IResult<LoginResultData>>;
    /**
     * Login token
     * @param model Login token model
     */
    loginToken(model: LoginTokenModel, dataCallback?: UserLoginSuccess | null): Promise<IResult<LoginResultData>>;
    /**
     * Refresh token
     */
    refreshToken(): Promise<IResult<AuthorizationResultData>>;
    /**
     * Service summary data
     * @param id Field of data
     */
    serviceSummary<D>(id: string): Promise<D>;
    /**
     * Signout
     * @param clearToken Clear saved login token
     */
    signout(clearToken: boolean): Promise<IResult<import("../api/IResult").IResultData>>;
}
