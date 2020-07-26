import React from 'react';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import { Error, Info, Help } from '@material-ui/icons';
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
        var _a;
        (_a = state.callback) === null || _a === void 0 ? void 0 : _a.call(null, result);
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
    const isMessage = state.type === NotifierActionType.Message;
    // Confirm
    const isConfirm = state.type === NotifierActionType.Confirm;
    if (state == null || state.type === NotifierActionType.None) {
        // Empty
        return (React.createElement(React.Fragment, null));
    }
    if (state.type === NotifierActionType.Loading) {
        // Loading
        return (React.createElement(Backdrop, { className: classes.backdrop, open: true },
            React.createElement(CircularProgress, { color: "primary" })));
    }
    if (state.type === NotifierActionType.Error || isMessage || isConfirm) {
        // Title
        let { title } = state;
        // Icon
        let icon;
        if (isMessage) {
            title = title || labels.result || 'Result';
            icon = React.createElement(Info, { color: "primary" });
        }
        else if (isConfirm) {
            title = title || labels.confirm || 'Confirm';
            icon = React.createElement(Help, { color: "action" });
        }
        else {
            title = title || labels.error || 'Error';
            icon = React.createElement(Error, { color: "error" });
        }
        return (React.createElement(Dialog, { open: true, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
            React.createElement(DialogTitle, { id: "alert-dialog-title", disableTypography: true, className: classes.errorTitle },
                icon,
                React.createElement(Typography, { component: "h2" }, title)),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, { id: "alert-dialog-description" }, state.message)),
            React.createElement(DialogActions, null, isConfirm
                ? (React.createElement(React.Fragment, null,
                    React.createElement(Button, { color: "secondary", onClick: handleNo, autoFocus: true }, labels.no || 'No'),
                    React.createElement(Button, { color: "primary", onClick: handleYes, autoFocus: true }, labels.yes || 'Yes')))
                : React.createElement(Button, { color: "primary", onClick: handleOK, autoFocus: true }, labels.ok || 'OK'))));
    }
    // Other
    return (React.createElement(React.Fragment, null));
});
