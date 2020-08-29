import { EntityController, createModuleEntity } from './EntityController';
import { ApiModule } from '../api/IApiEntity';

/**
 * System API controller
 */
export class SystemController extends EntityController {
    /**
     * Constructor
     */
    constructor() {
        super(createModuleEntity(ApiModule.System));
    }
}
