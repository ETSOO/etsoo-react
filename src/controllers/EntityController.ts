import { AxiosInstance } from 'axios'
import { IApiUser } from "../api/IApiUser"
import { IApiEntity } from '../api/IApiEntity'
import { IResult, IRawResult, IResultData } from '../api/IResult'
import { TiplistModel } from '../models/TiplistModel'
import { IListItem } from '../views/IListItem'
import { IViewModel } from '../views/IView'
import { IViewFactory } from '../views/IViewFactory'
import { ApiSingleton } from './ApiSingleton'
import { Notifier } from '../mu/Notifier'
import { IApiConfigs } from './IApiConfigs'

/**
 * Entity API controller
 */
export abstract class EntityController {
    /**
     * API
     */
    protected api: AxiosInstance

    /**
     * Current entity description
     */
    protected entity: IApiEntity

    /**
     * API Singleton
     */
    public singleton: ApiSingleton

    /**
     * Current user
     */
    private user: IApiUser

    /**
     * Constructor
     * @param user Current user
     * @param entity Entity settings
     * @param configs Additional API configs
     */
    protected constructor(user: IApiUser, entity: IApiEntity, configs: IApiConfigs) {
        // API Singleton
        this.singleton = ApiSingleton.getInstance(new Notifier())

        // Init
        this.user = user
        this.entity = entity

        // API configuration
        if(configs.baseUrl == null)
            configs.baseUrl = this.singleton.settings.endpoint + '/' + entity.identity
        this.api = this.singleton.createApi(configs)
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
     * Search source data
     * @param conditions Search conditions
     */
    async searchBase<D, M extends TiplistModel>(conditions: M | null = null) {
        return (await this.api.get('', { params: conditions })).data as D
    }

    /**
     * Get tiplist data
     * @param model Data model
     */
    async tiplist<M extends TiplistModel>(model: M | null = null) {
        return (await this.api.get('tiplist', { params: model })).data as IListItem[]
    }

    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    async viewBase(id: number, field:string | null = null) {
        return (await this.api.get(`${id}${field == null ? '' : '/' + field}`)).data
    }

    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    async view<D extends IViewModel>(id: number, field:string | null = null) {
        return (await this.viewBase(id, field)) as D
    }

    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     */
    async viewF<V>(factory: IViewFactory<V>, id: number, field:string | null = null) {
        return factory((await this.viewBase(id, field)) as IViewModel)
    }
}