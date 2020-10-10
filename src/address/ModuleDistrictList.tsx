import React from 'react';
import { ApiModule } from '../api/IApiEntity';
import { CoreController } from '../controllers/CoreController';
import { ExtendAddress, DistrictListItem } from '../controllers/ExtendAddress';
import { DistrictListProps, DistrictList } from './DistrictList';

/**
 * District list properties
 */
export type ModuleDistrictListProps = Omit<
    DistrictListProps,
    'loadOptions' | 'cacheKey'
> & {
    /**
     * city id or name
     */
    city?: string;

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
 * Module district list
 */
export function ModuleDistrictList(props: ModuleDistrictListProps) {
    // Destruct
    const { city, module, organizationId, ...rest } = props;

    // API controller
    const controller = React.useMemo(() => {
        const Address = ExtendAddress(CoreController.create(module));
        return new Address();
    }, [module]);

    // Load options
    const loadOptions = (): Promise<DistrictListItem[] | undefined> => {
        if (city) return controller.districtList(city, organizationId);
        return Promise.resolve([]);
    };

    // Return
    return <DistrictList cacheKey={city} loadOptions={loadOptions} {...rest} />;
}
