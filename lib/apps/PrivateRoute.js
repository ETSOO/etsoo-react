import React from 'react';
import { Redirect, Route } from 'react-router-dom';
/**
 * Private route for react-router-dom
 * Configue a strict route with '/login' to redirect to application's actual login page
 * In login page, useLocation() to get the Location object, and Location.state as PrivateRouteRedirectState to access referrer
 */
export function PrivateRoute({ authorized, ...rest }) {
    return (authorized ? React.createElement(Route, Object.assign({}, rest)) : React.createElement(Redirect, { to: { pathname: `/login`, state: { referrer: rest.location } } }));
}
