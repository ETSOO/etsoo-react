import React from 'react';
import {
    makeStyles,
    Typography,
    Divider,
    List,
    ListItem
} from '@material-ui/core';
import { DomUtils } from '@etsoo/shared';

/**
 * List panel properties
 */
export interface ListPanelProps {
    /**
     * Style class name
     */
    className?: string;

    /**
     * Top right more element
     */
    moreElement?: React.ReactElement;

    /**
     * Footer element
     */
    footerElement?: React.ReactElement;

    /**
     * List items
     */
    items: any[];

    /**
     * List item renderer
     */
    itemRenderer(item: any, index: number): React.ReactElement;

    /**
     * Title
     */
    title: string;
}

// Table styles
const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        flexGrow: 1
    }
}));

/**
 * List panel
 * @param props Properties
 */
export function ListPanel(props: ListPanelProps) {
    // Destruct
    const {
        className,
        footerElement,
        items,
        itemRenderer,
        moreElement,
        title,
        ...rest
    } = props;

    // Style
    const classes = useStyles();

    return (
        <List
            className={DomUtils.mergeClasses(classes.root, className)}
            {...rest}
        >
            <ListItem className={classes.header}>
                <Typography className={classes.title}>{title}</Typography>
                {moreElement}
            </ListItem>

            <Divider />

            {items.map((item, index) => itemRenderer(item, index))}

            <Divider />

            {footerElement}
        </List>
    );
}
