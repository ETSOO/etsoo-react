import { AxiosInstance } from "axios";
import { IApiEntity } from "../api/IApiEntity";
import { ApiSingleton } from "./ApiSingleton";
import { IApiUser } from "../api/IApiUser";
/**
 * Entity controller interface
 */
export interface IEntityController {
    /**
     * API
     */
    api: AxiosInstance;
    /**
     * Current entity description
     */
    entity: IApiEntity;
    /**
     * API Singleton
     */
    singleton: ApiSingleton;
    /**
     * Current user
     */
    user: IApiUser;
}
