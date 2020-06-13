import React from 'react'
import { makeStyles, Fab, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'

interface ICustomStyle {
    /**
     * Bottom position (px)
     */
    bottom?: number,

    /**
     * Right position (px)
     */
    right?: number
}

/**
 * Search page fabs methods
 */
export interface SearchPageFabsMethods {
    /**
     * Scroll change
     * @param visible Is visible
     */
    scollChange(visible: boolean): void
}

/**
 * Search page fabs properties
 */
export interface SearchPageFabsProps extends ICustomStyle {
    /**
     * Add button click handler
     */
    onAddClick?: React.MouseEventHandler

    /**
     * Go top button click handler
     */
    onGoTopClick?: React.MouseEventHandler

    /**
     * More button click handler
     */
    onMoreClick?: React.MouseEventHandler
}

// Styles
const useStyles = makeStyles<Theme, ICustomStyle>((theme) => ({
    fabs: {
        position: 'absolute',
        justifyItems: 'center',
        bottom: (style) => style.bottom == null ? theme.spacing(4) : style.bottom,
        right: (style) => style.right == null ? theme.spacing(4) : style.right,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            '&>*': {
                marginLeft: theme.spacing(2)
            }
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            '&>*': {
                marginTop: theme.spacing(2)
            }
        }
    }
}))

/**
 * Search page fabs of 'Go top', 'Add', and 'More' functions
 */
export const SearchPageFabs = React.forwardRef<SearchPageFabsMethods, SearchPageFabsProps>(({ bottom, onAddClick, onGoTopClick, onMoreClick, right }, ref) => {
    // Style
    const classes = useStyles({ bottom, right })

    // Icons
    const fabs: React.ReactElement[] = []

    // Go top icon ref
    const topRef = React.useRef<HTMLElement>(null)

    // Public methods through ref
    React.useImperativeHandle(ref, () => ({
        scollChange(visible: boolean) {
            if(topRef.current)
                topRef.current.style.visibility = (visible ? 'visible' : 'hidden')
        }
    }))

    // Go top
    if(onGoTopClick) {
        fabs.push(
            <Fab color="default" size="medium" style={{visibility: 'hidden'}} onClick={onGoTopClick} key="gotop" buttonRef={topRef}>
                <VerticalAlignTopIcon />
            </Fab>
        )
    }

    // Add
    if(onAddClick) {
        fabs.push(
            <Fab color="primary" onClick={onAddClick} key="add">
                <AddIcon />
            </Fab>
        )
    }

    // More
    if(onMoreClick) {
        fabs.push(
            <Fab color="secondary" size="medium" onClick={onMoreClick} key="more">
                <MoreHorizIcon />
            </Fab>
        )
    }

    return (
        <div className={classes.fabs}>
            {fabs}
        </div>
    )
})