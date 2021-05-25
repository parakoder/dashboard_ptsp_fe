import { HandlerAPI } from '../HandlerAPI';

export const ProfileHandler = async () => {
    try {
        const response = await HandlerAPI('/profile', 'get');
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
