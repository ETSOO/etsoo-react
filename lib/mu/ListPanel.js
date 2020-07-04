import React from "react";
import { makeStyles, Typography, Divider, List, ListItem } from "@material-ui/core";
import { Utils } from "../api/Utils";
// Table styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
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
export function ListPanel({ className, footerElement, items, itemRenderer, moreElement, title, ...rest }) {
    // Style
    const classes = useStyles();
    return React.createElement(List, Object.assign({ className: Utils.mergeClasses(classes.root, className) }, rest),
        React.createElement(ListItem, { className: classes.header },
            React.createElement(Typography, { className: classes.title }, title),
            moreElement),
        React.createElement(Divider, null),
        items.map((item, index) => itemRenderer(item, index)),
        React.createElement(Divider, null),
        footerElement);
}
