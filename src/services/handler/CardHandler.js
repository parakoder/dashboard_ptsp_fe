import { HandlerAPI } from '../HandlerAPI';

export const CardHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/card`,
            'get',
            { idPelayanan }
        );
        return Promise.resolve(response.data);
    } catch (error) {
        console.log('err', error);
        return Promise.reject(error);
    }
};
