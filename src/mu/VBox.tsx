import React from 'react';
import { Box, BoxProps, makeStyles, Theme } from '@material-ui/core';
import { DomUtils } from '@etsoo/shared';

/**
 * Extended VBox properties
 */
export interface VBoxProps
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
            marginTop: ({ gap }) => theme.spacing(gap)
        }
    }
}));

/**
 * Vertical layout box
 * @param props Properties
 */
export function VBox(props: VBoxProps) {
    // Destruct
    const { className, gap = 1, ...rest } = props;

    // Styles
    const classes = useStyles({ gap });

    // HOC
    return (
        <Box
            className={DomUtils.mergeClasses(classes.root, className)}
            display="flex"
            flexDirection="column"
            flexWrap="nowrap"
            {...rest}
        />
    );
}
