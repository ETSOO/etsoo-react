import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import History from 'history'

/**
 * Private router property interface
 */
export interface PrivateRouteProp extends RouteProps {
    authorized: boolean
}

/**
 * Private router redirect state interface
 */
export interface PrivateRouteRedirectState {
    /**
     * referrer location
     */
    referrer: History.Location
}

/**
 * Private route for react-router-dom
 * Configue a strict route with '/login' to redirect to application's actual login page
 * In login page, useLocation() to get the Location object, and Location.state as PrivateRouteRedirectState to access referrer
 */
export const PrivateRoute: React.FunctionComponent<PrivateRouteProp> = ({authorized, ...rest}) => {
    return (
        authorized ? <Route {...rest}/> : <Redirect to={{pathname: `/login`, state: {referrer: rest.location} as PrivateRouteRedirectState}}/>
    )
}