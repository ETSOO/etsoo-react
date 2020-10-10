import React from 'react';
import { DataTypes } from '@etsoo/shared';
import {
    LoadingAutocompleteProps,
    LoadingAutocomplete,
    LoadingAutocompleteCache
} from './LoadingAutocomplete';
import { IListItem } from '../views/IListItem';

/**
 * Properties
 */
export type TiplistProps<T extends IListItem> = Omit<
    LoadingAutocompleteProps<T>,
    'loadOptions' | 'onInputLoad'
> & {
    onLoadData(
        idValue?: DataTypes.IdType,
        sc?: string
    ): Promise<T[] | undefined>;
};

/**
 * Tiplist Autocomplete
 * @param props Properties
 */
export function Tiplist<T extends IListItem = IListItem>(
    props: TiplistProps<T>
) {
    // Dustruct
    const { getOptionLabel, onLoadData, ...rest } = props;

    // Display label
    const getOptionLabelLocal =
        getOptionLabel || ((option: T) => option.label || '');

    // Load options
    const loadOptions = () => onLoadData(props.idValue);

    // Input change load data
    const onInputLoad = (value: string) => onLoadData(undefined, value);

    // Return
    return (
        <LoadingAutocomplete<T>
            cache={LoadingAutocompleteCache.No}
            getOptionLabel={getOptionLabelLocal}
            filterOptions={(x) => x} // disable the built-in filter for refreshing options
            loadOptions={loadOptions}
            onInputLoad={onInputLoad}
            {...rest}
        />
    );
}
