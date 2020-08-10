import React from 'react';
import {
    RadioGroupProps,
    FormControl,
    FormLabel,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
    Radio,
    makeStyles
} from '@material-ui/core';
import { Utils } from '../api/Utils';

/**
 * Radio group item interface
 */
export interface RadioGroupFieldItem {
    /**
     * Label of the item
     */
    label: string;

    /**
     * Value of the item
     */
    value: unknown;
}

// Styles
const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3)
    },
    title: {
        ...theme.typography.caption
    },
    listContainer: {},
    error: {
        ...theme.typography.caption
    }
}));

/**
 * Radio group field properties
 */
export interface RadioGroupFieldProps extends RadioGroupProps {
    /**
     * If `true`, the label should be displayed in an error state
     */
    error?: boolean;

    /**
     * Error class name
     */
    errorClassName?: string;

    /**
     * The helper text content
     */
    helperText?: React.ReactNode;

    /**
     * Radio items
     */
    items: RadioGroupFieldItem[];

    /**
     * Label for the field
     */
    label?: string;

    /**
     * If `true`, the label will indicate that the input is required.
     */
    required?: boolean;

    /**
     * List class name
     */
    listClassName?: string;

    /**
     * Title class name
     */
    titleClassName?: string;
}

/**
 * Radio group field
 */
export function RadioGroupField(props: RadioGroupFieldProps) {
    // Destruct
    const {
        className,
        error,
        errorClassName,
        helperText,
        items,
        label,
        listClassName,
        required,
        row,
        titleClassName,
        ...rest
    } = props;

    // Style
    const classes = useStyles();

    // Row
    const localRow = row == null ? true : row;

    return (
        <FormControl
            className={Utils.mergeClasses(classes.root, className)}
            required={required}
        >
            <FormLabel
                className={Utils.mergeClasses(classes.title, titleClassName)}
                error={error}
                required
            >
                {label}
            </FormLabel>
            <RadioGroup
                className={Utils.mergeClasses(
                    classes.listContainer,
                    listClassName
                )}
                row={localRow}
                {...(rest as RadioGroupProps)}
            >
                {items.map((item) => (
                    <FormControlLabel
                        key={item.label}
                        value={item.value}
                        control={
                            <Radio
                                size="small"
                                style={{ marginTop: -4, marginBottom: -4 }}
                            />
                        }
                        label={item.label}
                    />
                ))}
            </RadioGroup>
            <FormHelperText
                className={Utils.mergeClasses(classes.error, errorClassName)}
                error={error}
            >
                {helperText}
            </FormHelperText>
        </FormControl>
    );
}
