import { AxiosInstance } from 'axios';
import { IApiSettings } from "./IApiSettings";
import { IApiUser } from "./IApiUser";
import { IApiEntity } from './IApiEntity';
import { IResult, IRawResult, IResultData } from './IResult';
import { TiplistModel } from '../models/TiplistModel';
import { IListItem } from './IListItem';
import { IViewModel } from './IViewModel';
/**
 * Entity API controller
 */
export declare abstract class EntityController {
    /**
     * API
     */
    protected api: AxiosInstance;
    /**
     * Base url of the API
     */
    private baseUrl;
    /**
     * Current entity description
     */
    protected entity: IApiEntity;
    /**
     * Settings
     */
    private settings;
    /**
     * Current user
     */
    private user;
    /**
     * Constructor
     * @param settings Settings
     * @param user Current user
     * @param entity Entity settings
     */
    protected constructor(settings: IApiSettings, user: IApiUser, entity: IApiEntity);
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
     * Get tiplist data
     * @param model Data model
     */
    tiplist<M extends TiplistModel>(model?: M | null): Promise<IListItem[]>;
    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    viewBase(id: number, field?: string | null): Promise<any>;
    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    view<D extends IViewModel>(id: number, field?: string | null): Promise<D>;
}
