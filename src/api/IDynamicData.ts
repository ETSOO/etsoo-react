/**
 * Dynamic data
 * Indexable type
 */
export interface IDynamicData {
    [key: string]: any
}

/**
 * Add model data
 */
export interface IAddData extends IDynamicData {
}

/**
 * Edit model data
 */
export interface IEditData extends IDynamicData {
}
