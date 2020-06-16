import React from "react"
import { PaperProps, makeStyles, Theme, Typography, Divider, List, ListItem } from "@material-ui/core"
import { Utils } from "../api/Utils"

/**
 * List panel properties
 */
export interface ListPanelProps {
    /**
     * Style class name
     */
    className?: string

    /**
     * Top right more element
     */
    moreElement?: React.ReactElement

    /**
     * Footer element
     */
    footerElement?: React.ReactElement

    /**
     * List items
     */
    items: any[]

    /**
     * List item renderer
     */
    itemRenderer(item: any, index: number): React.ReactElement

    /**
     * Title
     */
    title: string
}

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
    },
    list: {
    }
}))

/**
 * List panel
 * @param props Properties
 */
export function ListPanel({ className, footerElement, items, itemRenderer, moreElement, title, ...rest }: ListPanelProps) {
    // Style
    const classes = useStyles()

    return <List className={Utils.mergeClasses(classes.root, className)} {...rest}>
        <ListItem className={classes.header}>
            <Typography className={classes.title}>{title}</Typography>
            {moreElement}
        </ListItem>

        <Divider/>

        <div className={classes.list}>
            { items.map((item, index) => itemRenderer(item, index) ) }
        </div>

        <Divider/>

        {footerElement}
    </List>
}