import { createClient, IApiErrorHandler, ApiResult } from '@etsoo/restclient';
import { IApiUser } from '../api/IApiUser';
import { IApiEntity } from '../api/IApiEntity';
import {
    IResult,
    IResultData,
    IdResultData,
    ResultError
} from '../api/IResult';
import { TiplistModel } from '../models/TiplistModel';
import { IListItem } from '../views/IListItem';
import { IViewModel } from '../views/IView';
import { IViewFactory } from '../views/IViewFactory';
import { ApiSingleton } from './ApiSingleton';
import { Notifier } from '../mu/Notifier';
import { IEntityController } from './IEntityController';
import { IAddData, IEditData } from '../api/IDynamicData';
import { SearchModel } from '../models/SearchModel';
import { isRawResult, IRawResult } from '../views/RawResult';

/**
 * Entity API controller
 */
export abstract class EntityController implements IEntityController {
    /**
     * Format raw result data
     * For SmartERP API compatible
     * @param data Raw result data
     */
    protected static formatRawResult<D extends IResultData = IResultData>(
        data: IRawResult
    ) {
        const { error_code: errorCode, ...rest } = data;
        return {
            errorCode,
            ok: errorCode === 0,
            ...rest
        } as IResult<D>;
    }

    /**
     * Result data parser
     */
    protected static resultParser = <D extends IResultData = IResultData>() => (
        data: any
    ): ApiResult<IResult<D>> => {
        if (isRawResult(data)) {
            return [undefined, EntityController.formatRawResult<D>(data)];
        }
        return [new TypeError(), undefined];
    };

    /**
     * Format search result raw data
     * @param data Raw search result
     */
    protected static searchResultParser = <D>() => <D>(
        data: any
    ): ApiResult<D> => {
        if (isRawResult(data)) {
            return [
                new ResultError(EntityController.formatRawResult(data)),
                undefined
            ];
        }

        // Formated result
        return [undefined, data as D];
    };

    /**
     * Format search model
     * @param field Field for search range
     * @param model Search condition
     */
    protected static formatSearchModel(field: string, model?: SearchModel) {
        if (model == null) {
            return { field };
        }

        // Update field
        // eslint-disable-next-line no-param-reassign
        model.field = field;

        return model;
    }

    #entity: IApiEntity;

    /**
     * Current entity description
     */
    public get entity() {
        return this.#entity;
    }

    #singleton: ApiSingleton;

    /**
     * API Singleton
     */
    public get singleton() {
        return this.#singleton;
    }

    #user: IApiUser;

    /**
     * Current user
     */
    public get user() {
        return this.#user;
    }

    /**
     * API
     */
    public get api() {
        return this.#singleton.api;
    }

    /**
     * Constructor
     * @param user Current user
     * @param entity Entity settings
     * @param configs Additional API configs
     */
    protected constructor(user: IApiUser, entity: IApiEntity) {
        // Init
        this.#user = user;
        this.#entity = entity;

        // API Singleton
        this.#singleton = ApiSingleton.getInstance(
            () => createClient(),
            new Notifier()
        );
    }

    /**
     * Build entity API URL
     * @param url Short URL
     */
    protected buildEntityApi(url: string = '') {
        return `/${this.entity.identity}/${url}`;
    }

    /**
     * Add entity
     * @param data Model data
     * @param onError Error handler
     */
    async add(data: IAddData, onError?: IApiErrorHandler) {
        return this.addExtended<IdResultData>(data, onError);
    }

    /**
     * Add entity extended
     * @param data Model data
     * @param onError Error handler
     */
    async addExtended<D extends IResultData>(
        data: IAddData,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi();
        const result = await this.api.post<IResult<D>>(url, data, {
            onError,
            parser: EntityController.resultParser<D>()
        });
        return result;
    }

    /**
     * Delete entities
     * @param ids Ids to delete
     * @param onError Error handler
     */
    async delete(ids: (number | string)[], onError?: IApiErrorHandler) {
        // Single id passed with path, otherwise as query parameters as 'ids=1&ids=2'
        const url = this.buildEntityApi(
            ids.length === 1
                ? `${ids[0]}`
                : `?${ids.map((id) => `ids=${id}`).join('&')}`
        );
        const result = await this.api.delete(url, undefined, {
            onError,
            parser: EntityController.resultParser()
        });
        return result;
    }

    /**
     * Edit entity
     * @param id Entity's id
     * @param data Model data
     * @param onError Error handler
     */
    async edit(
        id: number | string,
        data: IEditData,
        onError?: IApiErrorHandler
    ) {
        return this.editExtended<IdResultData>(id, data, onError);
    }

    /**
     * Edit entity extended
     * @param id Entity's id
     * @param data Model data
     * @param onError Error handler
     */
    async editExtended<D extends IResultData>(
        id: number | string,
        data: IEditData,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi(`${id}`);
        const result = await this.api.put<IResult<D>>(url, data, {
            onError,
            parser: EntityController.resultParser<D>()
        });
        return result;
    }

    /**
     * Data report
     * @param id Field of data
     * @param parameters Parameters
     * @param onError Error handler
     */
    async report<D>(
        id: string,
        parameters?: string,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi(`report/${id}`);
        const result = await this.api.get<D>(
            url,
            { p: parameters },
            { onError, parser: EntityController.searchResultParser<D>() }
        );
        return result;
    }

    /**
     * Search source data
     * @param conditions Search conditions
     * @param onError Error handler
     */
    async searchBase<D, M extends TiplistModel>(
        conditions?: M,
        onError?: IApiErrorHandler
    ) {
        const url = `/${this.entity.identity}`;
        const result = await this.api.get<D>(url, conditions, {
            onError,
            parser: EntityController.searchResultParser<D>()
        });
        return result;
    }

    /**
     * Get tiplist data
     * @param model Data model
     * @param onError Error handler
     */
    async tiplist<M extends TiplistModel>(
        model?: M,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi('tiplist');
        const result = await this.api.get<IListItem>(url, model, {
            onError,
            parser: EntityController.searchResultParser<IListItem>()
        });
        return result;
    }

    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     * @param onError Error handler
     */
    async view<D extends IViewModel>(
        id: number | string,
        field?: string,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi(field ? `${id}/${field}` : `${id}`);
        const result = await this.api.get<D>(url, undefined, {
            onError,
            parser: EntityController.searchResultParser<D>()
        });
        return result;
    }

    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     * @param onError Error handler
     */
    async viewF<V>(
        factory: IViewFactory<V>,
        id: number,
        field?: string,
        onError?: IApiErrorHandler
    ) {
        const result = await this.view<IViewModel>(id, field, onError);
        if (result) {
            return factory(result);
        }
        return undefined;
    }
}
