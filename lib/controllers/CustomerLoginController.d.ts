import React from 'react';
import { IApiUser } from '../api/IApiUser';
import { UserAction } from '../states/UserState';
import { IApiConfigs } from './IApiConfigs';
import { LoginController } from './LoginController';
/**
 * Customer login API controller
 */
export declare class CustomerLoginController extends LoginController {
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     * @param dispatch User state dispatch
     */
    constructor(user: IApiUser, configs: IApiConfigs, dispatch: React.Dispatch<UserAction>);
}
