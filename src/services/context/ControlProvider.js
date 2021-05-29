import { useMemo, useReducer } from 'react';
import { LoginHandler } from '../handler/AuthHandler';

const initialState = {
    dataDashboard: 0,
    error: null,
    isLoading: false,
};

const ACTIONS = {
    NEXT: 'NEXT',
    ERROR: 'ERROR',
    ISLOADING: 'ISLOADING',
};

const controlReducer = (prevState, action) => {
    switch (action.type) {
        case ACTIONS.NEXT:
            return {
                ...prevState,
                dataDashboard: prevState.dataDashboard + 1,
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

const ControlProvider = () => {
    const [controlState, dispatch] = useReducer(controlReducer, initialState);

    const controlContext = useMemo(
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
            next: async () => {
                dispatch({ type: ACTIONS.NEXT });
            },
        }),
        []
    );

    return { controlState, controlContext };
};

export default ControlProvider;
