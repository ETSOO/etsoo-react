import { AxiosInstance } from 'axios';
import { IApiUser } from "../api/IApiUser";
import { IApiEntity } from '../api/IApiEntity';
import { IResult, IRawResult, IResultData } from '../api/IResult';
import { TiplistModel } from '../models/TiplistModel';
import { IListItem } from '../views/IListItem';
import { IViewModel } from '../views/IView';
import { IViewFactory } from '../views/IViewFactory';
import { ApiSingleton } from './ApiSingleton';
import { IApiConfigs } from './IApiConfigs';
import { IEntityController } from './IEntityController';
/**
 * Entity API controller
 */
export declare abstract class EntityController implements IEntityController {
    #private;
    /**
     * API
     */
    get api(): AxiosInstance;
    /**
     * Current entity description
     */
    get entity(): IApiEntity;
    /**
     * API Singleton
     */
    get singleton(): ApiSingleton;
    /**
     * Current user
     */
    get user(): IApiUser;
    /**
     * Constructor
     * @param user Current user
     * @param entity Entity settings
     * @param configs Additional API configs
     */
    protected constructor(user: IApiUser, entity: IApiEntity, configs: IApiConfigs);
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected formatResultBase(data: IRawResult): IResult<IResultData>;
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected formatResult<D extends IResultData>(data: IRawResult): IResult<D>;
    /**
     * Format search result data, if error found, report it
     * @param data Raw search result data
     */
    protected formatSearchResult<D>(data: any): D;
    /**
     * Data report
     * @param id Field of data
     * @param parameters Parameters
     */
    report<D>(id: string, parameters?: string | undefined): Promise<D>;
    /**
     * Search source data
     * @param conditions Search conditions
     */
    searchBase<D, M extends TiplistModel>(conditions?: M | undefined): Promise<D>;
    /**
     * Get tiplist data
     * @param model Data model
     */
    tiplist<M extends TiplistModel>(model?: M | undefined): Promise<IListItem[]>;
    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    viewBase(id: number, field?: string | undefined): Promise<any>;
    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    view<D extends IViewModel>(id: number, field?: string | undefined): Promise<D>;
    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     */
    viewF<V>(factory: IViewFactory<V>, id: number, field?: string | undefined): Promise<V>;
}
