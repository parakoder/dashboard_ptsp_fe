import { createContext, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../routes/Routes';
import AuthProvider from './AuthProvider';
import ControlProvider from './ControlProvider';

export const AppContext = createContext();

const Context = () => {
    const { authState, authContext } = AuthProvider();
    const { controlState, controlContext } = ControlProvider();

    const allState = { authState, controlState };
    const allFunctions = { authContext, controlContext };

    console.log('control state', controlState);

    return (
        <AppContext.Provider value={{ state: allState, fun: allFunctions }}>
            <Router>
                <Routes />
            </Router>
        </AppContext.Provider>
    );
};

export default Context;
