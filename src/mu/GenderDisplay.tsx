import React from 'react';
import { Mood, Face } from '@material-ui/icons';
import { HBox } from './HBox';

/**
 * Gender display properties
 */
export interface GenderDisplayProps {
    /**
     * Female label
     */
    femaleLabel?: string;

    /**
     * Male label
     */
    maleLabel?: string;

    /**
     * Value, M/F/undefined
     */
    value?: string;
}

/**
 * Gender display
 * @param props Properties
 */
export function GenderDisplay(props: GenderDisplayProps) {
    // Destruct
    const { femaleLabel = 'Female', maleLabel = 'Male', value } = props;

    if (value) {
        if (value === 'm' || value === 'M' || value === '1')
            return (
                <HBox>
                    <Mood fontSize="inherit" color="primary" />
                    <div>{maleLabel}</div>
                </HBox>
            );

        if (value === 'f' || value === 'F' || value === '0')
            return (
                <HBox>
                    <Face fontSize="inherit" color="secondary" />
                    <div>{femaleLabel} </div>
                </HBox>
            );

        return <div>{value} </div>;
    }

    return <></>;
}
