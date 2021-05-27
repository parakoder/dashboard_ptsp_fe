import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import Admin from '../pages/admin/Admin';
import Dashboard from '../pages/dashboard/Dashboard';
import Auth from '../pages/auth/Auth';
import { AppContext } from '../services/context/Context';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    const { state, fun } = useContext(AppContext);

    const { authState } = state;
    console.log('authState', authState);

    const lclStorage = localStorage.getItem('@user_dashboard_ptsp');

    return (
        <>
            <Route path='/' exact>
                <Auth />
            </Route>
            <Route path='/dashboard' exact component={Dashboard} />
            <ProtectedRoute
                path='/admin'
                component={Admin}
                isAuth={lclStorage}
            />
        </>
    );
};

export default Routes;
