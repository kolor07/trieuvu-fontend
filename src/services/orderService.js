import api from '../httpHelper/api';
import { backEndPoint } from '../utils/common';

export const exeOrder = async (data) => {
    console.log('exeOrder...', data);
    return await api.post(backEndPoint.order, JSON.stringify(data));
};
