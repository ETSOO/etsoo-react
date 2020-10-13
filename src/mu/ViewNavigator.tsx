import React from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
    makeStyles,
    Menu
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { DomUtils } from '@etsoo/shared';
import { IClickAction } from '../api/IClickAction';

/**
 * View navigator action
 */
export interface ViewNavigatorAction extends Partial<IClickAction> {
    /**
     * Popup menu items
     */
    menuItems?: React.ReactNode[];

    /**
     * Show the label
     */
    showLabel?: boolean;
}

/**
 * View navigator properties
 */
export interface ViewNavigatorProps {
    /**
     * Actions
     */
    actions: ViewNavigatorAction[];

    /**
     * Style class name
     */
    className?: string;

    /**
     * On selected item change callback
     * @param selectedIndex Selected index
     */
    onChange?(selectedIndex: number): void;

    /**
     * Show all labels, default is 'true'
     */
    showLabels?: boolean;

    /**
     * Init selected index
     */
    value?: number;
}

// Styles
const useStyles = makeStyles(() => ({
    navigator: {
        width: '100%',
        position: 'fixed',
        top: 'auto',
        bottom: 0
    }
}));

// Find button from eventTarget
function findButton(src: EventTarget | null): HTMLButtonElement | undefined {
    let source = src as HTMLElement | null;
    while (source) {
        if (source.nodeName === 'BUTTON') {
            return source as HTMLButtonElement;
        }

        source = source.parentElement;
    }

    return undefined;
}

/**
 * View navigator
 * @param props Properties
 */
export function ViewNavigator(props: ViewNavigatorProps) {
    // Destruct
    const {
        actions,
        className,
        onChange,
        showLabels = true,
        value: initValue
    } = props;

    // Classes
    const classes = useStyles();

    // Router history
    const history = useHistory();

    // Current value
    const [value, setValue] = React.useState<string | number | undefined>(
        initValue
    );

    // Current menu
    const [anchorEls, setAnchorEls] = React.useState<(Element | undefined)[]>(
        Array(actions.length)
    );

    // On change callback
    const onChangeLocal = (event: React.ChangeEvent<{}>, newValue: number) => {
        // Update selected value
        setValue(newValue);

        // Current item
        const item = actions[newValue];
        if (item && item.action) {
            if (typeof item.action === 'string') {
                if (item.action === 'BACK') history.go(-1);
                else if (item.action === 'REFRESH') history.go(0);
                else history.push(item.action);
                return;
            }

            // Call it
            item.action();
        }

        if (item.menuItems && item.menuItems.length > 0) {
            const button = findButton(event.nativeEvent.srcElement);
            const newAnchorEls = [...anchorEls];
            newAnchorEls[newValue] = button;
            setAnchorEls(newAnchorEls);
        }

        if (onChange) onChange(newValue);
    };

    // Menus
    const menus = actions.map((item, index) => {
        if (item.menuItems && item.menuItems.length > 0) {
            const closeMenu = () => {
                const newAnchorEls = [...anchorEls];
                newAnchorEls[index] = undefined;
                setAnchorEls(newAnchorEls);
            };
            return (
                <Menu
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    key={index}
                    anchorEl={anchorEls[index]}
                    keepMounted
                    onClick={() => {
                        if (anchorEls[index]) {
                            // When the menu is popup, close it
                            closeMenu();
                        }
                    }}
                    onClose={closeMenu}
                    open={Boolean(anchorEls[index])}
                >
                    {item.menuItems}
                </Menu>
            );
        }

        // "key" is necessary for list renderer even for blank output
        // https://reactjs.org/docs/lists-and-keys.html#keys
        return <React.Fragment key={index}></React.Fragment>;
    });

    // No actions, return empty
    if (actions.length === 0) return <></>;

    return (
        <>
            {menus}
            <BottomNavigation
                className={DomUtils.mergeClasses(classes.navigator, className)}
                showLabels={showLabels}
                value={value}
                onChange={onChangeLocal}
            >
                {actions.map((action) => (
                    <BottomNavigationAction
                        key={action.label}
                        showLabel={action.showLabel}
                        label={action.label}
                        icon={action.icon}
                    />
                ))}
            </BottomNavigation>
        </>
    );
}
