import React from 'react'
import { ListChildComponentProps, Layout, ListOnScrollProps, ListItemKeySelector } from 'react-window'
import { ISearchItem, ISearchResult, ISearchLayoutItem } from '../views/ISearchResult'
import { Utils } from '../api/Utils'
import { InfiniteListBase, InfiniteListItemProps } from './InfiniteListBase'
import { InfiniteListSharedProps } from './InfiniteListSharedProps'
import InfiniteLoader from 'react-window-infinite-loader'
import { DataType } from '../api/DataType'

// Unique key for cache
const uniqueKey = 'infinitelist'

/**
 * List item renderer properties
 */
export interface ListItemRendererProps extends InfiniteListItemProps {
    /**
     * Data
     */
    data: ISearchItem | undefined

    /**
     * Layout
     */
    layouts?: ISearchLayoutItem[]

    /**
     * Is end of the list
     */
    end: boolean

    /**
     * Other custom data
     */
    other?: any

    /**
     * Total records
     */
    records?: number
}

/**
 * Infinite list on scroll callback properties
 */
export interface InfiniteListScrollProps {
    /**
     * Is vertical
     */
    vertical: boolean

    /**
     * Direction
     */
    direction: 'forward' | 'backward'

    /**
     * Offset
     */
    offset: number

    /**
     * Scroller
     */
    scroller: HTMLElement
}

/**
 * Infinite list props
 */
export interface InfiniteListProps extends InfiniteListSharedProps {
    /**
     * Has header item
     */
    hasHeader?: boolean

    /**
     * Has footer item
     */
    hasFooter?: boolean

    /**
     * Is horizontal layout
     */
    horizontal?: boolean

    /**
     * Inner container class name
     */
    innerClassName?: string

    /**
     * Item unit property name, default is id
     */
    itemKey?: string

    /**
     * Item renderer
     * @param props 
     */
    itemRenderer(props: ListItemRendererProps): React.ReactElement<ListItemRendererProps>

    /**
     * Item size (height)
     */
    itemSize: number

    /**
     * Load items callback
     * @param page Current page
     * @param records Records to load
     * @param orderIndex Order field index
     */
    loadItems(page: number, records: number, orderIndex?: number): Promise<ISearchResult<ISearchItem>>

    /**
     * On scroll callback
     * @param props Scroll properties
     */
    onScroll?(props: InfiniteListScrollProps): void

    /**
     * On scroll change callback
     * @param scroller Scroll HTML element
     * @param vertical Vertical scroll
     * @param zero Is zero scroll offset
     */
    onScrollChange?(scroller: HTMLElement, vertical: boolean, zero: boolean): void

    /**
     * Order field index
     */
    orderIndex?: number

    /**
     * Padding px
     */
    padding?: number

    /**
     * Records to read onetime
     */
    records?: number
}

/**
 * Infinite list state
 */
class InfiniteListState {
    /**
     * Data
     */
    data?: any

    /**
     * Items
     */
    items: (ISearchItem | undefined)[]

    /**
     * Columns layout
     */
    layouts?: ISearchLayoutItem[]

    /**
     * Loading or not
     */
    loading: boolean

    /**
     * All data is loaded
     */
    loaded: boolean

    /**
     * Current page
     */
    page: number

    /**
     * Total records
     */
    records?: number

    /**
     * Last scroll offsets
     */
    scrollLast?: number[]

    /**
     * Current scroll left
     */
    scrollLeft?: number

    /**
     * Current scroll top
     */
    scrollTop?: number

    /**
     * Constrcutor
     */
    constructor() {
        this.items = []
        this.loading = false
        this.loaded = false
        this.page = 0
    }
}

/**
 * Calculate list key
 * @param index Current index
 * @param data Current data
 * @param key Key field
 */
function InfiniteListKey(index: number, data: ISearchItem, key: string) {
    if(data == null || data[key] == null)
        return 'SYS' + index
    return data[key]
}

/**
 * Infinite list public methods
 */
export interface InfinitListMethods {
    /**
     * Clear the list cache
     */
    clearCache(): void

    /**
     * Get the index item
     * @param index Item index
     */
    getItem(index: number): ISearchItem | undefined

    /**
     * Reset all data and rerenderer
     */
    reset():void

    /**
     * Select all items
     * @param selected Selected
     */
    selectAll(selected: boolean): void

    /**
     * Select the index item
     * @param index Target index
     */
    selectItem(index: number): ISearchItem | undefined

    /**
     * Sort data
     * @param field Field name
     * @param type Data type
     * @param index Sort field index
     */
    sort(field: string, type: DataType, index: number): void
}

// Format items
const formatItems = (items: (ISearchItem | undefined)[], hasHeader?: boolean) => {
    // Header
    if(hasHeader) {
        // Insert header item
        if(items.length == 0 || items[0]?.viewFlag !== -1)
            items.unshift({loading: false, viewFlag: -1})
    } else if(items.length > 0) {
        // No header, remove the first header item
        if(items[0]!.viewFlag === -1)
            items.shift()
    }
}

/**
 * Infinite list component
 * @param pros Properties
 */
export const InfiniteList = React.forwardRef<InfinitListMethods, InfiniteListProps>((props, ref) => {
    // Avoid unnecessary load
    if((props.height == null || props.height == 0) && props.records == null)
        return <></>

    // Default records calcuated with height
    const records = Math.ceil(props.records || (1.5 * props.height! / props.itemSize))

    // Default calcuated height
    const height = (props.height || records * props.itemSize)

    // Default 100% width
    const width = props.width || '100%'

    // Layout
    const layout: Layout = props.horizontal ? 'horizontal'  : 'vertical'

    // Item key
    const itemKey: ListItemKeySelector = (index, data) => {
        return InfiniteListKey(index, data, props.itemKey || 'id')
    }

    // Loader reference
    const loaderRef = React.useRef<InfiniteLoader>(null)

    // Dom reference
    const domRef = React.useRef<HTMLDivElement>(null)

    // State without update
    let defaultState = Utils.cacheSessionDataParse<InfiniteListState>(Utils.getLocationKey(uniqueKey))
    if(!defaultState)
        defaultState = new InfiniteListState()

    const[state] = React.useState(defaultState)

    // Header
    formatItems(state.items, props.hasHeader)

    // Item count with update, start with 1 for lazy loading later
    const[itemCount, updateItemCount] = React.useState(state.items.length + (state.loaded ? 0 : 1))

    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        clearCache() {
            loaderRef.current?.resetloadMoreItemsCache(false)
        },

        getItem(index: number) {
            if(index < state.items.length)
                return state.items[index]
            return undefined
        },

        reset() {
            // Reset state
            state.data = undefined
            state.items = []
            state.layouts = undefined
            state.loading = false
            state.loaded = false
            state.page = 0
            state.records = undefined
            state.scrollLast = undefined
            state.scrollLeft = undefined
            state.scrollTop = undefined

            // Format items
            formatItems(state.items, props.hasHeader)

            // Reset session storage cache
            Utils.cacheSessionData(state, Utils.getLocationKey(uniqueKey))

            // Clear the cached items
            loaderRef.current?.resetloadMoreItemsCache(true)
        },

        selectAll(selected: boolean) {
            if(domRef.current) {
                const cbItems = domRef.current.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-selectable]')
                cbItems.forEach(cb => {
                    if(cb.checked !== selected)
                        cb.click()
                })
            }
        },
        
        selectItem(index: number) {
            if(index < state.items.length)
                return state.items[index]
            return undefined
        },

        sort(field: string, type: DataType, index: number) {
            // Two cases
            if(state.loaded) {
                // First all data is loaded
                Utils.sortItems(state.items, field, type, index > 0)

                // Cache
                Utils.cacheSessionData(state, Utils.getLocationKey(uniqueKey))
            } else {
                // Loaded from database
                this.reset()
            }
        }
    }))

    // On scroll handler
    const onScroll = (props.onScroll || props.onScrollChange) ? (p: ListOnScrollProps) => {
        if(domRef.current == null)
            return

        if(props.onScrollChange) {
            if(p.scrollOffset === 0 && state.scrollTop !== 0) {
                state.scrollTop = 0
                props.onScrollChange(domRef.current.parentElement!, true, true)
            } else if(state.scrollTop == null || state.scrollTop === 0) {
                state.scrollTop = p.scrollOffset
                props.onScrollChange(domRef.current.parentElement!, true, false)
            }
        } else {
            const sp: InfiniteListScrollProps = { vertical: true, direction: p.scrollDirection, offset: p.scrollOffset, scroller: domRef.current.parentElement! }
            props.onScroll!(sp)
        }
    } : undefined

    // Is current item loaded
    const isItemLoaded = (index: number) => {
        return state.loaded || index < state.items.length
    }

    // Load more items callback
    const loadMoreItems = (startIndex: number, stopIndex: number) => {
        // Check
        if(state.loaded || state.loading)
            return null

        // Update loading status
        state.loading = true

        // Current items
        const items = state.items

        // Insert a loading item
        items.push({loading: true})

        // Update item count
        //updateItemCount(items.length + 1)

        return new Promise(resolve => {
            // Read next page
            const page = state.page + 1

            // Update rightnow to avoid delay below
            state.page = page

            props.loadItems(page, records, props.orderIndex).then((results) => {
                // Remove the loading item
                items.pop()

                // Start index
                if(page == 1) {
                    // Update other data
                    state.data = results.data
                    state.layouts = results.layouts
                    state.records = results.records
                }

                // Loaded items
                const loadedItems = results.items || []
                const loadedLen = loadedItems.length

                // Is the end
                const loaded: boolean = loadedLen < records
                state.loaded = loaded
                state.loading = false

                // Insert items
                if(loadedLen > 0)
                    items.push(...loadedItems)

                // Update item count
                updateItemCount(items.length + (loaded ? 0 : 1))

                // Resolve to complete
                resolve()
            })
        })
    }

    // Render an item or a loading indicator
    const itemRenderer = (lp: InfiniteListItemProps) => {
        // Implement padding
        const style = lp.style
        let customStyle = {}
        if(props.padding != null && props.padding != 0) {
            customStyle = {
                left: `${props.padding + Utils.parseNumber(style.left)}px`,
                top: `${props.padding + Utils.parseNumber(style.top)}px`,
                width: `calc(100% - ${2 * props.padding}px)`
            }
        }

        // Current data
        const data = state.items[lp.index]

        // Renderer properties
        const newProps: ListItemRendererProps = {
            data: data,
            end: (lp.index + 1 == itemCount),
            index: lp.index,
            isScrolling: lp.isScrolling,
            layouts: state.layouts,
            other: state.data,
            records: state.records,
            style: {
                ...style,
                ...customStyle
            }
        }

        // Call renderer callback
        return props.itemRenderer(newProps)
    }

    // Inner element callback
    const innerElementType = ({style, ...rest}: ListChildComponentProps) => {
        if(props.padding) {
            style.height = Utils.parseNumber(style.height) + 2 * props.padding
        }

        return (
            <div
                ref={domRef}
                className={props.innerClassName}
                style={style}
                {...rest}
            />
        )
    }

    // Outer element callback
    // outerElementType, set padding will cause the browser to reset when items loaded
    // Changed to adding padding to height

    React.useEffect(() => {
        // Scroll container element
        const scrollContainer = domRef.current?.parentElement
        if(scrollContainer && state.scrollLast) {
            scrollContainer.scrollTo({
                left: state.scrollLast[0] || 0,
                top: state.scrollLast[1] || 0,
                behavior: 'smooth'
            })
        }

        // Cache url
        const url = window.location.href

        return () => {
            if(scrollContainer) {
                // Update scroll offset
                state.scrollLast = [scrollContainer.scrollLeft, scrollContainer.scrollTop]

                // Cache data, window.location.href here is the navigated URL, use the cached url
                Utils.cacheSessionData(state, url + ':' + uniqueKey)
            }
        }
    }, [domRef.current])

    // Return component
    return (
        <InfiniteListBase
            className={props.className}
            height={height}
            innerElementType={innerElementType}
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            itemKey={itemKey}
            itemRenderer={itemRenderer}
            itemSize={props.itemSize}
            layout={layout}
            loadMoreItems={loadMoreItems}
            minimumBatchSize={records}
            onScroll={onScroll}
            ref={loaderRef}
            threshold={props.threshold}
            width={width}
        />
    )
})