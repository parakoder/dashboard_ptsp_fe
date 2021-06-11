import { useMemo, useReducer } from 'react';
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
                    const resLogin = await LoginHandler(username, password);
                    console.log('resswoi login', resLogin);
                    if (resLogin.status === 200) {
                        localStorage.setItem(
                            '@user_dashboard_ptsp',
                            JSON.stringify(resLogin.data)
                        );
                        dispatch({
                            type: ACTIONS.LOGIN,
                            dataSignIn: resLogin.data,
                            token: resLogin.data.accessToken,
                        });
                        dispatch({ type: ACTIONS.ISLOADING, isLoading: false });
                    }
                    // return resLogin;
                    return resLogin;
                } catch (error) {
                    console.log(
                        'err ctx login',
                        JSON.parse(error.responseText)
                    );
                    dispatch({
                        type: ACTIONS.ERROR,
                        error: JSON.parse(error.responseText).message,
                    });
                    return JSON.parse(error.responseText);
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
