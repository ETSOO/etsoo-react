import React from "react";
import { SearchPageFabs } from "./SearchPageFabs";
import { InfiniteTable } from "./InfiniteTable";
import { Card, CardContent, TableCell, makeStyles, CircularProgress } from "@material-ui/core";
import { Utils } from "../api/Utils";
import { ApiSettings } from "../api/IApiSettings";
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
}));
/**
 * Search page
 */
export function SearchPage({ className, hasFooter, height, moreActions, itemRenderer, labels, loadItems, onAddClick, onItemClick, padding, rowHeight, searchProps, sortable, tryCache, width }) {
    // Size check
    if (height < 1 || width < 1)
        return React.createElement(CircularProgress, { size: 20 });
    // Style
    const classes = useStyles();
    // small than medium size
    const md = (width <= 960);
    // Row height
    const localRowHeight = rowHeight == null ? (md ? 224 : 53) : rowHeight;
    // Hide header
    const hideHeader = md;
    // Clear cache
    let tableCurrent = undefined;
    // Infinite table ref
    const tableRef = (current) => {
        tableCurrent = current;
    };
    // Fabs reference
    const fabsRef = React.useRef(null);
    // Scroller
    let scroller = undefined;
    // Scroll change handler
    const onScrollChange = (scrollerDiv, vertical, zero) => {
        var _a;
        scroller = scrollerDiv;
        (_a = fabsRef.current) === null || _a === void 0 ? void 0 : _a.scollChange(!zero);
    };
    // Go top handler
    const onGoTopClick = (event) => {
        if (scroller) {
            scroller.scrollTop = 0;
        }
    };
    // Get no match label
    const getNoMatchLabel = () => {
        return labels ? labels['no_match'] : 'No match!';
    };
    // Get total label
    const getTotalLabel = () => {
        return (labels ? labels['total'] : 'Total') + ':';
    };
    // Footer renderer
    const footerRenderer = (hasFooter !== false && !md) ? (props, className, parentClasses) => {
        if (md) {
            parentClasses.splice(0);
            parentClasses.push(classes.tableRow);
            if (props.records === 0) {
                return (React.createElement(Card, { className: classes.card },
                    React.createElement(CardContent, null, getNoMatchLabel())));
            }
            else {
                return (React.createElement(Card, { className: classes.card },
                    React.createElement(CardContent, { className: classes.total + ' ' + classes.totalCell },
                        React.createElement("div", null, getTotalLabel()),
                        React.createElement("div", { style: { textAlign: 'right' } }, props.records))));
            }
        }
        else {
            if (props.records === 0) {
                return (React.createElement(TableCell, { component: "div", className: className, style: { textAlign: 'center' } }, getNoMatchLabel()));
            }
            else {
                parentClasses.push(classes.total);
                className += ' ' + classes.totalCell;
                return (React.createElement(React.Fragment, null,
                    React.createElement(TableCell, { component: "div", className: className }, getTotalLabel()),
                    React.createElement(TableCell, { component: "div", className: className, style: { textAlign: 'right' } }, props.records)));
            }
        }
    } : undefined;
    // Search seed
    let searchSeed;
    // Search data
    const searchData = () => {
        if (searchSeed > 0)
            window.clearTimeout(searchSeed);
        // Avoid unnecessary API calls
        searchSeed = window.setTimeout(() => {
            // Cache the keywords
            Utils.cacheSessionString(searchProps['sc'], Utils.getLocationKey('keyword'));
            // Reset and search
            tableCurrent === null || tableCurrent === void 0 ? void 0 : tableCurrent.reset();
        }, 360);
    };
    React.useEffect(() => {
        // Search bar input component
        const input = ApiSettings.get().searchInput;
        // Search bar input event handler
        const onInput = (event) => {
            searchProps['sc'] = input === null || input === void 0 ? void 0 : input.value;
            searchData();
        };
        if (input) {
            // Get the cached keywords
            input.value = tryCache ? (Utils.cacheSessionDataGet(Utils.getLocationKey('keyword')) || '') : '';
            // Add the event handler
            input.addEventListener('input', onInput);
        }
        return () => {
            if (searchSeed > 0)
                window.clearTimeout(searchSeed);
            if (input) {
                // Remove the event handler
                input.removeEventListener('input', onInput);
            }
            tableCurrent === null || tableCurrent === void 0 ? void 0 : tableCurrent.clearCache();
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(InfiniteTable, { className: className, ref: tableRef, rowHeight: localRowHeight, height: height, onItemClick: onItemClick, onScrollChange: onScrollChange, padding: padding, hideHeader: hideHeader, sortable: sortable, loadItems: loadItems, footerRenderer: footerRenderer, itemRenderer: itemRenderer, tryCache: tryCache }),
        React.createElement(SearchPageFabs, { moreActions: moreActions, onAddClick: onAddClick, onGoTopClick: onGoTopClick, ref: fabsRef })));
}
