import { IDynamicData } from "./IDynamicData"

/**
 * Click action callback interface
 */
export interface IClickCallback {
    (): void
}

/**
 * Click action interface
 */
export interface IClickAction {
    /**
     * Label of the item
     */
    label: string

    /**
     * Navigation URL or callback
     */
    action: string | IClickCallback

    /**
     * Icon
     */
    icon?: React.ReactElement
}