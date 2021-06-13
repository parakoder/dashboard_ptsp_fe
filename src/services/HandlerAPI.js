import axios from 'axios';

const instance = axios;

instance.interceptors.request.use(
    async (config) => {
        var datUser = JSON.parse(localStorage.getItem('@user_dashboard_ptsp'));

        if (datUser !== null) {
            config.headers.authorization = `Bearer ${datUser.accessToken}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export const HandlerAPI = async (
    url,
    method,
    params,
    data,
    headers,
    responType,
    cancelToken
) => {
    const service = await instance({
        url: url,
        method: method,
        params: params,
        data: data,
        headers: headers,
        responseType: responType,
        cancelToken: cancelToken,
    });

    return service;
};
