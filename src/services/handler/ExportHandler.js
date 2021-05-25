import { HandlerAPI } from '../HandlerAPI';

export const ExportHandler = async (start, end) => {
    try {
        const response = await HandlerAPI('/export', 'get', {
            start,
            end,
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};
