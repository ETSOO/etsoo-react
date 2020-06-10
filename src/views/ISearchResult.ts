import { Align } from "../api/Align"
import { DataType } from "../api/DataType"
import { Utils } from "../api/Utils"

/**
 * Common search layout item
 */
export interface ISearchLayoutItem {
    /**
     * Text align
     */
    align?: Align

    /**
     * Data field
     */
    field: string

    /**
     * Label
     */
    label?: string

    /**
     * Sortable
     */
    sortable?: boolean

    /**
     * Data type
     */
    type: DataType

    /**
     * Width
     */
    width?: number

    /**
     * Max width
     */
    widthmax?: number

    /**
     * Min width
     */
    widthmin?: number
}

/**
 * Common search item
 */
export interface ISearchItem {
    /**
     * Loaded or not
     */
    loading?: boolean

    /**
     * Key index
     */
    [key: string]: any
}

/**
 * Common search result
 */
export interface ISearchResult<T extends ISearchItem> {
    /**
     * Custom data
     */
    data?: any

    /**
     * Items
     */
    items: T[]

    /**
     * Layout
     */
    layouts?: ISearchLayoutItem[]

    /**
     * Total records
     */
    records?: number
}

/**
 * Format layouts callback interface
 */
interface SearchLayoutFormatCallback {
    (field: string): string | null
}

/**
 * From enum to string
 * @param align Align
 */
export const searchLayoutAlign = (align?: Align) => {
    if(align) {
        if(align == Align.Left)
            return 'left'
        else if(align == Align.Center)
            return 'center'
        else
            return 'right'
    } else {
        return undefined
    }
}

/**
 * Format layouts
 * @param layouts Layouts
 * @param callback Callback
 * @param firstOnly First letter only
 */
export const searchLayoutFormat = (layouts: ISearchLayoutItem[], callback: SearchLayoutFormatCallback | undefined = undefined, firstOnly: boolean = false) => {
    layouts.forEach(c => {
        // Callback
        let label = callback ? callback(c.field) : c.label

        if(label == null) {
            // Default format
            label = Utils.snakeNameToWord(c.field, firstOnly)
        }

        // Update
        Object.assign(c, {label})
    })
}