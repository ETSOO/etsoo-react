var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _api, _entity, _singleton, _user;
import { ResultError } from '../api/IResult';
import { ApiSingleton } from './ApiSingleton';
import { Notifier } from '../mu/Notifier';
/**
 * Entity API controller
 */
export class EntityController {
    /**
     * Constructor
     * @param user Current user
     * @param entity Entity settings
     * @param configs Additional API configs
     */
    constructor(user, entity, configs) {
        _api.set(this, void 0);
        _entity.set(this, void 0);
        _singleton.set(this, void 0);
        _user.set(this, void 0);
        // API Singleton
        __classPrivateFieldSet(this, _singleton, ApiSingleton.getInstance(new Notifier())
        // Init
        );
        // Init
        __classPrivateFieldSet(this, _user, user);
        __classPrivateFieldSet(this, _entity, entity
        // API configuration
        );
        // API configuration
        if (configs.baseUrl == null)
            configs.baseUrl = this.singleton.settings.endpoint + '/' + entity.identity;
        __classPrivateFieldSet(this, _api, this.singleton.createApi(configs));
    }
    /**
     * API
     */
    get api() {
        return __classPrivateFieldGet(this, _api);
    }
    /**
     * Current entity description
     */
    get entity() {
        return __classPrivateFieldGet(this, _entity);
    }
    /**
     * API Singleton
     */
    get singleton() {
        return __classPrivateFieldGet(this, _singleton);
    }
    /**
     * Current user
     */
    get user() {
        return __classPrivateFieldGet(this, _user);
    }
    /**
     * Add entity
     * @param data Model data
     */
    async add(data) {
        return this.addExtended(data);
    }
    /**
     * Add entity extended
     * @param data Model data
     */
    async addExtended(data) {
        return this.formatResult((await this.api.post('', data)).data);
    }
    /**
     * Delete entities
     * @param ids Ids to delete
     */
    async delete(...ids) {
        // Single id passed with path, otherwise as query parameters as 'ids=1&ids=2'
        const api = ids.length == 1 ? '/' + ids[0] : '?' + ids.map(id => `ids=${id}`).join('&');
        return this.formatResult((await this.api.delete(api)).data);
    }
    /**
     * Edit entity
     * @param id Entity's id
     * @param data Model data
     */
    async edit(id, data) {
        return this.editExtended(id, data);
    }
    /**
     * Edit entity extended
     * @param id Entity's id
     * @param data Model data
     */
    async editExtended(id, data) {
        return this.formatResult((await this.api.put(`/${id}`, data)).data);
    }
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    formatResultBase(data) {
        return this.formatResult(data);
    }
    /**
     * Format the result data to IResult interface
     * @param data Raw result data, avoid use any for simplicity
     */
    formatResult(data) {
        return {
            errorCode: data.error_code,
            ok: data.error_code === 0,
            ...data
        };
    }
    /**
     * Format search result data, if error found, report it
     * @param data Raw search result data
     */
    formatSearchResult(data) {
        // error_code is the flag property of the error result
        if ('error_code' in data) {
            throw new ResultError(this.formatResultBase(data));
        }
        return data;
    }
    /**
     * Data report
     * @param id Field of data
     * @param parameters Parameters
     */
    async report(id, parameters = undefined) {
        return this.formatSearchResult((await this.api.get(`report/${id}`, { params: { p: parameters } })).data);
    }
    /**
     * Search source data
     * @param conditions Search conditions
     */
    async searchBase(conditions = undefined) {
        return this.formatSearchResult((await this.api.get('', { params: conditions })).data);
    }
    /**
     * Get tiplist data
     * @param model Data model
     */
    async tiplist(model = undefined) {
        return this.formatSearchResult((await this.api.get('tiplist', { params: model })).data);
    }
    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    async viewBase(id, field = undefined) {
        return (await this.api.get(`${id}${field == null ? '' : '/' + field}`)).data;
    }
    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    async view(id, field = undefined) {
        return this.formatSearchResult(await this.viewBase(id, field));
    }
    /**
     * View entity with factory callback
     * @param id Entity id
     * @param field Data region
     */
    async viewF(factory, id, field = undefined) {
        return factory(this.formatSearchResult(await this.viewBase(id, field)));
    }
}
_api = new WeakMap(), _entity = new WeakMap(), _singleton = new WeakMap(), _user = new WeakMap();
