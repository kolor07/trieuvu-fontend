import http from '../httpHelper/api';
import { backEndPoint } from '../utils/common';

export const getLocalCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
};

export const setLocalCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeLocalCart = () => {
    localStorage.removeItem('cart');
};

export const getCoupon = async (coupon) => {
    const endPoint = `${coupon}`;
    return await http.get(backEndPoint.coupon + endPoint, {
        coupon: coupon,
    });
};
