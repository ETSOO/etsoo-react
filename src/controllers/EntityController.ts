import { AxiosInstance } from 'axios'
import { IApiUser } from "../api/IApiUser"
import { IApiEntity } from '../api/IApiEntity'
import { IResult, IRawResult, IResultData, ResultError } from '../api/IResult'
import { TiplistModel } from '../models/TiplistModel'
import { IListItem } from '../views/IListItem'
import { IViewModel } from '../views/IView'
import { IViewFactory } from '../views/IViewFactory'
import { ApiSingleton } from './ApiSingleton'
import { Notifier } from '../mu/Notifier'
import { IApiConfigs } from './IApiConfigs'
import { IEntityController } from './IEntityController'

/**
 * Entity API controller
 */
export abstract class EntityController implements IEntityController {
    #api: AxiosInstance

    /**
     * API
     */
    public get api() {
        return this.#api
    }

    #entity: IApiEntity

    /**
     * Current entity description
     */
    public get entity() {
        return this.#entity
    }

    #singleton: ApiSingleton

    /**
     * API Singleton
     */
    public get singleton() {
        return this.#singleton
    }

    #user: IApiUser

    /**
     * Current user
     */
    public get user() {
        return this.#user
    }

    /**
     * Constructor
     * @param user Current user
     * @param entity Entity settings
     * @param configs Additional API configs
     */
    protected constructor(user: IApiUser, entity: IApiEntity, configs: IApiConfigs) {
        // API Singleton
        this.#singleton = ApiSingleton.getInstance(new Notifier())

        // Init
        this.#user = user
        this.#entity = entity

        // API configuration
        if(configs.baseUrl == null)
            configs.baseUrl = this.singleton.settings.endpoint + '/' + entity.identity
        this.#api = this.singleton.createApi(configs)
    }

    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected formatResultBase(data: IRawResult) {
        return this.formatResult<IResultData>(data)
    }

    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected formatResult<D extends IResultData>(data: IRawResult) {
        return {
            errorCode: data.error_code,
            ok: data.error_code === 0,
            ...data
        } as IResult<D>
    }

    /**
     * Format search result data, if error found, report it
     * @param data Raw search result data
     */
    protected formatSearchResult<D>(data: any) {
        // error_code is the flag property of the error result
        if('error_code' in data) {
            throw new ResultError(this.formatResultBase(data))
        }

        return data as D
    }

    /**
     * Data report
     * @param id Field of data
     * @param parameters Parameters
     */
    async report<D>(id: string, parameters: string | undefined = undefined) {
        return this.formatSearchResult<D>((await this.api.get(`report/${id}`, { params: { p: parameters} })).data)
    }

    /**
     * Search source data
     * @param conditions Search conditions
     */
    async searchBase<D, M extends TiplistModel>(conditions: M | undefined = undefined) {
        return this.formatSearchResult<D>((await this.api.get('', { params: conditions })).data)
    }

    /**
     * Get tiplist data
     * @param model Data model
     */
    async tiplist<M extends TiplistModel>(model: M | undefined = undefined) {
        return this.formatSearchResult<IListItem[]>((await this.api.get('tiplist', { params: model })).data)
    }

    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    async viewBase(id: number, field:string | undefined = undefined) {
        return (await this.api.get(`${id}${field == null ? '' : '/' + field}`)).data
    }

    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    async view<D extends IViewModel>(id: number, field:string | undefined = undefined) {
        return this.formatSearchResult<D>(await this.viewBase(id, field))
    }

    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     */
    async viewF<V>(factory: IViewFactory<V>, id: number, field:string | undefined = undefined) {
        return factory(this.formatSearchResult<IViewModel>(await this.viewBase(id, field)))
    }
}