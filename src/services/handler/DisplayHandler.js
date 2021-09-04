import { HandlerAPI } from '../HandlerAPI';

export const DisplayHandler = async () => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_DISPLAY}/v1/api/display`,
            'get'
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const CallDisplayHandler = async () => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_BRIDGE}/v1/api/antrian/call-display`,
            'get'
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
