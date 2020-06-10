import React from "react"
import { InfiniteList, ListItemRendererProps, InfinitListMethods } from "../apps/InfiniteList"
import { ISearchItem, ISearchLayoutItem, ISearchResult, searchLayoutAlign } from "../views/ISearchResult"
import { makeStyles, CircularProgress, Theme, TableCell, useTheme, Checkbox } from "@material-ui/core"
import { Utils } from "../api/Utils"
import { InfiniteListSharedProps } from "../apps/InfiniteListSharedProps"

/**
 * Infinite table props
 */
export interface InfiniteTableProps extends InfiniteListSharedProps {
    /**
     * Footer renderer
     * @param props Properties
     * @param className Style class name
     */
    footerRenderer?(props: ListItemRendererProps, className: string): React.ReactElement
    
    /**
     * Header renderer
     * @param props Properties
     * @param className Style class name
     */
    headerRenderer?(props: ListItemRendererProps, className: string): React.ReactElement

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
     */
    itemRenderer?(props: ListItemRendererProps, className: string): React.ReactElement

    /**
     * Row height
     */
    rowHeight: number

    /**
     * Load items callback
     */
    loadItems(page: number, records: number): Promise<ISearchResult<ISearchItem>>

    /**
     * Padding, Material space unit
     */
    padding?: number

    /**
     * Records to read onetime
     */
    records: number

    /**
     * Selectable
     */
    selectable?: boolean
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
        textOverflow: 'ellipsis'
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

    tableRowOne: {
        // Because the rows are dynamically generated, will blink when use &:nth-of-type(odd) with tableRow
        backgroundColor: '#f3f3f3'
    }
}))


// Custom styles
interface ICustomStyle {
    /**
     * Selectable
     */
    selectable?: boolean

    /**
     * Template columns
     */
    templateColumns: string
}

// custom styles
const customStyles = makeStyles<Theme, ICustomStyle>((theme) => ({
    tableColumnRow: {
        display: 'grid',
        gridTemplateColumns: (paras) => paras.templateColumns
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

    // Join as style
    const templateColumns = styles.join(' ')

    return customStyles({ templateColumns }).tableColumnRow
}

/**
 * Infinite MUI table
 */
export function InfiniteTable({ innerClassName, footerRenderer, headerRenderer, height, hideHeader, itemRenderer, padding, rowHeight, selectable, ...rest }: InfiniteTableProps) {
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

    // Ref to the list
    const ref = React.useRef<InfinitListMethods>(null)

    // Cached column style
    let columnClass: string | null = null

    // Select all handler
    const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(ref.current) {
            ref.current.selectAll(event.target.checked)
        }
    }

    // Table renderer
    const tableItemRenderer = (p: ListItemRendererProps) => {
        if(p.data) {
            // Row classes
            const classNames = [classes.tableRow]

            // Alternative row style
            if(p.index % 2 == 0)
                classNames.push(classes.tableRowOne)

            // Cache column style
            if(columnClass == null && p.layouts)
                columnClass = InfiniteTableGetRowClass(p.layouts, selectable)

            // Rows
            let rows: React.ReactElement
            if(p.data.loading) {
                rows = <TableCell
                    component="div"
                    className={classes.tableCell}
                >
                    <CircularProgress size={20} />
                </TableCell>
            } else if(hasHeader && p.index === 0) {
                classNames.push(classes.tableHeader)
                if(headerRenderer) {
                    rows = headerRenderer(p, classes.tableCell)
                } else if(p.layouts) {
                    classNames.push(columnClass!)

                    rows = <>{selectable && (
                        <TableCell
                            component="div"
                            className={Utils.mergeClasses(classes.tableCell, classes.tableCheckbox)}
                        >
                            <Checkbox
                                onChange={onSelectAll}
                            />
                        </TableCell>
                    )}{p.layouts.map((c) => (
                        <TableCell
                            component="div"
                            key={'head' + c.field}
                            className={classes.tableCell}
                            align={searchLayoutAlign(c.align)}
                        >
                            {c.label || c.field}
                        </TableCell>
                    ))}</>
                } else {
                    rows = <TableCell
                        component="div"
                        className={classes.tableCell}
                    >
                        {p.index}
                    </TableCell>
                }
            } else if(hasFooter && p.end) {
                classNames.push(classes.tableFooter)
                rows = footerRenderer!(p, classes.tableCell)
            } else if(itemRenderer) {
                rows = itemRenderer(p, classes.tableCell)
            } else if(p.layouts) {
                classNames.push(columnClass!)
                rows = <>{selectable && (
                    <TableCell
                        component="div"
                        className={Utils.mergeClasses(classes.tableCell, classes.tableCheckbox)}
                    >
                    <Checkbox
                        checked={p.data.selected}
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
                rows = <TableCell
                    component="div"
                    className={classes.tableCell}
                >
                    {p.index}
                </TableCell>
            }

            return (
                <div style={p.style} className={Utils.mergeClasses(...classNames)}>
                    {rows}
                </div>
            )
        } else {
            return <></>
        }
    }

    return (
        <InfiniteList ref={ref} height={height} innerClassName={Utils.mergeClasses(classes.table, innerClassName)} itemRenderer={tableItemRenderer} hasFooter={hasFooter} hasHeader={hasHeader} itemSize={rowHeight} padding={paddingPX} {...rest}/>
    )
}