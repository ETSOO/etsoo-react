import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Fab,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { IClickAction } from '../api/IClickAction';

/**
 * Search page more fab properties
 */
export interface SearchPageMoreFabProps {
    /**
     * Actions
     */
    actions: IClickAction[];
}

/**
 * Search page more fab
 */
export function SearchPageMoreFab({ actions }: SearchPageMoreFabProps) {
    // Menu anchor element and update
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // More click handler
    const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Menu close handler
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Router history
    const history = useHistory();

    // Menu item click handler
    const handleClick = (index: number) => {
        // Action
        const action = actions[index];

        if (typeof action.action === 'string') {
            // URL
            history.push(action.action);
        } else {
            // Callback
            action.action();
        }

        // Close
        handleClose();
    };

    return (
        <>
            <Fab
                color="secondary"
                size="medium"
                onClick={onMoreClick}
                key="more"
            >
                <MoreHoriz />
            </Fab>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {actions.map((action, index) => (
                    <MenuItem
                        key={action.label}
                        onClick={() => handleClick(index)}
                    >
                        {action.icon && (
                            <ListItemIcon>{action.icon}</ListItemIcon>
                        )}
                        <ListItemText primary={action.label} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
