import { HandlerAPI } from '../HandlerAPI';

export const ProfileHandler = async (username) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API}/v1/api/antrian/profile`,
            'get',
            {
                username,
            }
        );
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
