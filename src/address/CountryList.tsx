import React from 'react';
import { ReactSVG } from 'react-svg';
import { Typography } from '@material-ui/core';
import { CountryListItem } from '../controllers/ExtendAddress';
import {
    VirtualizedAutocompleteProps,
    VirtualizedAutocomplete
} from '../mu/VirtualizedAutocomplete';
import { HBox } from '../mu/HBox';
import { LoadingAutocompleteCache } from '../mu/LoadingAutocomplete';

/**
 * Country list properties
 * property 'ref' is incorrect here confused by the Autocomplete's ref
 */
export type CountryListProps = Omit<
    VirtualizedAutocompleteProps<CountryListItem>,
    'getOptionLabel' | 'ref'
>;

// Display label
const getOptionLabel = (option: CountryListItem) =>
    option.shortName || option.name || '';

// Filter options
const filterOptions = (
    options: CountryListItem[],
    { inputValue }: { inputValue: string }
) => {
    return options.filter(
        (option) =>
            option.id === inputValue.toUpperCase() ||
            option.code === inputValue ||
            (option.shortName &&
                new RegExp(`^${inputValue}`, 'gi').test(option.shortName)) ||
            new RegExp(`^${inputValue}`, 'gi').test(option.name)
    );
};

/**
 * Country list
 */
export function CountryList(props: CountryListProps) {
    // Return
    return (
        <VirtualizedAutocomplete<CountryListItem>
            {...props}
            cache={LoadingAutocompleteCache.Local}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            renderOption={(option) => (
                <HBox>
                    <ReactSVG
                        src={`${
                            process.env.PUBLIC_URL
                        }/assets/flags/${option.id.toLowerCase()}.svg`}
                        beforeInjection={(svg) => {
                            svg.setAttribute(
                                'style',
                                'width: 30px; height: 20px;'
                            );
                        }}
                        fallback={() => <>{option.id}</>}
                    />
                    <Typography>{getOptionLabel(option)}</Typography>
                </HBox>
            )}
        />
    );
}
