import http from '../axios';
import { backEndPoint } from '../utils/common';

export const checkLogin = async (email, pwd) => {
    return await http.post(backEndPoint.singIn, {
        email: email,
        password: pwd,
    });
};

export const register = async (userData) => {
    return await http.post(backEndPoint.register, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
    });
};
