import { HandlerAPI } from '../HandlerAPI';

export const CallHandler = async (loket) => {
    try {
        const response = await HandlerAPI('/call', 'get', {
            loket,
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const NextHandler = async (loket) => {
    try {
        const response = await HandlerAPI('/next', 'put', {
            loket,
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
