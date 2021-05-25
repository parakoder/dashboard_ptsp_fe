import { HandlerAPI } from '../HandlerAPI';

export const DisplayHandler = async () => {
    try {
        const response = await HandlerAPI('/display', 'get');
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
