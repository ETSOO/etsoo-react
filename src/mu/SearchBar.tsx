import React, { ChangeEvent } from 'react';
import { InputBase, makeStyles, fade, Theme } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ApiSettings } from '../api/IApiSettings';

interface ICustomStyle {
    /**
     * Focus width
     */
    focusWidth?: string;

    /**
     * Input width
     */
    width?: string;
}

/**
 * Search bar properties interface
 */
export interface SearchBarProps extends ICustomStyle {
    /**
     * Input blur event handler
     */
    onBlur?: React.FocusEventHandler;

    /**
     * Input change event handler
     */
    onChange?: React.ChangeEventHandler;

    /**
     * Input delay change event handler
     */
    onDelayChange?: React.ChangeEventHandler;

    /**
     * Input focus event handler
     */
    onFocus?: React.FocusEventHandler;

    /**
     * placeholder for the input
     */
    placeholder?: string;
}

// Styles
const useStyles = makeStyles<Theme, ICustomStyle>((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.2),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.3)
        },
        marginRight: theme.spacing(1),
        marginLeft: 0,
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        },
        [theme.breakpoints.down('xs')]: {
            width: (props) => props.width || '80px',
            '&:focus-within': {
                width: (props) => props.focusWidth || '100%'
            }
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch'
        }
    }
}));

/**
 * Search bar
 * @param props Properties
 */
export function SearchBar(props: SearchBarProps) {
    // Destruct
    const {
        focusWidth,
        onBlur,
        onChange,
        onDelayChange,
        onFocus,
        placeholder,
        width
    } = props;

    // Style
    const classes = useStyles({ focusWidth, width });

    // Input ref
    const setInputRef = (input: HTMLInputElement) =>
        ApiSettings.setSearchInput(input);

    // change seed
    let changeSeed: number = 0;

    // Input text change event handler
    const changeHandler = (event: ChangeEvent) => {
        if (onDelayChange) {
            window.clearTimeout(changeSeed);
            changeSeed = window.setTimeout(() => {
                onDelayChange(event);
            }, 360);
            onDelayChange(event);
        } else if (onChange) {
            onChange(event);
        }
    };

    // Layout
    React.useEffect(
        () => () => {
            window.clearTimeout(changeSeed);
            changeSeed = 0;
        },
        []
    );

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <Search />
            </div>
            <InputBase
                placeholder={placeholder}
                inputRef={setInputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={changeHandler}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
            />
        </div>
    );
}
