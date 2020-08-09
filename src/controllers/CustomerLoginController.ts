import React from 'react';
import { IApiUser } from '../api/IApiUser';
import { ApiModule } from '../api/IApiEntity';
import { UserAction } from '../states/UserState';
import { LoginController } from './LoginController';

/**
 * Customer login API controller
 */
export class CustomerLoginController extends LoginController {
    /**
     * Constructor
     * @param user Current user
     * @param dispatch User state dispatch
     */
    constructor(user: IApiUser, dispatch: React.Dispatch<UserAction>) {
        super(
            user,
            {
                identity: 'customer',
                module: ApiModule.Customer
            },
            dispatch
        );
    }
}
