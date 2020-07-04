import { EntityController } from "./EntityController";
import { LoginModel, ILoginResultData } from "../models/LoginModel";
import { IApiSettings } from "./IApiSettings";
import { IApiUser } from "./IApiUser";
import { IResult } from './IResult';
/**
 * User API controller
 */
export declare class UserController extends EntityController {
    /**
     * Constructor
     * @param settings Settings
     * @param user Current user
     */
    constructor(settings: IApiSettings, user: IApiUser);
    /**
     * Login
     * @param model Login model
     */
    login(model: LoginModel): Promise<IResult<ILoginResultData>>;
}
