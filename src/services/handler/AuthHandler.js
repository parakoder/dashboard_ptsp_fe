import LoginApi from '../LoginApi';

export const LoginHandler = async (username, password) => {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await LoginApi.post(
            '/v1/api/antrian/signin',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('res awal login', response.data);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log('error awal handler login', error.request);
        return Promise.reject(error.request);
    }
};
