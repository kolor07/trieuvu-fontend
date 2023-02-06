import api from '../httpHelper/api';
import { backEndPoint, tabType } from '../utils/common';

export const getNewArrival = async (type, page) => {
    const user = localStorage.getItem('user');
    if (!user) {
        if (type === tabType.newArrival) {
            return await api.get(backEndPoint.newArrival + page);
        } else if (type === tabType.bestSale) {
            return await api.get(backEndPoint.bestSale + page);
        } else {
            return await api.get(backEndPoint.bestVote + page);
        }
    } else {
        if (type === tabType.newArrival) {
            console.log('newArrival auth');
            return await api.get(backEndPoint.newArrivalAuth + page);
        } else if (type === tabType.bestSale) {
            return await api.get(backEndPoint.bestSaleAuth + page);
        } else {
            return await api.get(backEndPoint.bestVoteAuth + page);
        }
    }
};

export const getProductByCategoryId = async (categoryId, page) => {
    const user = localStorage.getItem('user');
    const endPoint = `${categoryId}/page/${page}`;
    console.log('>>> endPoint.....', endPoint);
    if (!user) {
        return api.get(backEndPoint.productByCategoryId + endPoint);
    } else {
        return api.get(backEndPoint.productAuthByCategoryId + endPoint);
    }
};

export const getProductById = (id) => {
    const user = localStorage.getItem('user');
    console.log('path back end', backEndPoint.productDetail + id);
    if (!user) {
        return api.get(backEndPoint.productDetail + id);
    } else {
        return api.get(backEndPoint.productDetailAuth + id);
    }
};
