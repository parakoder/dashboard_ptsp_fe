import { HandlerAPI } from '../HandlerAPI';

export const RunningHandler = async () => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_DISPLAY}/v1/api/running`
        );

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
