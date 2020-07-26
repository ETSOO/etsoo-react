import React from 'react';
import { FormControl, FormLabel, FormHelperText, RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import { Utils } from '../api/Utils';
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
 * Radio group field
 */
export function RadioGroupField(props) {
    // Destruct
    const { className, error, errorClassName, helperText, items, label, listClassName, required, row, titleClassName, ...rest } = props;
    // Style
    const classes = useStyles();
    // Row
    const localRow = row == null ? true : row;
    return (React.createElement(FormControl, { className: Utils.mergeClasses(classes.root, className), required: required },
        React.createElement(FormLabel, { className: Utils.mergeClasses(classes.title, titleClassName), error: error, required: true }, label),
        React.createElement(RadioGroup, Object.assign({ className: Utils.mergeClasses(classes.listContainer, listClassName), row: localRow }, rest), items.map(item => (React.createElement(FormControlLabel, { key: item.label, value: item.value, control: React.createElement(Radio, { size: "small", style: { marginTop: -4, marginBottom: -4 } }), label: item.label })))),
        React.createElement(FormHelperText, { className: Utils.mergeClasses(classes.error, errorClassName), error: error }, helperText)));
}
