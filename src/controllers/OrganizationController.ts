import { EntityController, createModuleEntity } from './EntityController';
import { ApiModule } from '../api/IApiEntity';

/**
 * Organization API controller
 */
export class OrganizationController extends EntityController {
    /**
     * Constructor
     */
    constructor() {
        super(createModuleEntity(ApiModule.Organization));
    }
}
