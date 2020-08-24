import React from 'react';
import { makeStyles, Fab, Theme } from '@material-ui/core';
import { Add, VerticalAlignTop } from '@material-ui/icons';
import { IClickAction } from '../api/IClickAction';
import { SearchPageMoreFab } from './SearchPageMoreFab';

/**
 * Search page fabs methods
 */
export interface SearchPageFabsMethods {
    /**
     * Scroll change
     * @param visible Is visible
     */
    scollChange(visible: boolean): void;
}

/**
 * Search page fabs properties
 */
export interface SearchPageFabsProps {
    /**
     * Bottom position
     */
    bottom?: number;

    /**
     * More actions
     */
    moreActions?: IClickAction[];

    /**
     * Add button click handler
     */
    onAddClick?: React.MouseEventHandler;

    /**
     * Go top button click handler
     */
    onGoTopClick?: React.MouseEventHandler;

    /**
     * Right position
     */
    right?: number;
}

// Styles
const useStyles = makeStyles<Theme, { bottom: number; right: number }>(
    (theme) => ({
        fabs: {
            position: 'absolute',
            justifyItems: 'center',
            bottom: (style) => theme.spacing(style.bottom),
            right: (style) => theme.spacing(style.right),
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            opacity: 0.8,
            '&:hover': {
                opacity: 1
            },
            [theme.breakpoints.up('md')]: {
                flexDirection: 'row',
                '&>*': {
                    marginLeft: theme.spacing(2)
                }
            },
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                '&>*': {
                    marginTop: theme.spacing(2)
                }
            }
        }
    })
);

/**
 * Search page fabs of 'Go top', 'Add', and 'More' functions
 */
export const SearchPageFabs = React.forwardRef<
    SearchPageFabsMethods,
    SearchPageFabsProps
>((props, ref) => {
    // Destruct
    const {
        bottom = 4,
        moreActions,
        onAddClick,
        onGoTopClick,
        right = 4
    } = props;

    // Style
    const classes = useStyles({ bottom, right });

    // Icons
    const fabs: React.ReactElement[] = [];

    // Go top icon ref
    const topRef = React.useRef<HTMLElement>(null);

    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        scollChange(visible: boolean) {
            const element = topRef.current;
            if (element) {
                element.style.visibility = visible ? 'visible' : 'hidden';
            }
        }
    }));

    // Go top
    if (onGoTopClick) {
        fabs.push(
            <Fab
                color="default"
                size="medium"
                style={{ visibility: 'hidden' }}
                onClick={onGoTopClick}
                key="gotop"
                buttonRef={topRef}
            >
                <VerticalAlignTop />
            </Fab>
        );
    }

    // Add
    if (onAddClick) {
        fabs.push(
            <Fab color="primary" onClick={onAddClick} key="add">
                <Add />
            </Fab>
        );
    }

    // More
    if (moreActions && moreActions.length > 0) {
        fabs.push(<SearchPageMoreFab key="more" actions={moreActions} />);
    }

    return <div className={classes.fabs}>{fabs}</div>;
});
