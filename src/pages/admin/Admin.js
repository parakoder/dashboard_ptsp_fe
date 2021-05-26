import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../services/context/Context';

const Admin = () => {
    const { state, fun } = useContext(AppContext);
    const { authContext } = fun;

    return (
        <div>
            <div>Admin Page</div>
            <div onClick={() => authContext.signOut()}>Logout</div>
        </div>
    );
};

export default withRouter(Admin);
