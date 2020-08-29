import React from 'react';
import { CountryListProps, CountryList } from './CountryList';
import { ApiModule } from '../api/IApiEntity';
import { CoreController } from '../controllers/CoreController';
import { ExtendAddress } from '../controllers/ExtendAddress';

/**
 * Country list properties
 */
export type ModuleCountryListProps = Omit<
    CountryListProps,
    'loadOptions' | 'sort'
> & {
    /**
     * Module name
     */
    module: ApiModule;

    /**
     * Limited organization id
     */
    organizationId?: number;
};

/**
 * Module country list
 */
export function ModuleCountryList(props: ModuleCountryListProps) {
    // Destruct
    const { module, organizationId, ...rest } = props;

    // API controller
    const controller = React.useMemo(() => {
        const Address = ExtendAddress(CoreController.create(module));
        return new Address();
    }, [module]);

    // Load options
    const loadOptions = () => {
        return controller.countryList(organizationId);
    };

    // Return
    return <CountryList loadOptions={loadOptions} {...rest} />;
}
