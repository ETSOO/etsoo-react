import React from 'react';
import { ReactSVG } from 'react-svg';
import { makeStyles, Typography } from '@material-ui/core';
import { CountryListItem } from '../controllers/ExtendAddress';
import {
    VirtualizedAutocompleteProps,
    VirtualizedAutocomplete
} from './VirtualizedAutocomplete';
import { HBox } from './HBox';
import { LoadingAutocompleteCache } from './LoadingAutocomplete';

/**
 * Country list properties
 * property 'options' is not necessary
 * property 'ref' is incorrect here confused by the Autocomplete's ref
 */
export type CountryListProps = Omit<
    VirtualizedAutocompleteProps<CountryListItem>,
    'getOptionLabel' | 'ref'
>;

const useStyles = makeStyles({
    icon: {
        width: '30px',
        height: '20px'
    }
});

// Display label
const getOptionLabel = (option: CountryListItem) =>
    option.shortName || option.name;

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
    // Style classes
    const classes = useStyles();

    // Return
    return (
        <VirtualizedAutocomplete<CountryListItem>
            {...props}
            cache={LoadingAutocompleteCache.Local}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            renderOption={(option) => (
                <HBox alignItems="center">
                    <ReactSVG
                        src={`${
                            process.env.PUBLIC_URL
                        }/assets/flags/${option.id.toLowerCase()}.svg`}
                        className={classes.icon}
                        fallback={() => <>{option.id}</>}
                    />
                    <Typography>{getOptionLabel(option)}</Typography>
                </HBox>
            )}
        />
    );
}
