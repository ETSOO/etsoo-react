import React from 'react';
import { ViewNavigator, ViewNavigatorAction } from './ViewNavigator';

/**
 * View page properties
 */
export interface ViewPageProps {
    /**
     * Actions
     */
    actions: ViewNavigatorAction[];

    /**
     * Children
     */
    children?: React.ReactNode;

    /**
     * Navigator class name
     */
    navigatorClassName?: string;
}

/**
 * View page
 * @param props Properties
 */
export function ViewPage(props: ViewPageProps) {
    // Destruct
    const { actions, children, navigatorClassName } = props;

    return (
        <>
            {children}
            <ViewNavigator actions={actions} className={navigatorClassName} />
        </>
    );
}
