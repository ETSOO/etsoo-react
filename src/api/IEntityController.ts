import { IApi, IApiErrorHandler } from '@etsoo/restclient';
import { IApiEntity } from './IApiEntity';
import { ApiSingleton } from './ApiSingleton';
import { IListItem } from '../views/IListItem';
import { TiplistModel } from '../models/TiplistModel';

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

    /**
     * Get tiplist data
     * @param model Data model
     * @param onError Error handler
     */
    tiplist<M extends TiplistModel, T = IListItem>(
        model?: M,
        onError?: IApiErrorHandler
    ): Promise<T[] | undefined>;
}
