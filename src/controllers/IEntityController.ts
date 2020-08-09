import { IApiEntity } from '../api/IApiEntity';
import { ApiSingleton } from './ApiSingleton';
import { IApiUser } from '../api/IApiUser';
import { IApi } from '../api/IApi';

/**
 * Entity controller interface
 */
export interface IEntityController {
    /**
     * Current entity description
     */
    entity: IApiEntity;

    /**
     * API Singleton
     */
    singleton: ApiSingleton;

    /**
     * Current user
     */
    user: IApiUser;

    /**
     * API
     */
    api: IApi;
}
