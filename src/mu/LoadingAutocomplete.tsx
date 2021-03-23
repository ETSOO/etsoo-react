import React from 'react';
import {
    AutocompleteCloseReason,
    AutocompleteRenderInputParams,
    AutocompleteInputChangeReason
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
     * Cache policy
     */
    cache?: LoadingAutocompleteCache;

    /**
     * Cache key
     */
    cacheKey?: string;

    /**
     * Load options callback
     */
    loadOptions(): Promise<T[] | undefined>;

    /**
     * Input data load callback
     * @param value Input value
     * @param reason Change reason
     */
    onInputLoad?(value: string): Promise<T[] | undefined>;
};

/**
 * Loading Autocomplete
 * @param props Properties
 */
export function LoadingAutocomplete<T>(props: LoadingAutocompleteProps<T>) {
    // Destruct
    const {
        cache,
        cacheKey = '',
        idValue,
        loadOptions,
        onClose,
        onInputChange,
        onInputLoad,
        onOpen,
        ...rest
    } = props;

    // Open state
    const [open, setOpen] = React.useState(false);

    // Options
    const [options, setOptions] = React.useState<T[] | undefined>();

    // Timeout seed
    const [data] = React.useState<{ seed: number; cacheKey: string }>({
        seed: 0,
        cacheKey: ''
    });

    // Cache key change will reforce to update
    if (cacheKey !== data.cacheKey) {
        setOptions(undefined);
        data.cacheKey = cacheKey;
    }

    // Loading status
    // If id value exists, auto load options
    const loading = (!!idValue || open) && options == null;

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

    // Input field change callback
    const onInputChangeLocal = (
        event: React.ChangeEvent<{}>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        // When set a new item, reason is 'reset'
        if (onInputLoad && reason !== 'reset') {
            if (data.seed > 0) window.clearTimeout(data.seed);
            data.seed = window.setTimeout(
                (inputValue: string) => {
                    onInputLoad(inputValue).then((items) => {
                        // Undefined means failure
                        if (items == null) return;

                        // Update
                        setOptions(items);
                    });
                },
                360,
                value
            );
        }

        // Custom onInputChange callback
        if (onInputChange) onInputChange(event, value, reason);
    };

    // Onload
    React.useEffect(() => {
        if (loading) {
            // Local cache key
            const localCacheKey = DomUtils.getLocationKey(
                `loadingautocomplete:${cacheKey}:${
                    props.id || props.name || ''
                }`
            );

            // Cache data
            let cacheData: T[] | undefined;
            if (cache == null || cache === LoadingAutocompleteCache.Session)
                cacheData = StorageUtils.getSessionDataAs<T[]>(
                    localCacheKey
                );
            else if (cache === LoadingAutocompleteCache.Local)
                cacheData = StorageUtils.getLocalDataAs<T[]>(localCacheKey);

            if (cacheData == null) {
                (async () => {
                    // Load options
                    const items = await loadOptions();

                    // Undefined means failure
                    if (items == null) return;

                    // Cache the result
                    if (
                        cache == null ||
                        cache === LoadingAutocompleteCache.Session
                    )
                        StorageUtils.cacheSessionData(localCacheKey, items);
                    else if (cache === LoadingAutocompleteCache.Local)
                        StorageUtils.cacheLocalData(localCacheKey, items);

                    // Update
                    setOptions(items);
                })();
            } else {
                setOptions(cacheData);
            }
        }

        return () => {
            if (data.seed > 0) window.clearTimeout(data.seed);
        };
    }, [loading]);

    // Return
    return (
        <ExtendedAutocomplete<T>
            loading={loading}
            idValue={idValue}
            onClose={onCloseLocal}
            onInputChange={onInputChangeLocal}
            onOpen={onOpenLocal}
            open={open}
            options={options || []}
            renderInput={renderInput}
            {...rest}
        />
    );
}
