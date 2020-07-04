import React from 'react';
import { Fab, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
/**
 * Search page more fab
 */
export function SearchPageMoreFab({ actions }) {
    // Menu anchor element and update
    const [anchorEl, setAnchorEl] = React.useState(null);
    // More click handler
    const onMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // Menu close handler
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Router history
    const history = useHistory();
    // Menu item click handler
    const handleClick = (index) => {
        // Action
        const action = actions[index];
        if (typeof action.action === 'string') {
            // URL
            history.push(action.action);
        }
        else {
            // Callback
            action.action();
        }
        // Close
        handleClose();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Fab, { color: "secondary", size: "medium", onClick: onMoreClick, key: "more" },
            React.createElement(MoreHorizIcon, null)),
        React.createElement(Menu, { anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, actions.map((action, index) => (React.createElement(MenuItem, { key: action.label, onClick: () => { handleClick(index); } },
            action.icon && (React.createElement(ListItemIcon, null, action.icon)),
            React.createElement(ListItemText, { primary: action.label })))))));
}
