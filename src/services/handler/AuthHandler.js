import LoginApi from '../LoginApi';
import base64 from 'base-64';

export const LoginHandler = async (username, password) => {
    const raw = { username, password };

    try {
        const response = await LoginApi.post('url', raw, {
            headers: {
                auth: base64.encode(
                    username + `${process.env.REACT_APP_R}` + password
                ),
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        if (response.data.data !== null) {
            localStorage.setItem(
                '@user_dashboard_ptsp',
                JSON.stringify(response.data.data)
            );
        }
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
