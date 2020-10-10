import React from 'react';
import { Typography } from '@material-ui/core';
import { Face, Mood } from '@material-ui/icons';
import { RadioGroupFieldProps, RadioGroupField } from './RadioGroupField';
import { HBox } from './HBox';

/**
 * Gender properties
 */
export type GenderProps = Omit<RadioGroupFieldProps, 'items'> & {
    /**
     * Female label
     */
    femaleLabel?: string;

    /**
     * Male label
     */
    maleLabel?: string;
};

export function Gender(props: GenderProps) {
    // Destruct
    const { femaleLabel = 'Female', maleLabel = 'Male', ...rest } = props;

    // List items
    const items = [
        {
            value: 'M',
            label: (
                <HBox>
                    <Mood fontSize="inherit" color="primary" />
                    <Typography>{maleLabel}</Typography>
                </HBox>
            )
        },
        {
            value: 'F',
            label: (
                <HBox>
                    <Face fontSize="inherit" color="secondary" />
                    <Typography>{femaleLabel} </Typography>
                </HBox>
            )
        }
    ];

    return <RadioGroupField items={items} {...rest} />;
}
