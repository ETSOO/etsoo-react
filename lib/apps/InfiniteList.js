import React from 'react';
import { Utils } from '../api/Utils';
import { InfiniteListBase } from './InfiniteListBase';
/**
 * Infinite list state
 */
class InfiniteListState {
    /**
     * Constrcutor
     */
    constructor() {
        this.items = [];
        this.loading = false;
        this.loaded = false;
        this.page = 0;
    }
}
/**
 * Calculate list key
 * @param index Current index
 * @param data Current data
 * @param key Key field
 */
function InfiniteListKey(index, data, key) {
    if (data == null || data[key] == null)
        return 'SYS' + index;
    return data[key];
}
// Format items
const formatItems = (items, hasHeader, hasFooter = undefined) => {
    var _a;
    // Header
    if (hasHeader) {
        // Insert header item
        if (items.length == 0 || ((_a = items[0]) === null || _a === void 0 ? void 0 : _a.viewFlag) !== -1)
            items.unshift({ loading: false, viewFlag: -1 });
    }
    else if (items.length > 0) {
        // No header, remove the first header item
        if (items[0].viewFlag === -1)
            items.shift();
    }
    if (hasFooter) {
        // No push action here to avoid calculation of total records failed
    }
    else if (items.length > 0) {
        if (items[items.length - 1].viewFlag === -2)
            items.pop();
    }
};
/**
 * Infinite list component
 * @param pros Properties
 */
export const InfiniteList = React.forwardRef((props, ref) => {
    // Avoid unnecessary load
    if ((props.height == null || props.height == 0) && props.records == null)
        return React.createElement(React.Fragment, null);
    // Default records calcuated with height
    const records = Math.ceil(props.records || (1.5 * props.height / props.itemSize));
    // Default calcuated height
    const height = (props.height || records * props.itemSize);
    // Default 100% width
    const width = props.width || '100%';
    // Layout
    const layout = props.horizontal ? 'horizontal' : 'vertical';
    // Item key
    const itemKey = (index, data) => {
        return InfiniteListKey(index, data, props.itemKey || 'id');
    };
    // Loader reference
    const loaderRef = React.useRef(null);
    // Dom reference
    const domRef = React.useRef(null);
    // Unique key for cache
    const uniqueKey = 'infinitelist' + (props.id || props.name || '');
    // State without update
    let defaultState = props.tryCache ? Utils.cacheSessionDataParse(Utils.getLocationKey(uniqueKey)) : undefined;
    if (!defaultState)
        defaultState = new InfiniteListState();
    const [state] = React.useState(defaultState);
    // Header
    formatItems(state.items, props.hasHeader, props.hasFooter);
    // Item count with update, start with 1 for lazy loading later
    const [itemCount, updateItemCount] = React.useState(state.items.length + (state.loaded ? 0 : 1));
    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        clearCache() {
            var _a;
            (_a = loaderRef.current) === null || _a === void 0 ? void 0 : _a.resetloadMoreItemsCache(false);
        },
        getItem(index) {
            if (index < state.items.length)
                return state.items[index];
            return undefined;
        },
        reset() {
            var _a, _b;
            // Reset state
            // Hold layouts, data and records
            state.items = [];
            state.loading = false;
            state.loaded = false;
            state.page = 0;
            state.scrollLast = undefined;
            state.scrollLeft = undefined;
            state.scrollTop = undefined;
            // Format items
            formatItems(state.items, props.hasHeader);
            // Reset session storage cache
            Utils.cacheSessionData(state, Utils.getLocationKey(uniqueKey));
            // Restore the scroll bar
            const scrollBar = (_a = domRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (scrollBar) {
                scrollBar.scrollTo({ left: 0, top: 0 });
            }
            // Clear the cached items
            (_b = loaderRef.current) === null || _b === void 0 ? void 0 : _b.resetloadMoreItemsCache(true);
        },
        selectAll(selected) {
            if (domRef.current) {
                const cbItems = domRef.current.querySelectorAll('input[type="checkbox"][data-selectable]');
                cbItems.forEach(cb => {
                    if (cb.checked !== selected)
                        cb.click();
                });
            }
        },
        selectItem(index) {
            if (index < state.items.length)
                return state.items[index];
            return undefined;
        },
        sort(field, type, index) {
            // Two cases
            if (state.loaded) {
                // First all data is loaded
                Utils.sortItems(state.items, field, type, index > 0);
                // Cache
                Utils.cacheSessionData(state, Utils.getLocationKey(uniqueKey));
            }
            else {
                // Loaded from database
                this.reset();
            }
        }
    }));
    // On scroll handler
    const onScroll = (props.onScroll || props.onScrollChange) ? (p) => {
        if (domRef.current == null)
            return;
        if (props.onScrollChange) {
            if (p.scrollOffset === 0 && state.scrollTop !== 0) {
                state.scrollTop = 0;
                props.onScrollChange(domRef.current.parentElement, true, true);
            }
            else if (state.scrollTop == null || state.scrollTop === 0) {
                state.scrollTop = p.scrollOffset;
                props.onScrollChange(domRef.current.parentElement, true, false);
            }
        }
        else {
            const sp = { vertical: true, direction: p.scrollDirection, offset: p.scrollOffset, scroller: domRef.current.parentElement };
            props.onScroll(sp);
        }
    } : undefined;
    // Is current item loaded
    const isItemLoaded = (index) => {
        return state.loaded || index < state.items.length;
    };
    // Load more items callback
    const loadMoreItems = (startIndex, stopIndex) => {
        var _a;
        // Check
        if (state.loaded || state.loading)
            return null;
        // Update loading status
        state.loading = true;
        // Current items
        const items = state.items;
        // Insert a loading item
        // Make sure the current item is not a loading item
        if (items.length == 0 || !((_a = items[items.length - 1]) === null || _a === void 0 ? void 0 : _a.loading))
            items.push({ loading: true, viewFlag: -1 });
        // Update item count
        //updateItemCount(items.length + 1)
        return new Promise(resolve => {
            // Read next page
            const page = state.page + 1;
            // Update rightnow to avoid delay below
            state.page = page;
            props.loadItems(page, records, props.orderIndex).then((results) => {
                // Remove the loading item
                items.pop();
                // Start index
                if (page == 1) {
                    // Update other data
                    if (results.data)
                        state.data = results.data;
                    if (results.layouts)
                        state.layouts = results.layouts;
                    if (results.records != null)
                        state.records = results.records;
                }
                // Loaded items
                const loadedItems = results.items || [];
                const loadedLen = loadedItems.length;
                // Is the end
                const loaded = loadedLen < records;
                state.loaded = loaded;
                state.loading = false;
                // Insert items
                if (loadedLen > 0)
                    items.push(...loadedItems);
                // Add footer
                if (loaded) {
                    // Update total records
                    state.records = items.length - (props.hasHeader ? 1 : 0);
                    if (props.hasFooter)
                        items.push({ loading: false, viewFlag: -2 });
                }
                // Update item count
                updateItemCount(items.length + (loaded ? 0 : 1));
                // Resolve to complete
                resolve();
            });
        });
    };
    // Render an item or a loading indicator
    const itemRenderer = (lp) => {
        // Implement padding
        const style = lp.style;
        let customStyle = {};
        if (props.padding != null && props.padding != 0) {
            customStyle = {
                left: `${props.padding + Utils.parseNumber(style.left)}px`,
                top: `${props.padding + Utils.parseNumber(style.top)}px`,
                width: `calc(100% - ${2 * props.padding}px)`
            };
        }
        // Current data
        const data = state.items[lp.index];
        // Renderer properties
        const newProps = {
            data: data,
            end: (lp.index + 1 === state.items.length),
            index: lp.index,
            isScrolling: lp.isScrolling,
            layouts: state.layouts,
            other: state.data,
            records: state.records,
            style: {
                ...style,
                ...customStyle
            }
        };
        // Call renderer callback
        return props.itemRenderer(newProps);
    };
    // Inner element callback
    const innerElementType = ({ style, ...rest }) => {
        if (props.padding) {
            style.height = Utils.parseNumber(style.height) + 2 * props.padding;
        }
        return (React.createElement("div", Object.assign({ ref: domRef, className: props.innerClassName, style: style }, rest)));
    };
    // Outer element callback
    // outerElementType, set padding will cause the browser to reset when items loaded
    // Changed to adding padding to height
    React.useEffect(() => {
        var _a;
        // Scroll container element
        const scrollContainer = (_a = domRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (scrollContainer && state.scrollLast) {
            scrollContainer.scrollTo({
                left: state.scrollLast[0] || 0,
                top: state.scrollLast[1] || 0,
                behavior: 'smooth'
            });
        }
        // Cache url
        const url = window.location.href;
        return () => {
            if (scrollContainer) {
                // Update scroll offset
                state.scrollLast = [scrollContainer.scrollLeft, scrollContainer.scrollTop];
                // Cache data, window.location.href here is the navigated URL, use the cached url
                Utils.cacheSessionData(state, url + ':' + uniqueKey);
            }
        };
    }, [domRef.current]);
    // Return component
    return (React.createElement(InfiniteListBase, { className: props.className, height: height, innerElementType: innerElementType, isItemLoaded: isItemLoaded, itemCount: itemCount, itemKey: itemKey, itemRenderer: itemRenderer, itemSize: props.itemSize, layout: layout, loadMoreItems: loadMoreItems, minimumBatchSize: records, onScroll: onScroll, ref: loaderRef, threshold: props.threshold, width: width }));
});
