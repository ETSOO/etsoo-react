import React from 'react';
import { makeStyles } from "@material-ui/core";
// Styles
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3)
        }
    }
}));
/**
 * Styled form
 * @param props Properties
 */
export const StyledForm = React.forwardRef(({ autoComplete, children, hidden, onSubmit }, ref) => {
    // Style
    const classes = useStyles();
    return (React.createElement("form", { className: classes.form, hidden: hidden, onSubmit: onSubmit, noValidate: true, ref: ref, autoComplete: autoComplete || 'on' }, children));
});
