import React from 'react'
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, createStyles, Theme, Typography } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import HelpIcon from '@material-ui/icons/Help'
import { CreateState } from '../states/CreateState'
import { NotifierReducer, INotifierState, NotifierActionType, NotifierAction } from '../states/NotifierState'
import { ApiSettings } from '../api/IApiSettings'
import { LanguageLabel } from '../states/LanguageState'

// Style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)

/**
 * Notifier context and provider
 */
export const { context: NotifierContext, provider: NotifierProvider } = CreateState(NotifierReducer, {} as INotifierState, (state, dispatch) => {
    // Handle reset
    const handleReset = () => {
        const action: NotifierAction = { type: NotifierActionType.None }
        dispatch(action)
    }

    // Handle result
    const handleResult = (result: boolean = true) => {
        if(state.callback) {
            state.callback.call(null, result)
        }
        handleReset()
    }

    // Handle OK button click
    const handleOK = () => {
        handleResult()
    }

    // Handle Yes button click
    const handleYes = () => {
        handleResult()
    }

    // Handle No button click
    const handleNo = () => {
        handleResult(false)
    }

    // Style
    const classes = useStyles()

    // Labels
    let labels: LanguageLabel
    if(ApiSettings.languageContext) {
        const { state: L } = React.useContext(ApiSettings.languageContext())
        labels = L.labels
    } else {
        labels = {}
    }

    // Message
    const isMessage = state.type == NotifierActionType.Message

    // Confirm
    const isConfirm = state.type == NotifierActionType.Confirm

    if(state == null || state.type == NotifierActionType.None)
        // Empty
        return (
            <></>
        )
    else if(state.type == NotifierActionType.Loading)
        // Loading
        return (
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="primary" />
            </Backdrop>
        )
    else if(state.type == NotifierActionType.Error || isMessage || isConfirm) {
        // Title
        let title: string | undefined = state.title

        // null or undefined title
        if(title == null) {
            if(isMessage)
                title = labels['result'] || 'Result'
            else if(isConfirm)
                title = labels['confirm'] || 'Confirm'
            else
                title = labels['error'] || 'Error'
        }

        // Icon
        const icon = isMessage ? <InfoIcon color="primary" /> : ( isConfirm ? <HelpIcon color="action" /> : <ErrorIcon color="error" /> )

        // Error
        return (
            <Dialog open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" disableTypography  className={classes.errorTitle}>
                    {icon}
                    <Typography component="h2">{title}</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{state.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        isConfirm
                        ? <><Button color="secondary" onClick={handleNo} autoFocus>{labels['no'] || 'No'}</Button><Button color="primary" onClick={handleYes} autoFocus>{labels['yes'] || 'Yes'}</Button></>
                        : <Button color="primary" onClick={handleOK} autoFocus>{labels['ok'] || 'OK'}</Button>
                    }
                </DialogActions>
            </Dialog>
        )
    } else
        // Other
        return (
            <></>
        )
})