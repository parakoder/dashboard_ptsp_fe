import { HandlerAPI } from '../HandlerAPI';

export const RunningHandler = async () => {
    try {
        const response = await HandlerAPI('/running', 'get');
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
