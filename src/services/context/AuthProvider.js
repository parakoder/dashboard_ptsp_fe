import { createContext, useMemo, useReducer } from 'react';
import { LoginHandler } from '../handler/AuthHandler';

const initialState = {
    dataSignIn: {},
    token: null,
    error: null,
    isLoading: false,
};

const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    ERROR: 'ERROR',
    ISLOADING: 'ISLOADING',
};

const loginReducer = (prevState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...prevState,
                dataSignIn: action.dataSignIn,
                token: action.token,
            };
        case ACTIONS.LOGOUT:
            return {
                ...prevState,
                token: null,
            };
        case ACTIONS.ERROR:
            return {
                ...prevState,
                error: action.error,
            };
        case ACTIONS.ISLOADING:
            return {
                ...prevState,
                isLoading: action.isLoading,
            };
        default:
            return prevState;
    }
};

const AuthProvider = () => {
    const [authState, dispatch] = useReducer(loginReducer, initialState);

    const authContext = useMemo(
        () => ({
            signIn: async (username, password) => {
                dispatch({ type: ACTIONS.ISLOADING, isLoading: true });
                try {
                    // const resLogin = await LoginHandler(username, password);
                    localStorage.setItem(
                        '@user_dashboard_ptsp',
                        'ajwndiajwndj'
                    );
                    dispatch({
                        type: ACTIONS.LOGIN,
                        dataSignIn: { access_token: 'ajwndjadw' },
                        token: localStorage.getItem('@user_dashboard_ptsp'),
                    });
                    // return resLogin;
                    return true;
                } catch (error) {
                    dispatch({ type: ACTIONS.ERROR, error: error });
                    return error;
                }
            },
            signOut: async () => {
                localStorage.removeItem('@user_dashboard_ptsp');
                dispatch({ type: ACTIONS.LOGOUT, token: null });
            },
        }),
        []
    );

    return { authState, authContext };
};

export default AuthProvider;
