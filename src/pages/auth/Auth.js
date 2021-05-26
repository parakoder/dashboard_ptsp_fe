import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../services/context/Context';

const Auth = () => {
    const history = useHistory();
    const { state, fun } = useContext(AppContext);

    const { authState } = state;
    const { authContext } = fun;

    return (
        <div>
            <div>Auth Page</div>
            <button
                onClick={() => {
                    authContext.signIn().then((res) => {
                        history.replace('/admin');
                    });
                }}
            >
                Login
            </button>
        </div>
    );
};

export default Auth;
