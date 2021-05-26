import { createContext, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../routes/Routes';
import AuthProvider from './AuthProvider';

export const AppContext = createContext();

const Context = () => {
    const { authState, authContext } = AuthProvider();

    const allState = { authState };
    const allFunctions = { authContext };

    return (
        <AppContext.Provider value={{ state: allState, fun: allFunctions }}>
            <Router>
                <Routes />
            </Router>
        </AppContext.Provider>
    );
};

export default Context;
