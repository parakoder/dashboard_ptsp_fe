import { HandlerAPI } from '../HandlerAPI';

export const CardHandler = async (idPelayanan) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API}/v1/api/antrian/card`,
            'get',
            {
                idPelayanan,
            }
        );
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
