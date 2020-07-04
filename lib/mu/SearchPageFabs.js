import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { SearchPageMoreFab } from './SearchPageMoreFab';
// Styles
const useStyles = makeStyles((theme) => ({
    fabs: {
        position: 'absolute',
        justifyItems: 'center',
        bottom: (style) => style.bottom == null ? theme.spacing(4) : style.bottom,
        right: (style) => style.right == null ? theme.spacing(4) : style.right,
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
}));
/**
 * Search page fabs of 'Go top', 'Add', and 'More' functions
 */
export const SearchPageFabs = React.forwardRef(({ bottom, moreActions, onAddClick, onGoTopClick, right }, ref) => {
    // Style
    const classes = useStyles({ bottom, right });
    // Icons
    const fabs = [];
    // Go top icon ref
    const topRef = React.useRef(null);
    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        scollChange(visible) {
            if (topRef.current)
                topRef.current.style.visibility = (visible ? 'visible' : 'hidden');
        }
    }));
    // Go top
    if (onGoTopClick) {
        fabs.push(React.createElement(Fab, { color: "default", size: "medium", style: { visibility: 'hidden' }, onClick: onGoTopClick, key: "gotop", buttonRef: topRef },
            React.createElement(VerticalAlignTopIcon, null)));
    }
    // Add
    if (onAddClick) {
        fabs.push(React.createElement(Fab, { color: "primary", onClick: onAddClick, key: "add" },
            React.createElement(AddIcon, null)));
    }
    // More
    if (moreActions && moreActions.length > 0) {
        fabs.push(React.createElement(SearchPageMoreFab, { key: "more", actions: moreActions }));
    }
    return (React.createElement("div", { className: classes.fabs }, fabs));
});
