import { IApiUser } from "../api/IApiUser";
import React from "react";
import { UserAction } from "../states/UserState";
import { IApiConfigs } from "./IApiConfigs";
import { LoginController } from "./LoginController";
/**
 * User login API controller
 */
export declare class UserLoginController extends LoginController {
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     * @param dispatch User state dispatch
     *
     */
    constructor(user: IApiUser, configs: IApiConfigs, dispatch: React.Dispatch<UserAction>);
}
