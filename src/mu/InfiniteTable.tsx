import React from "react"
import { InfiniteList, ListItemRendererProps, InfinitListMethods, InfiniteListScrollProps } from "../apps/InfiniteList"
import { ISearchItem, ISearchLayoutItem, ISearchResult, searchLayoutAlign } from "../views/ISearchResult"
import { makeStyles, CircularProgress, Theme, TableCell, useTheme, Checkbox, TableSortLabel } from "@material-ui/core"
import { Utils } from "../api/Utils"
import { InfiniteListSharedProps } from "../apps/InfiniteListSharedProps"
import { DataType } from "../api/DataType"

/**
 * Infinite table props
 */
export interface InfiniteTableProps extends InfiniteListSharedProps {
    /**
     * Footer renderer
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    footerRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement
    
    /**
     * Header renderer
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    headerRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement

    /**
     * Is hide header
     */
    hideHeader?: boolean

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
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    itemRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement

    /**
     * Load items callback
     * @param page Current page
     * @param records Records to load
     * @param orderIndex Order field index
     */
    loadItems(page: number, records: number, orderIndex?: number): Promise<ISearchResult<ISearchItem>>

    /**
     * Item click handler
     * @param event Click event
     * @param item Current item
     */
    onItemClick?(event: React.MouseEvent, item: ISearchItem | undefined): void

    /**
     * On scroll callback
     * @param props Scroll properties
     */
    onScroll?(props: InfiniteListScrollProps): void

    /**
     * Order field index
     */
    orderIndex?: number

    /**
     * On scroll change callback
     * @param scroller Scroll HTML element
     * @param vertical Vertical scroll
     * @param zero Is zero scroll offset
     */
    onScrollChange?(scroller: HTMLElement, vertical: boolean, zero: boolean): void

    /**
     * Padding, Material space unit
     */
    padding?: number

    /**
     * Records to read onetime
     */
    records?: number

    /**
     * Row height
     */
    rowHeight: number

    /**
     * Selectable
     */
    selectable?: boolean

    /**
     * Sortable
     */
    sortable?: boolean
}

/**
 * Infinite table public methods
 */
export interface InfiniteTableMethods extends InfinitListMethods {
}

// Table styles
const useStyles = makeStyles((theme) => ({
    table: {
    },

    tableHeader: {
        backgroundColor: '#d3d3d3!important'
    },

    tableFooter: {
        fontWeight: 'bold'
    },

    tableCell: {
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '100%'
    },

    tableCheckbox: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: '6px'

    },

    tableRow: {
        display: 'flex',
        alignItems: 'end',
        boxSizing: 'border-box',
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
        borderLeftStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: '#aaa',
        borderRightStyle: 'solid'
    },

    tableRowClick: {
        cursor: 'pointer'
    },

    tableRowOne: {
        // Because the rows are dynamically generated, will blink when use &:nth-of-type(odd) with tableRow
        backgroundColor: '#f3f3f3'
    }
}))

/**
 * Get table row class
 * @param columns Columns
 */
export function InfiniteTableGetRowClass(columns: ISearchLayoutItem[], selectable?: boolean) {
    // Css template columns
    const styles = columns.map(c => {
        if(c.width)
            return c.width + 'px'
        else if(c.widthmin && c.widthmax)
            return `minmax(${c.widthmin}px, ${c.widthmax}px)`
        else if(c.widthmin)
            return `minmax(${c.widthmin}px, max-content)`
        else if(c.widthmax)
            return `minmax(min-content, ${c.widthmax}px)`
        else
            return 'auto'
    })

    // When selectable, add a column
    if(selectable)
        styles.unshift('min-content')

    return {
        display: 'grid',
        gridTemplateColumns: styles.join(' ')
    }
}

/**
 * Infinite MUI table
 */
export const InfiniteTable = React.forwardRef<InfiniteTableMethods, InfiniteTableProps>(({ innerClassName, footerRenderer, headerRenderer, height, hideHeader, itemRenderer, onItemClick, orderIndex, padding, rowHeight, selectable, sortable, ...rest }, ref) => {
    // Avoid unnecessary load
    if(height == null || height < 1)
        return <></>

    // Calculate padding from Material space unit to px
    const paddingPX = padding ? useTheme().spacing(padding) : undefined

    // Has header
    const hasHeader = hideHeader == null ? true : !hideHeader

    // Has footer
    const hasFooter = footerRenderer != null

    // Style
    const classes = useStyles()

    // Cached order index
    const cacheOrderIndexKey = 'orderIndex'
    const cachedOrderIndex = Utils.cacheSessionDataParse<number>(Utils.getLocationKey(cacheOrderIndexKey))

    // Local order index
    const [localOrderIndex, updateLocalOrderIndex] = React.useState(cachedOrderIndex == undefined || isNaN(cachedOrderIndex) ? orderIndex : cachedOrderIndex)

    // Ref to the list
    let listRef = React.useRef<InfinitListMethods>(null)

    // Cached column style
    let columnClass: { display: string, gridTemplateColumns: string } | undefined = undefined

    // Select all handler
    const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {

    }

    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        ...listRef.current!
    }))

    // Select item handler
    const onSelectItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
    }

    // Item click handler
    const itemClickHandler = onItemClick ? (event:React.MouseEvent<HTMLDivElement>) => {
        // Avoid input & button click
        if(event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement)
            return

        // Index
        const index = Utils.parseNumber(event.currentTarget.dataset['index'])

        // Index item
        const item = listRef.current ? listRef.current.getItem(index) : undefined

        // Item click callback
        onItemClick(event, item)
    } : undefined

    // Field sort
    const createSortHandler = (field: string, type: DataType, index: number) => (event: React.MouseEvent<any>) => {
        // Calucate real order index
        let cIndex: number
        if(localOrderIndex == null || index != Math.abs(localOrderIndex) || index == -localOrderIndex)
            cIndex = index
        else
            cIndex = -index

        // Sort data and cache
        listRef.current?.sort(field, type, cIndex)

        // Cache order index
        Utils.cacheSessionString(cIndex.toString(), Utils.getLocationKey(cacheOrderIndexKey))

        // Rerenderer
        updateLocalOrderIndex(cIndex)
    }

    // Create field sort
    const createSort = (index: number) => {
        // Is the sort field active
        const active = localOrderIndex != null && index == Math.abs(localOrderIndex)

        // Direction
        let direction: 'asc' | 'desc' | undefined = undefined
        if(localOrderIndex) {
            direction = active ? ( localOrderIndex! > 0 ? 'asc' : 'desc' ) : 'asc'
        }

        return {
            active,
            direction
        }
    }

    // Table renderer
    const tableItemRenderer = (p: ListItemRendererProps) => {
        if(p.data) {
            // Row classes
            const classNames = [classes.tableRow]

            // Rows
            let rows: React.ReactElement
            if(p.data.loading) {
                rows = <TableCell
                    component="div"
                    className={classes.tableCell}
                >
                    <CircularProgress size={20} />
                </TableCell>
            } else {
                // Alternative row style
                if(p.index % 2 == 0)
                    classNames.push(classes.tableRowOne)

                // Cache column style
                if(columnClass == null && p.layouts)
                    columnClass = InfiniteTableGetRowClass(p.layouts, selectable)

                // Rows
                if(hasHeader && p.index === 0) {
                    classNames.push(classes.tableHeader)

                    if(headerRenderer) {
                        rows = headerRenderer(p, classes.tableCell, classNames)
                    } else if(p.layouts) {
                        Object.assign(p.style, columnClass)

                        rows = <>{selectable && (
                            <TableCell
                                component="div"
                                className={Utils.mergeClasses(classes.tableCell, classes.tableCheckbox)}
                            >
                                <Checkbox
                                    onChange={onSelectAll}
                                />
                            </TableCell>
                        )}{p.layouts.map((c, columnIndex) => (
                            <TableCell
                                component="div"
                                key={'head' + c.field}
                                className={classes.tableCell}
                                align={searchLayoutAlign(c.align)}
                            >
                                { sortable && c.sort != null ? (<TableSortLabel
                                    {...createSort(c.sort)}
                                    className={classes.tableRowClick}
                                    onClick={createSortHandler(c.field, c.type, c.sort)}
                                >
                                    {c.label || c.field}
                                </TableSortLabel>) : (
                                    <>{c.label || c.field}</>
                                ) }
                            </TableCell>
                        ))}</>
                    } else {
                        rows = <TableCell
                            component="div"
                            className={classes.tableCell}
                        >
                            <CircularProgress size={20} />
                        </TableCell>
                    }
                } else if(hasFooter && p.end) {
                    classNames.push(classes.tableFooter)
                    rows = footerRenderer!(p, classes.tableCell, classNames)
                } else if(itemRenderer) {
                    rows = itemRenderer(p, classes.tableCell, classNames)
                } else if(p.layouts) {
                    // Support item click
                    if(onItemClick)
                        classNames.push(classes.tableRowClick)

                    Object.assign(p.style, columnClass)
                    rows = <>{selectable && (
                        <TableCell
                            component="div"
                            className={Utils.mergeClasses(classes.tableCell, classes.tableCheckbox)}
                        >
                        <Checkbox
                            inputProps={
                                {
                                    'data-selectable': p.index
                                } as any
                            }
                            checked={p.data.selected}
                            onChange={onSelectItem}
                        />
                    </TableCell>
                    )}{p.layouts.map((c) => (
                        <TableCell
                            component="div"
                            key={c.field}
                            className={classes.tableCell}
                            align={searchLayoutAlign(c.align)}
                        >
                            {p.data![c.field]}
                        </TableCell>
                    ))}</>
                } else {
                    console.log(p)
                    rows = <TableCell
                        component="div"
                        className={classes.tableCell}
                    >
                    </TableCell>
                }
            }
            return (
                <div style={p.style} className={Utils.mergeClasses(...classNames)} data-index={p.index} onClick={itemClickHandler}>
                    {rows}
                </div>
            )
        } else {
            return <></>
        }
    }

    return (
        <InfiniteList ref={listRef} height={height} innerClassName={Utils.mergeClasses(classes.table, innerClassName)} itemRenderer={tableItemRenderer} hasFooter={hasFooter} hasHeader={hasHeader} itemSize={rowHeight} orderIndex={localOrderIndex} padding={paddingPX} {...rest}/>
    )
})