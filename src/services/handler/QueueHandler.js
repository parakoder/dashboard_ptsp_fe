import { HandlerAPI } from '../HandlerAPI';

export const QueueHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/queue-table`,
            'get',
            { idPelayanan }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
