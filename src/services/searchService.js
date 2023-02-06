import api from '../httpHelper/api';
import { backEndPoint } from '../utils/common';

export const search = async (data, page) => {
    const endPoint = `${data}/page/${page}`;

    return api.get(backEndPoint.search + endPoint);
};
