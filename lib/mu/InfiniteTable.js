import React from 'react';
import { makeStyles, CircularProgress, TableCell, useTheme, Checkbox, TableSortLabel } from '@material-ui/core';
import { InfiniteList } from '../apps/InfiniteList';
import { searchLayoutAlign } from '../views/ISearchResult';
import { Utils } from '../api/Utils';
// Table styles
const useStyles = makeStyles(() => ({
    table: {},
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
        // Because the rows are dynamically generated
        // will blink when use &:nth-of-type(odd) with tableRow
        backgroundColor: '#f3f3f3'
    }
}));
/**
 * Get table row class
 * @param columns Columns
 */
export function InfiniteTableGetRowClass(columns, selectable) {
    // Css template columns
    const styles = columns.map(c => {
        if (c.width) {
            return `${c.width}px`;
        }
        if (c.widthmin && c.widthmax) {
            return `minmax(${c.widthmin}px, ${c.widthmax}px)`;
        }
        if (c.widthmin) {
            return `minmax(${c.widthmin}px, max-content)`;
        }
        if (c.widthmax) {
            return `minmax(min-content, ${c.widthmax}px)`;
        }
        return 'auto';
    });
    // When selectable, add a column
    if (selectable) {
        styles.unshift('min-content');
    }
    return {
        display: 'grid',
        gridTemplateColumns: styles.join(' ')
    };
}
/**
 * Infinite MUI table
 */
export const InfiniteTable = React.forwardRef((props, ref) => {
    // Destruct
    const { innerClassName, footerRenderer, headerRenderer, height, hideHeader, itemRenderer, onItemClick, orderIndex, padding, rowHeight, selectable, sortable, ...rest } = props;
    // Avoid unnecessary load
    if (height == null || height < 1) {
        return React.createElement(React.Fragment, null);
    }
    // Calculate padding from Material space unit to px
    const paddingPX = padding ? useTheme().spacing(padding) : undefined;
    // Has header
    const hasHeader = hideHeader == null ? true : !hideHeader;
    // Has footer
    const hasFooter = footerRenderer != null;
    // Style
    const classes = useStyles();
    // Cached order index
    const cacheOrderIndexKey = Utils.getLocationKey('orderIndex');
    const cachedOrderIndex = Utils.cacheSessionDataParse(cacheOrderIndexKey);
    // Local order index
    const [localOrderIndex, updateLocalOrderIndex] = React.useState(cachedOrderIndex === undefined || Number.isNaN(cachedOrderIndex)
        ? orderIndex : cachedOrderIndex);
    // Ref to the list
    const listRef = React.useRef(null);
    // Cached column style
    let columnClass;
    // Select all handler
    // event: React.ChangeEvent<HTMLInputElement>
    const onSelectAll = () => {
    };
    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        ...listRef.current
    }));
    // Select item handler
    const onSelectItem = (event) => {
        console.log(event.target.checked);
    };
    // Item click handler
    const itemClickHandler = onItemClick ? (event) => {
        // Avoid input & button click
        if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement) {
            return;
        }
        // Index
        const index = Utils.parseNumber(event.currentTarget.dataset.index);
        // Index item
        const item = listRef.current ? listRef.current.getItem(index) : undefined;
        // Item click callback
        onItemClick(event, item);
    } : undefined;
    // Field sort
    // event: React.MouseEvent<any>
    const createSortHandler = (field, type, index) => () => {
        var _a;
        // Calucate real order index
        let cIndex;
        if (localOrderIndex == null
            || index !== Math.abs(localOrderIndex)
            || index === -localOrderIndex) {
            cIndex = index;
        }
        else {
            cIndex = -index;
        }
        // Sort data and cache
        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.sort(field, type, cIndex);
        // Cache order index
        Utils.cacheSessionString(cIndex.toString(), cacheOrderIndexKey);
        // Rerenderer
        updateLocalOrderIndex(cIndex);
    };
    // Create field sort
    const createSort = (index) => {
        // Is the sort field active
        const active = localOrderIndex != null && index === Math.abs(localOrderIndex);
        // Direction
        let direction;
        if (localOrderIndex) {
            direction = active && localOrderIndex < 0 ? 'desc' : 'asc';
        }
        return {
            active,
            direction
        };
    };
    // Table renderer
    const tableItemRenderer = (p) => {
        if (p.data) {
            // Row classes
            const classNames = [classes.tableRow];
            // Rows
            let rows;
            if (p.data.loading) {
                rows = (React.createElement(TableCell, { component: "div", className: classes.tableCell },
                    React.createElement(CircularProgress, { size: 20 })));
            }
            else {
                // Alternative row style
                if (p.index % 2 === 0) {
                    classNames.push(classes.tableRowOne);
                }
                // Cache column style
                if (columnClass == null && p.layouts) {
                    columnClass = InfiniteTableGetRowClass(p.layouts, selectable);
                }
                // Rows
                if (hasHeader && p.index === 0) {
                    classNames.push(classes.tableHeader);
                    if (headerRenderer) {
                        rows = headerRenderer(p, classes.tableCell, classNames);
                    }
                    else if (p.layouts) {
                        Object.assign(p.style, columnClass);
                        rows = (React.createElement(React.Fragment, null,
                            selectable && (React.createElement(TableCell, { component: "div", className: Utils.mergeClasses(classes.tableCell, classes.tableCheckbox) },
                                React.createElement(Checkbox, { onChange: onSelectAll }))),
                            p.layouts.map((c) => (React.createElement(TableCell, { component: "div", key: `head${c.field}`, className: classes.tableCell, align: searchLayoutAlign(c.align) }, sortable && c.sort != null ? (React.createElement(TableSortLabel, Object.assign({}, createSort(c.sort), { className: classes.tableRowClick, onClick: createSortHandler(c.field, c.type, c.sort) }), c.label || c.field)) : (React.createElement(React.Fragment, null, c.label || c.field)))))));
                    }
                    else {
                        rows = (React.createElement(TableCell, { component: "div", className: classes.tableCell },
                            React.createElement(CircularProgress, { size: 20 })));
                    }
                }
                else if (hasFooter && p.end) {
                    classNames.push(classes.tableFooter);
                    rows = footerRenderer(p, classes.tableCell, classNames);
                }
                else if (itemRenderer) {
                    rows = itemRenderer(p, classes.tableCell, classNames);
                }
                else if (p.layouts) {
                    // Support item click
                    if (onItemClick) {
                        classNames.push(classes.tableRowClick);
                    }
                    Object.assign(p.style, columnClass);
                    rows = (React.createElement(React.Fragment, null,
                        selectable && (React.createElement(TableCell, { component: "div", className: Utils.mergeClasses(classes.tableCell, classes.tableCheckbox) },
                            React.createElement(Checkbox, { inputProps: {
                                    'data-selectable': p.index
                                }, checked: p.data.selected, onChange: onSelectItem }))),
                        p.layouts.map((c) => (React.createElement(TableCell, { component: "div", key: c.field, className: classes.tableCell, align: searchLayoutAlign(c.align) }, p.data[c.field])))));
                }
                else {
                    rows = (React.createElement(TableCell, { component: "div", className: classes.tableCell }));
                }
            }
            return (React.createElement("div", { style: p.style, className: Utils.mergeClasses(...classNames), "data-index": p.index, role: "button", onClick: itemClickHandler, "aria-hidden": "true" }, rows));
        }
        // Blank
        return (React.createElement(React.Fragment, null));
    };
    return (React.createElement(InfiniteList, Object.assign({ ref: listRef, height: height, innerClassName: Utils.mergeClasses(classes.table, innerClassName), itemRenderer: tableItemRenderer, hasFooter: hasFooter, hasHeader: hasHeader, itemSize: rowHeight, orderIndex: localOrderIndex, padding: paddingPX }, rest)));
});
