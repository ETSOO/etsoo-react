import { IApi } from '@etsoo/restclient';
import { IApiEntity } from './IApiEntity';
import { ApiSingleton } from './ApiSingleton';

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
     * API
     */
    api: IApi;

    /**
     * Build entity API URL
     * @param url Short URL
     */
    buildEntityApi(url: string): string;
}
