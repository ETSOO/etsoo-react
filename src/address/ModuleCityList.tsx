import React from 'react';
import { ApiModule } from '../api/IApiEntity';
import { CoreController } from '../controllers/CoreController';
import { ExtendAddress, CityListItem } from '../controllers/ExtendAddress';
import { CityList, CityListProps } from './CityList';

/**
 * City list properties
 */
export type ModuleCityListProps = Omit<
    CityListProps,
    'loadOptions' | 'cacheKey'
> & {
    /**
     * Region id or name
     */
    region?: string;

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
 * Module city list
 */
export function ModuleCityList(props: ModuleCityListProps) {
    // Destruct
    const { region, module, organizationId, ...rest } = props;

    // API controller
    const controller = React.useMemo(() => {
        const Address = ExtendAddress(CoreController.create(module));
        return new Address();
    }, [module]);

    // Load options
    const loadOptions = (): Promise<CityListItem[] | undefined> => {
        if (region) return controller.cityList(region, organizationId);
        return Promise.resolve([]);
    };

    // Return
    return <CityList cacheKey={region} loadOptions={loadOptions} {...rest} />;
}
