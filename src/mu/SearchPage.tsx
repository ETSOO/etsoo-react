import React from "react"
import { SearchPageFabs, SearchPageFabsMethods } from "./SearchPageFabs"
import { InfiniteTable, InfiniteTableMethods } from "./InfiniteTable"
import { ListItemRendererProps } from "../apps/InfiniteList"
import { Card, CardContent, TableCell, makeStyles, CircularProgress } from "@material-ui/core"
import { LanguageLabel } from "../states/LanguageState"
import { ISearchResult, ISearchItem } from "../views/ISearchResult"
import { Utils } from "../api/Utils"
import { IDynamicData } from "../api/IDynamicData"
import { ApiSettings } from "../api/IApiSettings"
import { IClickAction } from "../api/IClickAction"

/**
 * Search page properties
 */
export interface SearchPageProps {
    /**
     * Style class name
     */
    className?: string

    /**
     * Has footer
     */
    hasFooter?: boolean

    /**
     * Height
     */
    height: number

    /**
     * Item renderer
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    itemRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement

    /**
     * Labels
     */
    labels?: LanguageLabel

    /**
     * Load items callback
     * @param page Current page
     * @param records Records to load
     * @param orderIndex Order field index
     */
    loadItems(page: number, records: number, orderIndex?: number): Promise<ISearchResult<ISearchItem>>

    /**
     * More actions
     */
    moreActions?: IClickAction[]

    /**
     * Add click handler
     */
    onAddClick: React.MouseEventHandler

    /**
     * Item click handler
     * @param event Click event
     * @param item Current item
     */
    onItemClick?(event: React.MouseEvent, item: ISearchItem | undefined): void

    /**
     * Padding (spacing)
     */
    padding: number

    /**
     * Row height
     */
    rowHeight?: number

    /**
     * Search properties
     */
    searchProps: IDynamicData

    /**
     * Sortable
     */
    sortable?: boolean

    /**
     * Try cache
     */
    tryCache?: boolean

    /**
     * Width
     */
    width: number
}

// Styles
const useStyles = makeStyles((theme) => ({
    tableRow: {
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1)
        }
    },
    bold: {
        paddingLeft: theme.spacing(1),
        fontWeight: 'bold'  
    },
    total: {
        display: 'grid',
        gridTemplateColumns: '50% 50%'
    },
    totalCell: {
        fontWeight: 'bold'
    },
    card: {
        height: '100%'
    },
    cardContent: {
        paddingTop: 0
    }
}))

/**
 * Search page
 */
export function SearchPage({ className, hasFooter, height, moreActions, itemRenderer, labels, loadItems, onAddClick, onItemClick, padding, rowHeight, searchProps, sortable, tryCache, width }: SearchPageProps) {
    // Size check
    if(height < 1 || width < 1)
        return <CircularProgress size={20} />

    // Style
    const classes = useStyles()

    // small than medium size
    const md = (width <= 960)

    // Row height
    const localRowHeight = rowHeight == null ? (md ? 224 : 53) : rowHeight

    // Hide header
    const hideHeader = md

    // Clear cache
    let tableCurrent: InfiniteTableMethods | undefined  = undefined

    // Infinite table ref
    const tableRef = (current: InfiniteTableMethods) => {
        tableCurrent = current
    }
    
    // Fabs reference
    const fabsRef = React.useRef<SearchPageFabsMethods>(null)

    // Scroller
    let scroller: HTMLElement | undefined = undefined

    // Scroll change handler
    const onScrollChange = (scrollerDiv: HTMLElement, vertical: boolean, zero: boolean) => {
        scroller = scrollerDiv
        fabsRef.current?.scollChange(!zero)
    }

    // Go top handler
    const onGoTopClick = (event: React.MouseEvent) => {
        if(scroller) {
            scroller.scrollTop = 0
        }
    }

    // Get no match label
    const getNoMatchLabel = () => {
        return labels ? labels['no_match'] : 'No match!'
    }

    // Get total label
    const getTotalLabel = () => {
        return (labels ? labels['total'] : 'Total') + ':'
    }

    // Footer renderer
    const footerRenderer = hasFooter && md ? undefined : (props: ListItemRendererProps, className: string, parentClasses: string[]) => {
        if(md) {
            parentClasses.splice(0)
            parentClasses.push(classes.tableRow)

            if(props.records === 0) {
                return (
                    <Card className={classes.card}>
                        <CardContent>
                            { getNoMatchLabel() }
                        </CardContent>
                    </Card>
                )
            } else {
                return (
                    <Card className={classes.card}>
                        <CardContent className={classes.total + ' ' + classes.totalCell}>
                            <div>{ getTotalLabel() }</div>
                            <div style={{textAlign: 'right'}}>{props.records}</div>
                        </CardContent>
                    </Card>
                )
            }
        } else {
            if(props.records === 0) {
                return (
                    <TableCell
                        component="div"
                        className={className}
                        style={{textAlign: 'center'}}
                    >
                        { getNoMatchLabel() }
                    </TableCell>
                )
            } else {
                parentClasses.push(classes.total)
                className += ' ' + classes.totalCell
                return (
                    <>
                        <TableCell
                            component="div"
                            className={className}
                        >
                            { getTotalLabel() }
                        </TableCell>
                        <TableCell
                            component="div"
                            className={className}
                            style={{textAlign: 'right'}}
                        >
                            {props.records}
                        </TableCell>
                    </>
                )
            }
        }
    }

    // Search seed
    let searchSeed: number

    // Search data
    const searchData = () => {
        if(searchSeed > 0)
            window.clearTimeout(searchSeed)

        // Avoid unnecessary API calls
        searchSeed = window.setTimeout(() => {
            // Cache the keywords
            Utils.cacheSessionString(searchProps['sc'], Utils.getLocationKey('keyword'))

            // Reset and search
            tableCurrent?.reset()
        }, 360)
    }

    React.useEffect(() => {
        // Search bar input component
        const input = ApiSettings.get().searchInput

        // Search bar input event handler
        const onInput = (event: Event) => {
            searchProps['sc'] = input?.value
            searchData()
        }

        if(input) {
            // Get the cached keywords
            input.value = Utils.cacheSessionDataGet(Utils.getLocationKey('keyword')) || ''

            // Add the event handler
            input.addEventListener('input', onInput)
        }

        return () => {
            if(searchSeed > 0)
                window.clearTimeout(searchSeed)

            if(input) {
                // Remove the event handler
                input.removeEventListener('input', onInput)
            }

            tableCurrent?.clearCache()
        }
    }, [])

    return (
        <>
            <InfiniteTable className={className} ref={tableRef} rowHeight={localRowHeight} height={height} onItemClick={onItemClick} onScrollChange={onScrollChange} padding={padding} hideHeader={hideHeader} sortable={sortable} loadItems={loadItems} footerRenderer={footerRenderer} itemRenderer={itemRenderer} tryCache={tryCache}/>
            <SearchPageFabs moreActions={moreActions} onAddClick={onAddClick} onGoTopClick={onGoTopClick} ref={fabsRef} />
        </>
    )
}