import api from '../httpHelper/api';
import * as tokenService from '../services/tokenService';
import { backEndPoint } from '../utils/common';

export const login = async (email, password) => {
    return await api.post(backEndPoint.singIn, { email: email, password: password });
};

export const logOut = () => {
    tokenService.removeUser();
};

export const register = async (userData) => {
    return await api.post(backEndPoint.signUp, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
    });
};

export const getCurrentUser = () => {
    return tokenService.getUser();
};
