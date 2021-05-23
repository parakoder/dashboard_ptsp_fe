import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{ pathname: '/', state: { from: location } }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
