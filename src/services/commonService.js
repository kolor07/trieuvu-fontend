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

export const getAddress = (provinceId, districtId, wardId) => {
    const province = provinces.find((item) => item.code === provinceId);
    const district = districts.find((item) => item.code === districtId);
    const ward = wards.find((item) => item.code === wardId);

    return ` ${ward.name}  , ${district.name} , ${province.name} `;
};

export const getProvinceNameById = (provinceId) => {
    return provinces.find((item) => item.code === +provinceId)?.name;
};

export const getDistrictNameById = (districtId) => {
    return districts.find((item) => item.code === +districtId).name;
};

export const getWardById = (wardId) => {
    return wards.find((item) => item.code === +wardId).name;
};
