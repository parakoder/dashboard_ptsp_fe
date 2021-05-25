import { HandlerAPI } from '../HandlerAPI';

export const CardHandler = async (loket) => {
    try {
        const response = await HandlerAPI('/card', 'get', {
            loket,
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
