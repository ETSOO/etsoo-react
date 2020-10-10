import React from 'react';
import { DataTypes } from '@etsoo/shared';
import { ApiModule } from '../api/IApiEntity';
import { CoreController } from '../controllers/CoreController';
import { TiplistProps, Tiplist } from './Tiplist';
import { IListItem } from '../views/IListItem';
import { TiplistModel } from '../models/TiplistModel';

/**
 * Country list properties
 */
export type ModuleTiplistProps<T extends IListItem> = Omit<
    TiplistProps<T>,
    'onLoadData'
> & {
    /**
     * Module name
     */
    module: ApiModule;

    /**
     * Parameters
     */
    params?: DataTypes.DynamicData;

    /**
     * Records to display
     */
    records?: number;
};

/**
 * Module Tiplist
 */
export function ModuleTiplist<T extends IListItem = IListItem>(
    props: ModuleTiplistProps<T>
) {
    // Destruct
    const { module, params, records, ...rest } = props;

    // API controller
    const controller = React.useMemo(() => {
        const MC = CoreController.create(module);
        return new MC();
    }, [module]);

    // Load options
    const onLoadData = (idValue?: string, sc?: string) => {
        // Query model
        const model: TiplistModel = {
            id: idValue,
            sc,
            records
        };

        // Merge parameters
        if (params) {
            Object.assign(model, params);
        }

        // Query data
        return controller.tiplist<TiplistModel, T>(model);
    };

    // Return
    return <Tiplist<T> onLoadData={onLoadData} {...rest} />;
}
