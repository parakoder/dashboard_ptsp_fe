import { HandlerAPI } from '../HandlerAPI';

export const CallHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            // `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/call`,
            `${process.env.REACT_APP_ROOT_API_BRIDGE}/v1/api/antrian/call`,
            'get',
            { idPelayanan }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const CallOfflineHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            // `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/call-offline`,
            `${process.env.REACT_APP_ROOT_API_BRIDGE}/v1/api/antrian/call-offline`,
            'get',
            { idPelayanan }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const NextHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/next`,
            'put',
            { idPelayanan }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const NextOfflineHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/next-offline`,
            'put',
            { idPelayanan }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
