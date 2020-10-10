import React from 'react';
import { ApiModule } from '../api/IApiEntity';
import { CoreController } from '../controllers/CoreController';
import { ExtendAddress, RegionListItem } from '../controllers/ExtendAddress';
import { RegionList, RegionListProps } from './RegionList';

/**
 * Region list properties
 */
export type ModuleRegionListProps = Omit<
    RegionListProps,
    'loadOptions' | 'cacheKey'
> & {
    /**
     * Country id or name
     */
    country?: string;

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
 * Module region list
 */
export function ModuleRegionList(props: ModuleRegionListProps) {
    // Destruct
    const { country, module, organizationId, ...rest } = props;

    // API controller
    const controller = React.useMemo(() => {
        const Address = ExtendAddress(CoreController.create(module));
        return new Address();
    }, [module]);

    // Load options
    const loadOptions = (): Promise<RegionListItem[] | undefined> => {
        if (country) return controller.regionList(country, organizationId);
        return Promise.resolve([]);
    };

    // Return
    return (
        <RegionList cacheKey={country} loadOptions={loadOptions} {...rest} />
    );
}
