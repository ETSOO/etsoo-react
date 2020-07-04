import React from 'react';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import { CreateState } from '../states/CreateState';
import { NotifierReducer, NotifierActionType } from '../states/NotifierState';
import { ApiSettings } from '../api/IApiSettings';
// Style
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: '#fff'
    },
    errorTitle: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& h2': {
            paddingLeft: theme.spacing(1)
        }
    }
}));
/**
 * Notifier context and provider
 */
export const { context: NotifierContext, provider: NotifierProvider } = CreateState(NotifierReducer, {}, (state, dispatch) => {
    // Handle reset
    const handleReset = () => {
        const action = { type: NotifierActionType.None };
        dispatch(action);
    };
    // Handle result
    const handleResult = (result = true) => {
        if (state.callback) {
            state.callback.call(null, result);
        }
        handleReset();
    };
    // Handle OK button click
    const handleOK = () => {
        handleResult();
    };
    // Handle Yes button click
    const handleYes = () => {
        handleResult();
    };
    // Handle No button click
    const handleNo = () => {
        handleResult(false);
    };
    // Style
    const classes = useStyles();
    // Labels
    let labels;
    if (ApiSettings.languageContext) {
        const { state: L } = React.useContext(ApiSettings.languageContext());
        labels = L.labels;
    }
    else {
        labels = {};
    }
    // Message
    const isMessage = state.type == NotifierActionType.Message;
    // Confirm
    const isConfirm = state.type == NotifierActionType.Confirm;
    if (state == null || state.type == NotifierActionType.None)
        // Empty
        return (React.createElement(React.Fragment, null));
    else if (state.type == NotifierActionType.Loading)
        // Loading
        return (React.createElement(Backdrop, { className: classes.backdrop, open: true },
            React.createElement(CircularProgress, { color: "primary" })));
    else if (state.type == NotifierActionType.Error || isMessage || isConfirm) {
        // Title
        let title = state.title;
        // null or undefined title
        if (title == null) {
            if (isMessage)
                title = labels['result'] || 'Result';
            else if (isConfirm)
                title = labels['confirm'] || 'Confirm';
            else
                title = labels['error'] || 'Error';
        }
        // Icon
        const icon = isMessage ? React.createElement(InfoIcon, { color: "primary" }) : (isConfirm ? React.createElement(HelpIcon, { color: "action" }) : React.createElement(ErrorIcon, { color: "error" }));
        // Error
        return (React.createElement(Dialog, { open: true, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
            React.createElement(DialogTitle, { id: "alert-dialog-title", disableTypography: true, className: classes.errorTitle },
                icon,
                React.createElement(Typography, { component: "h2" }, title)),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, { id: "alert-dialog-description" }, state.message)),
            React.createElement(DialogActions, null, isConfirm
                ? React.createElement(React.Fragment, null,
                    React.createElement(Button, { color: "secondary", onClick: handleNo, autoFocus: true }, labels['no'] || 'No'),
                    React.createElement(Button, { color: "primary", onClick: handleYes, autoFocus: true }, labels['yes'] || 'Yes'))
                : React.createElement(Button, { color: "primary", onClick: handleOK, autoFocus: true }, labels['ok'] || 'OK'))));
    }
    else
        // Other
        return (React.createElement(React.Fragment, null));
});
