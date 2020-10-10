import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useMediaQuery, useTheme } from '@material-ui/core';
import {
    LoadingAutocompleteProps,
    LoadingAutocomplete
} from './LoadingAutocomplete';

type ListboxComponentExtendedProps = {
    /**
     * Item height (itemSize)
     */
    itemHeight?: number;

    /**
     * Max items to display
     */
    maxItems?: number;
};

// Listbox component properties
interface ListboxComponentProps
    extends React.HTMLAttributes<HTMLElement>,
        ListboxComponentExtendedProps {}

/**
 * Properties
 */
export type VirtualizedAutocompleteProps<T> = Omit<
    LoadingAutocompleteProps<T>,
    | 'disableListWrap' // Set to true
    | 'ListboxComponent' // Set to FixedSizeList react-window
> &
    ListboxComponentExtendedProps;

// Adapter for react-window
const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    ListboxComponentProps
>((props, ref) => {
    // Destruct
    const { children, itemHeight, maxItems = 8, ...rest } = props;

    // List items
    const itemData = React.Children.toArray(children);
    const itemCount = itemData.length;

    // Calculate item size
    // No set then calculate on them breakpoints
    let itemSize = itemHeight;
    if (itemSize == null || itemSize < 1) {
        const theme = useTheme();
        const smUp = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
        itemSize = smUp ? 36 : 48;
    }

    // Calcuate list height
    const height = itemSize * (itemCount < maxItems ? itemCount : maxItems);

    function renderRow(childProps: ListChildComponentProps) {
        const { data, index, style } = childProps;
        return React.cloneElement(data[index], { style });
    }

    return (
        <div ref={ref} {...rest}>
            <FixedSizeList
                height={height}
                itemData={itemData}
                itemCount={itemCount}
                itemSize={itemSize}
                width="100%"
                overscanCount={maxItems}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
});
ListboxComponent.displayName = 'ListboxComponent';

/**
 * Virtualized Autocomplete
 * @param props Properties
 */
export function VirtualizedAutocomplete<T>(
    props: VirtualizedAutocompleteProps<T>
) {
    // Dustruct
    const { itemHeight, maxItems, ...rest } = props;

    // Listbox properties
    const listBoxProps: ListboxComponentProps = {
        itemHeight,
        maxItems
    };

    // Return
    return (
        <LoadingAutocomplete<T>
            disableListWrap
            ListboxComponent={ListboxComponent}
            ListboxProps={listBoxProps}
            {...rest}
        />
    );
}
