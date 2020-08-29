import { ApiModule, ControllerExtension } from '../api/IApiEntity';
import { SystemController } from './SystemController';
import { OrganizationController } from './OrganizationController';
import { CustomerController } from './CustomerController';
import { UserController } from './UserController';

/**
 * Core controller utilities
 */
export namespace CoreController {
    /**
     * Create module related service
     * @param module Api module
     */
    export function create(module: ApiModule): ControllerExtension {
        if (module === ApiModule.System) return SystemController;
        if (module === ApiModule.Organization) return OrganizationController;
        if (module === ApiModule.Customer) return CustomerController;
        return UserController;
    }
}
