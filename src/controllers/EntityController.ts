import { DataTypes } from '@etsoo/shared';
import { IApiErrorHandler, ApiResult } from '@etsoo/restclient';
import { IApiEntity, ApiModule } from '../api/IApiEntity';
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
import { ApiSingleton } from '../api/ApiSingleton';
import { IEntityController } from '../api/IEntityController';
import { IAddData, IEditData } from '../api/IDynamicData';
import { SearchModel } from '../models/SearchModel';
import { isRawResult, IRawResult } from '../views/RawResult';
import { ApiSettings } from '../api/ApiSettings';

/**
 * Create module entity
 * @param module Api module
 */
export function createModuleEntity(module: ApiModule): IApiEntity {
    const identity = ApiModule[module].toLowerCase();
    return {
        identity,
        module
    };
}

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

    private entityLocal: IApiEntity;

    /**
     * Current entity description
     */
    public get entity() {
        return this.entityLocal;
    }

    private singletonLocal: ApiSingleton;

    /**
     * API Singleton
     */
    public get singleton() {
        return this.singletonLocal;
    }

    /**
     * API
     */
    public get api() {
        return this.singletonLocal.api;
    }

    /**
     * Constructor
     * @param entity Entity settings
     */
    protected constructor(entity: IApiEntity) {
        // Init
        this.entityLocal = entity;

        // API Singleton
        this.singletonLocal = ApiSettings.singleton();
    }

    /**
     * Build entity API URL
     * @param url Short URL
     */
    buildEntityApi(url: string = '') {
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
    async delete(ids: DataTypes.IdType[], onError?: IApiErrorHandler) {
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
        id: DataTypes.IdType,
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
        id: DataTypes.IdType,
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
     * @param isArray Array results
     */
    async report<D>(
        id: string,
        parameters?: string,
        onError?: IApiErrorHandler,
        isArray: boolean = true
    ) {
        const url = this.buildEntityApi(`report/${id}`);
        const result = await this.api.get<D>(
            url,
            { p: parameters },
            {
                onError,
                defaultValue: (isArray ? [] : {}) as D,
                parser: EntityController.searchResultParser<D>()
            }
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
    async tiplist<M extends TiplistModel, T = IListItem>(
        model?: M,
        onError?: IApiErrorHandler
    ) {
        const url = this.buildEntityApi('tiplist');
        const result = await this.api.get<T[]>(url, model, {
            onError,
            defaultValue: [],
            parser: EntityController.searchResultParser<T[]>()
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
        id: DataTypes.IdType,
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
        id: DataTypes.IdType,
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
