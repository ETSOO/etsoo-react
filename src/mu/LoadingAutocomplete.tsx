import React from 'react';
import {
    AutocompleteCloseReason,
    AutocompleteRenderInputParams
} from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';
import { DomUtils, StorageUtils } from '@etsoo/shared';
import {
    ExtendedAutocompleteProps,
    ExtendedAutocomplete
} from './ExtendedAutocomplete';

/**
 * Loading Autocomplete data cache policy
 * Default is Session
 */
export enum LoadingAutocompleteCache {
    /**
     * Session storage
     */
    Session,

    /**
     * Local storage
     */
    Local,

    /**
     * No cache
     */
    No
}

/**
 * Properties
 */
export type LoadingAutocompleteProps<T> = Omit<
    ExtendedAutocompleteProps<T>,
    'loading' | 'options' | 'renderInput'
> & {
    /**
     * Load options callback
     */
    loadOptions(): Promise<T[] | undefined>;

    /**
     * Cache policy
     */
    cache?: LoadingAutocompleteCache;
};

/**
 * Loading Autocomplete
 * @param props Properties
 */
export function LoadingAutocomplete<T>(props: LoadingAutocompleteProps<T>) {
    // Destruct
    const { cache, loadOptions, onClose, onOpen, ...rest } = props;

    // Open state
    const [open, setOpen] = React.useState(false);

    // Options
    const [options, setOptions] = React.useState<T[]>([]);

    // Loading status
    const loading = open && options.length === 0;

    // Onopen callback
    const onOpenLocal = (event: React.ChangeEvent<{}>) => {
        setOpen(true);
        if (onOpen) onOpen(event);
    };

    // Onclose callback
    const onCloseLocal = (
        event: React.ChangeEvent<{}>,
        reason: AutocompleteCloseReason
    ) => {
        setOpen(false);
        if (onClose) onClose(event, reason);
    };

    // renderInput
    const renderInput = (params: AutocompleteRenderInputParams): void => {
        // eslint-disable-next-line no-param-reassign
        params.InputProps.endAdornment = (
            <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
            </React.Fragment>
        );
    };

    // Onload
    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        // Cache key
        const cacheKey = DomUtils.getLocationKey(
            `loadingautocomplete${props.id || props.name || ''}`
        );

        // Cache data
        let cacheData: T[] | undefined;
        if (cache == null || cache === LoadingAutocompleteCache.Session)
            cacheData = StorageUtils.getSessionDataTyped<T[]>(cacheKey);
        else if (cache === LoadingAutocompleteCache.Local)
            cacheData = StorageUtils.getLocalDataTyped<T[]>(cacheKey);

        if (cacheData == null) {
            (async () => {
                // Load options
                const items = await loadOptions();

                // Undefined means failure
                if (items == null) return;

                // Cache the result
                if (cache == null || cache === LoadingAutocompleteCache.Session)
                    StorageUtils.cacheSessionData(cacheKey, items);
                else if (cache === LoadingAutocompleteCache.Local)
                    StorageUtils.cacheLocalData(cacheKey, items);

                // If the component is still active, update
                if (active) setOptions(items);
            })();
        } else {
            setOptions(cacheData);
        }

        return () => {
            active = false;
        };
    }, [loading]);

    // Return
    return (
        <ExtendedAutocomplete<T>
            loading={loading}
            onClose={onCloseLocal}
            onOpen={onOpenLocal}
            open={open}
            options={options}
            renderInput={renderInput}
            {...rest}
        />
    );
}
