import axios from 'axios';
import { provinceApiUrl } from '../utils/common';

const provinceApi = axios.create({
    baseURL: provinceApiUrl.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

provinceApi.interceptors.response.use((response) => {
    return response;
});

export default provinceApi;
