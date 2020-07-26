import { AxiosInstance } from 'axios';
import { IApiUser } from '../api/IApiUser';
import { IApiEntity } from '../api/IApiEntity';
import {
    IResult, IRawResult, IResultData, ResultError, IdResultData
} from '../api/IResult';
import { TiplistModel } from '../models/TiplistModel';
import { IListItem } from '../views/IListItem';
import { IViewModel } from '../views/IView';
import { IViewFactory } from '../views/IViewFactory';
import { ApiSingleton } from './ApiSingleton';
import { Notifier } from '../mu/Notifier';
import { IApiConfigs } from './IApiConfigs';
import { IEntityController } from './IEntityController';
import { IAddData, IEditData } from '../api/IDynamicData';
import { SearchModel } from '../models/SearchModel';

/**
 * Entity API controller
 */
export abstract class EntityController implements IEntityController {
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected static formatResult<D extends IResultData>(data: IRawResult) {
        return {
            errorCode: data.error_code,
            ok: data.error_code === 0,
            ...data
        } as IResult<D>;
    }

    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected static formatResultBase(data: IRawResult) {
        return EntityController.formatResult<IResultData>(data);
    }

    /**
     * Format search result data, if error found, report it
     * @param data Raw search result data
     */
    protected static formatSearchResult<D>(data: any) {
        // error_code is the flag property of the error result
        if ('error_code' in data) {
            throw new ResultError(EntityController.formatResultBase(data));
        }

        return data as D;
    }

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

    #api: AxiosInstance

    /**
     * API
     */
    public get api() {
        return this.#api;
    }

    #entity: IApiEntity

    /**
     * Current entity description
     */
    public get entity() {
        return this.#entity;
    }

    #singleton: ApiSingleton

    /**
     * API Singleton
     */
    public get singleton() {
        return this.#singleton;
    }

    #user: IApiUser

    /**
     * Current user
     */
    public get user() {
        return this.#user;
    }

    /**
     * Constructor
     * @param user Current user
     * @param entity Entity settings
     * @param configs Additional API configs
     */
    protected constructor(user: IApiUser, entity: IApiEntity, configs: IApiConfigs) {
        // API Singleton
        this.#singleton = ApiSingleton.getInstance(new Notifier());

        // Init
        this.#user = user;
        this.#entity = entity;

        // API configuration
        if (configs.baseUrl == null) {
            // eslint-disable-next-line no-param-reassign
            configs.baseUrl = `${this.singleton.settings.endpoint}/${entity.identity}`;
        }

        this.#api = this.singleton.createApi(configs);
    }

    /**
     * Add entity
     * @param data Model data
     */
    async add(data: IAddData) {
        return this.addExtended<IdResultData>(data);
    }

    /**
     * Add entity extended
     * @param data Model data
     */
    async addExtended<D extends IResultData>(data: IAddData) {
        return EntityController.formatResult<D>((await this.api.post('', data)).data);
    }

    /**
     * Delete entities
     * @param ids Ids to delete
     */
    async delete(...ids: (number | string)[]) {
        // Single id passed with path, otherwise as query parameters as 'ids=1&ids=2'
        const api = ids.length === 1
            ? `/${ids[0]}`
            : `?${ids.map(id => `ids=${id}`).join('&')}`;
        return EntityController.formatResult<IResultData>((await this.api.delete(api)).data);
    }

    /**
     * Edit entity
     * @param id Entity's id
     * @param data Model data
     */
    async edit(id: number | string, data: IEditData) {
        return this.editExtended<IdResultData>(id, data);
    }

    /**
     * Edit entity extended
     * @param id Entity's id
     * @param data Model data
     */
    async editExtended<D extends IResultData>(id: number | string, data: IEditData) {
        return EntityController.formatResult<D>((await this.api.put(`/${id}`, data)).data);
    }

    /**
     * Data report
     * @param id Field of data
     * @param parameters Parameters
     */
    async report<D>(id: string, parameters?: string) {
        return EntityController.formatSearchResult<D>((await this.api.get(`report/${id}`, { params: { p: parameters } })).data);
    }

    /**
     * Search source data
     * @param conditions Search conditions
     */
    async searchBase<D, M extends TiplistModel>(conditions?: M) {
        return EntityController.formatSearchResult<D>((await this.api.get('', { params: conditions })).data);
    }

    /**
     * Get tiplist data
     * @param model Data model
     */
    async tiplist<M extends TiplistModel>(model?: M) {
        return EntityController.formatSearchResult<IListItem[]>((await this.api.get('tiplist', { params: model })).data);
    }

    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    async viewBase(id: number, field?:string) {
        return (await this.api.get(`${id}${field == null ? '' : `/${field}`}`)).data;
    }

    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    async view<D extends IViewModel>(id: number, field?:string) {
        return EntityController.formatSearchResult<D>(await this.viewBase(id, field));
    }

    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     */
    async viewF<V>(factory: IViewFactory<V>, id: number, field?:string) {
        const apiResult = await this.viewBase(id, field);
        return factory(EntityController.formatSearchResult<IViewModel>(apiResult));
    }
}
