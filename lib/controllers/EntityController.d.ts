import { AxiosInstance } from 'axios';
import { IApiUser } from '../api/IApiUser';
import { IApiEntity } from '../api/IApiEntity';
import { IResult, IRawResult, IResultData, IdResultData } from '../api/IResult';
import { TiplistModel } from '../models/TiplistModel';
import { IListItem } from '../views/IListItem';
import { IViewModel } from '../views/IView';
import { IViewFactory } from '../views/IViewFactory';
import { ApiSingleton } from './ApiSingleton';
import { IApiConfigs } from './IApiConfigs';
import { IEntityController } from './IEntityController';
import { IAddData, IEditData } from '../api/IDynamicData';
import { SearchModel } from '../models/SearchModel';
/**
 * Entity API controller
 */
export declare abstract class EntityController implements IEntityController {
    #private;
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected static formatResult<D extends IResultData>(data: IRawResult): IResult<D>;
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    protected static formatResultBase(data: IRawResult): IResult<IResultData>;
    /**
     * Format search result data, if error found, report it
     * @param data Raw search result data
     */
    protected static formatSearchResult<D>(data: any): D;
    /**
     * Format search model
     * @param field Field for search range
     * @param model Search condition
     */
    protected static formatSearchModel(field: string, model?: SearchModel): SearchModel;
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
     * Add entity
     * @param data Model data
     */
    add(data: IAddData): Promise<IResult<IdResultData>>;
    /**
     * Add entity extended
     * @param data Model data
     */
    addExtended<D extends IResultData>(data: IAddData): Promise<IResult<D>>;
    /**
     * Delete entities
     * @param ids Ids to delete
     */
    delete(...ids: (number | string)[]): Promise<IResult<IResultData>>;
    /**
     * Edit entity
     * @param id Entity's id
     * @param data Model data
     */
    edit(id: number | string, data: IEditData): Promise<IResult<IdResultData>>;
    /**
     * Edit entity extended
     * @param id Entity's id
     * @param data Model data
     */
    editExtended<D extends IResultData>(id: number | string, data: IEditData): Promise<IResult<D>>;
    /**
     * Data report
     * @param id Field of data
     * @param parameters Parameters
     */
    report<D>(id: string, parameters?: string): Promise<D>;
    /**
     * Search source data
     * @param conditions Search conditions
     */
    searchBase<D, M extends TiplistModel>(conditions?: M): Promise<D>;
    /**
     * Get tiplist data
     * @param model Data model
     */
    tiplist<M extends TiplistModel>(model?: M): Promise<IListItem[]>;
    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    viewBase(id: number, field?: string): Promise<any>;
    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    view<D extends IViewModel>(id: number, field?: string): Promise<D>;
    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     */
    viewF<V>(factory: IViewFactory<V>, id: number, field?: string): Promise<V>;
}
