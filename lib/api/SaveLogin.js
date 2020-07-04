import { ApiSettings } from "./IApiSettings";
/**
 * Get save login key
 */
const getSaveLoginKey = () => {
    // API settings
    const settings = ApiSettings.get();
    // Act
    return 'etsoo-savelogin-' + settings.role;
};
/**
 * Get data
 */
const get = () => {
    const data = localStorage.getItem(getSaveLoginKey());
    if (data)
        return JSON.parse(data);
};
/**
 * Save
 * @param data Save login data
 */
const save = (data) => {
    // Add or update
    localStorage.setItem(getSaveLoginKey(), JSON.stringify(data));
};
/**
 * Update token
 * @param token Save login token
 */
const update = (token) => {
    const data = get();
    if (data) {
        data.token = token;
        save(data);
    }
};
/**
 * Save login utils
 */
export const SaveLogin = {
    get,
    save,
    update
};
