import { HandlerAPI } from '../HandlerAPI';

export const QueueHandler = async (loket) => {
    try {
        const response = await HandlerAPI('/queue', 'get', {
            loket,
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
