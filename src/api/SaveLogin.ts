import { ApiSettings } from "./IApiSettings"

/**
 * Get save login key
 */
const getSaveLoginKey = () => {
    // API settings
    const settings = ApiSettings.get()

    // Act
    return 'etsoo-savelogin-' + settings.role
}

/**
 * Save login data interface
 */
export interface SaveLoginData {
    /**
     * User id
     */
    readonly id: number,

    /**
     * Raw user id for login
     */
    readonly rawId: string,

    /**
     * Token
     */
    token?: string
}

/**
 * Get data
 */
const get = () => {
    const data = localStorage.getItem(getSaveLoginKey())
    if(data)
        return JSON.parse(data) as SaveLoginData
}

/**
 * Save
 * @param data Save login data
 */
const save = (data: SaveLoginData) => {
    // Add or update
    localStorage.setItem(getSaveLoginKey(), JSON.stringify(data))
}

/**
 * Update token
 * @param token Save login token 
 */
const update = (token?: string) => {
    const data = get()
    if(data) {
        data.token = token
        save(data)
    }
}

/**
 * Save login utils
 */
export const SaveLogin = {
    get,
    save,
    update
}