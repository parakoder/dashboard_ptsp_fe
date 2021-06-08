import LoginApi from '../LoginApi';
import base64 from 'base-64';
import axios from 'axios';

export const LoginHandler = async (username, password) => {
    console.log('username', username);
    console.log('pass', password);
    // const raw = { username, password };
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
        // const response = await fetch(
        //     'http://43.229.254.22:6000/v1/api/antrian/signin',
        //     requestOptions
        // );
        const response = await LoginApi.post(
            '/v1/api/antrian/signin',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        // if (response.data.data !== null) {
        //     localStorage.setItem(
        //         '@user_dashboard_ptsp',
        //         JSON.stringify(response.data.data)
        //     );
        // }
        console.log('res awal login', response);
        return Promise.resolve(response);
    } catch (error) {
        console.log('error awal handler login', error);
        return Promise.reject(error);
    }
};
