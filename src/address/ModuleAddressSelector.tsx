import React from 'react';
import {
    Grid,
    TextField,
    InputLabelProps,
    GridSpacing
} from '@material-ui/core';
import { MaskedInput } from '../mu/MaskedInput';
import { ModuleCountryList } from './ModuleCountryList';
import { ApiModule } from '../api/IApiEntity';
import { ModuleRegionList } from './ModuleRegionList';
import { FormCustomChangeEvent } from '../uses/FormCustomChangeEvent';
import { ModuleCityList } from './ModuleCityList';
import { ModuleDistrictList } from './ModuleDistrictList';

/**
 * Module address selector properties
 */
export interface ModuleAddressSelectorProps {
    /**
     * Address label
     */
    addressLabel?: string;

    /**
     * City
     */
    city?: string;

    /**
     * City label
     */
    cityLabel?: string;

    /**
     * Country
     */
    country?: string;

    /**
     * Country label
     */
    countryLabel?: string;

    /**
     * District
     */
    district?: string;

    /**
     * District label
     */
    districtLabel?: string;

    /**
     * Input label properties
     */
    InputLabelProps?: Partial<InputLabelProps>;

    /**
     * Module name
     */
    module: ApiModule;

    /**
     * Name part to seperate same component
     */
    namePart?: string;

    /**
     * Limited organization id
     */
    organizationId?: number;

    /**
     * Postcode value
     */
    postcode?: string;

    /**
     * Postcode label
     */
    postcodeLabel?: string;

    /**
     * Postcode mask
     */
    postcodeMask?: string;

    /**
     * Region
     */
    region?: string;

    /**
     * Region label
     */
    regionLabel?: string;

    /**
     * Container sm width, default = 12
     */
    sm?:
        | boolean
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 'auto'
        | 11
        | 12
        | undefined;

    /**
     * Dropdown fields sm width, default = 6
     */
    smField?:
        | boolean
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 'auto'
        | 11
        | 12
        | undefined;

    /**
     * Item spacing, default 1
     */
    spacing?: GridSpacing;

    /**
     * Street
     */
    street?: string;

    /**
     * Textinput variant
     */
    variant?: 'filled' | 'outlined' | 'standard' | undefined;
}

/**
 * Module address selector
 */
export function ModuleAddressSelector(props: ModuleAddressSelectorProps) {
    // Destruct
    const {
        addressLabel = 'Address',
        city,
        cityLabel = 'City',
        country,
        countryLabel = 'Country',
        district,
        districtLabel = 'District',
        // eslint-disable-next-line no-shadow
        InputLabelProps,
        module,
        namePart = '',
        organizationId,
        postcode = '',
        postcodeLabel = 'Postcode',
        postcodeMask = '999999',
        region,
        regionLabel = 'State',
        sm = 12,
        smField = 6,
        spacing = 1,
        street = '',
        variant
    } = props;

    // Country
    const [countryLocal, countryLocalSet] = React.useState(country);
    const [regionLocal, regionLocalSet] = React.useState(region);
    const [cityLocal, cityLocalSet] = React.useState(city);

    // Country change callback
    const changeCountry = (event: FormCustomChangeEvent) => {
        countryLocalSet(event.currentTarget.value);
        regionLocalSet(undefined);
    };

    const changeRegion = (event: FormCustomChangeEvent) => {
        regionLocalSet(event.currentTarget.value);
        cityLocalSet(undefined);
    };

    const changeCity = (event: FormCustomChangeEvent) => {
        cityLocalSet(event.currentTarget.value);
    };

    // Cache country list for performance
    const countryList = React.useMemo(() => {
        return (
            <ModuleCountryList
                label={countryLabel}
                name={`country${namePart}`}
                module={module}
                organizationId={organizationId}
                idValue={country}
                InputLabelProps={InputLabelProps}
                onIdChange={changeCountry}
                variant={variant}
            />
        );
    }, [country]);

    const regionList = React.useMemo(() => {
        return (
            <ModuleRegionList
                label={regionLabel}
                name={`region${namePart}`}
                module={module}
                country={countryLocal}
                idValue={region}
                onIdChange={changeRegion}
                organizationId={organizationId}
                InputLabelProps={InputLabelProps}
                variant={variant}
            />
        );
    }, [countryLocal, region]);

    const cityList = React.useMemo(() => {
        return (
            <ModuleCityList
                label={cityLabel}
                name={`city${namePart}`}
                module={module}
                region={regionLocal}
                idValue={city}
                onIdChange={changeCity}
                organizationId={organizationId}
                InputLabelProps={InputLabelProps}
                variant={variant}
            />
        );
    }, [regionLocal, city]);

    const districtList = React.useMemo(() => {
        return (
            <ModuleDistrictList
                label={districtLabel}
                name={`district${namePart}`}
                module={module}
                city={cityLocal}
                idValue={district}
                organizationId={organizationId}
                InputLabelProps={InputLabelProps}
                variant={variant}
            />
        );
    }, [cityLocal, district]);

    return (
        <Grid
            container
            item
            xs={12}
            sm={sm}
            spacing={spacing}
            justify="space-between"
        >
            <Grid item xs={12} sm={smField}>
                {countryList}
            </Grid>
            <Grid item xs={12} sm={smField}>
                {regionList}
            </Grid>
            <Grid item xs={12} sm={smField}>
                {cityList}
            </Grid>
            <Grid item xs={12} sm={smField}>
                {districtList}
            </Grid>
            <Grid item xs={12} sm={10}>
                <TextField
                    name={`street${namePart}`}
                    fullWidth
                    InputLabelProps={InputLabelProps}
                    label={addressLabel}
                    value={street}
                    variant={variant}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <MaskedInput
                    name={`postcode${namePart}`}
                    fullWidth
                    InputLabelProps={InputLabelProps}
                    mask={postcodeMask}
                    label={postcodeLabel}
                    variant={variant}
                    value={postcode}
                />
            </Grid>
        </Grid>
    );
}
