import axios from 'axios';
import { HandlerAPI } from '../HandlerAPI';

export const ProfileHandler = async (userName) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/profile`,
            'get',
            { userName }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
