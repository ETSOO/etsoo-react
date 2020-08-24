import React from 'react';
import { Box, BoxProps, makeStyles, Theme } from '@material-ui/core';
import { DomUtils } from '@etsoo/shared';

/**
 * Extended HBox properties
 */
export interface HBoxProps
    extends Omit<BoxProps, 'display' | 'flexDirection' | 'flexWrap'> {
    /**
     * Gap between children
     */
    gap?: number;
}

// Styles
const useStyles = makeStyles<Theme, { gap: number }>((theme) => ({
    root: {
        '& >*:not(:first-child)': {
            marginLeft: ({ gap }) => theme.spacing(gap)
        }
    }
}));

/**
 * Horizontal layout box
 * @param props Properties
 */
export function HBox(props: HBoxProps) {
    // Destruct
    const { className, gap = 1, ...rest } = props;

    // Styles
    const classes = useStyles({ gap });

    // HOC
    return (
        <Box
            className={DomUtils.mergeClasses(classes.root, className)}
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            {...rest}
        />
    );
}
