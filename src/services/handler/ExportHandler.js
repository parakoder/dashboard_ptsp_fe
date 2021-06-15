import { HandlerAPI } from '../../services/HandlerAPI';

export const ExportData = async (start, end) => {
    try {
        const response = await HandlerAPI(
            `${process.env.REACT_APP_ROOT_API_ADMIN}/v1/api/antrian/export`,
            'get',
            {
                start,
                end,
            },
            null,
            { Accept: 'application/vnd.ms-excel' },
            'blob'
        );
        console.log('res awal export data', response);
        return Promise.resolve(response);
    } catch (error) {
        console.log('error awal export data', error);
        return Promise.reject(error);
    }
};
