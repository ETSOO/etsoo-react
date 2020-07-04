import axios from 'axios';
/**
 * Entity API controller
 */
export class EntityController {
    /**
     * Constructor
     * @param settings Settings
     * @param user Current user
     * @param entity Entity settings
     */
    constructor(settings, user, entity) {
        this.settings = settings;
        this.user = user;
        this.entity = entity;
        // Initialize the base url of the API
        if (entity.baseUrl)
            this.baseUrl = entity.baseUrl;
        else
            this.baseUrl = settings.endpoint + '/' + entity.identity;
        // API configuration
        this.api = axios.create({
            baseURL: this.baseUrl,
            headers: { 'Authorization': 'Bearer ' + settings.token }
        });
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
     * Get tiplist data
     * @param model Data model
     */
    async tiplist(model = null) {
        return (await this.api.get('tiplist', { params: model })).data;
    }
    /**
     * View entity
     * @param id Entity id
     * @param field Data region
     */
    async viewBase(id, field = null) {
        return (await this.api.get(`view/${id}${field == null ? '' : '/' + field}`)).data;
    }
    /**
     * View entity with strong type
     * @param id Entity id
     * @param field Data region
     */
    async view(id, field = null) {
        return (await this.viewBase(id, field));
    }
}
