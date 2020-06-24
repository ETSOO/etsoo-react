import React, { FormEventHandler } from 'react'
import { makeStyles } from "@material-ui/core"

/**
 * Styled form properties
 */
export interface StyledFormProps {
    /**
     * Form auto complete
     */
    autoComplete?: 'on' | 'off'

    /**
     * Hidden of the form
     */
    hidden?: boolean

    /**
     * On submit event handler
     */
    onSubmit?: FormEventHandler
}

// Styles
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3)
        }
    }
}))

/**
 * Styled form
 * @param props Properties
 */
export const StyledForm = React.forwardRef<HTMLFormElement, React.PropsWithChildren<StyledFormProps>>(({autoComplete, children, hidden, onSubmit}, ref) => {
    // Style
    const classes = useStyles()

    return (
        <form className={classes.form} hidden={hidden} onSubmit={onSubmit} noValidate ref={ref} autoComplete={autoComplete || 'on'}>
            {children}
        </form>
    )
})