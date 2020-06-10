import React from 'react'
import { ListChildComponentProps, Layout, ListOnScrollProps, ListItemKeySelector } from 'react-window'
import { ISearchItem, ISearchResult, ISearchLayoutItem } from '../views/ISearchResult'
import { Utils } from '../api/Utils'
import { InfiniteListBase, InfiniteListItemProps } from './InfiniteListBase'
import { InfiniteListSharedProps } from './InfiniteListSharedProps'
import InfiniteLoader from 'react-window-infinite-loader'

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
     */
    loadItems(page: number, records: number): Promise<ISearchResult<ISearchItem>>

    /**
     * On scroll callback
     */
    onScroll?: (props: ListOnScrollProps) => any

    /**
     * Padding px
     */
    padding?: number

    /**
     * Records to read onetime
     */
    records: number
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
     * Select all items
     * @param selected Selected
     */
    selectAll(selected: boolean): void

    /**
     * Select the index item
     * @param index Target index
     */
    selectItem(index: number): ISearchItem | undefined
}

/**
 * Infinite list component
 * @param pros Properties
 */
export const InfiniteList = React.forwardRef<InfinitListMethods, InfiniteListProps>((props, ref) => {
    // Avoid unnecessary load
    if(props.height == null || props.height < 1)
        return <></>

    // Default calcuated height
    const height = (props.height || props.records * props.itemSize)

    // Default 100% width
    const width = props.width || '100%'

    // Layout
    const layout: Layout = props.horizontal ? 'horizontal'  : 'vertical'

    // Item key
    const itemKey: ListItemKeySelector = (index, data) => {
        return InfiniteListKey(index, data, props.itemKey || 'id')
    }

    // Loader reference
    const loaderReference = React.useRef<InfiniteLoader>(null)

    // State without update
    const[state] = React.useState(new InfiniteListState())

    // Item count with update, start with 1 for lazy loading later
    const[itemCount, updateItemCount] = React.useState(1)

    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        selectAll(selected: boolean) {
            console.log(loaderReference.current)
        },
        
        selectItem(index: number) {
            if(index < state.items.length)
                return state.items[index]
            return undefined
        }
    }))

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

            props.loadItems(page, props.records).then((results) => {
                // Remove the loading item
                items.pop()

                // Start index
                if(page == 1) {
                    // Update other data
                    state.data = results.data
                    state.layouts = results.layouts
                    state.records = results.records

                    if(props.hasHeader) {
                        // Insert header item
                        items.push({loading: false})
                    }
                }

                // Loaded items
                const loadedItems = results.items || []
                const loadedLen = loadedItems.length

                // Is the end
                const loaded: boolean = loadedLen < props.records
                state.loaded = loaded
                state.loading = false

                // Insert items
                if(loadedLen > 0)
                    items.push(...loadedItems)

                // Resolve to complete
                resolve()

                // Update item count
                updateItemCount(items.length + (loaded ? 0 : 1))
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

        // Add key
        if(data && !data.loading)
            data['_key'] = itemKey(lp.index, data)

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
    const innerElementType = React.forwardRef<HTMLDivElement, ListChildComponentProps>(({style, ...rest}, ref) => {
        if(props.padding) {
            style.height = Utils.parseNumber(style.height) + 2 * props.padding
        }

        return (
            <div
                ref={ref}
                className={props.innerClassName}
                style={style}
                {...rest}
            />
        )
    })

    // Outer element callback
    // outerElementType, set padding will cause the browser to reset when items loaded
    // Changed to adding padding to height

    // Return component
    return (
        <InfiniteListBase
            className={props.className}
            height={height}
            innerElementType={innerElementType}
            initialScrollOffset={props.initialScrollOffset}
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            itemKey={itemKey}
            itemRenderer={itemRenderer}
            itemSize={props.itemSize}
            layout={layout}
            loadMoreItems={loadMoreItems}
            minimumBatchSize={props.records}
            onScroll={props.onScroll}
            ref={loaderReference}
            threshold={1}
            width={width}
        />
    )
})