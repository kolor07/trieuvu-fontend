import api from '../httpHelper/api';
import { backEndPoint } from '../utils/common';
import provinces from '../utils/provinces';
import districts from '../utils/districts';
import wards from '../utils/wards';

export const checkOut = (products) => {
    api.post(backEndPoint.checkOut, { cart: products });
};

export const getProvinces = () => {
    return provinces;
};
export const getDistrictsByProvinceCode = (provinceCode) => {
    return districts.filter((item) => item.province_code === +provinceCode);
};
export const getWardsByDistrictCode = (districtCode) => {
    return wards.filter((item) => item.district_code === +districtCode);
};
