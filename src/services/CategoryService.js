import api from '../httpHelper/api';
import { backEndPoint } from '../utils/common';

export const getCategoryNameById = (categoryId) => {
    const user = localStorage.getItem('user');

    if (!user) {
        return api.get(backEndPoint.categoryById + categoryId, { id: categoryId });
    } else {
        return api.get(backEndPoint.categoryAuthById + categoryId, { id: categoryId });
    }
};
