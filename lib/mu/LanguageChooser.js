import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemText, IconButton, Tooltip } from '@material-ui/core';
import { Language } from '@material-ui/icons';
/**
 * Language chooser component
 * @param props Properties
 */
export function LanguageChooser(props) {
    //  properties destructure
    const { className, items, onClose, selectedValue, title } = props;
    // No items will return a blank component
    if (items.length === 0) {
        return (React.createElement("em", null, "No items"));
    }
    // Dialog open or not state
    const [open, setOpen] = React.useState(false);
    // Current language state
    let defaultLanguageItem = items.find(item => item.name === selectedValue);
    if (defaultLanguageItem == null) {
        [defaultLanguageItem] = items;
    }
    const [languageItem, setLanguageItem] = React.useState(defaultLanguageItem);
    // Click handler
    const clickHandler = () => {
        // More than one language
        if (items.length < 2) {
            return;
        }
        // Open the dialog
        setOpen(true);
    };
    // Close handler
    const closeHandler = () => {
        // Close the dialog
        setOpen(false);
        // Emit close event
        if (onClose) {
            onClose(languageItem);
        }
    };
    // Close item handler
    const closeItemHandler = (item) => {
        // Update the current item
        setLanguageItem(item);
        // Close the dialog
        setOpen(false);
        // Emit close event
        if (onClose) {
            onClose(item);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: languageItem.label, "aria-label": "Current language" },
            React.createElement(IconButton, { color: "primary", className: className, "aria-label": "Language", onClick: clickHandler },
                React.createElement(Language, null))),
        React.createElement(Dialog, { "aria-labelledby": "dialog-title", open: open, onClose: closeHandler },
            React.createElement(DialogTitle, { id: "dialog-title" }, title || ''),
            React.createElement(List, null, items.map(item => (React.createElement(ListItem, { button: true, key: item.name, disabled: item.name === languageItem.name, onClick: () => closeItemHandler(item) },
                React.createElement(ListItemText, null, item.label))))))));
}
