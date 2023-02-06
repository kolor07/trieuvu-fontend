import axios from 'axios';
import _ from 'lodash';
// import config from './config';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },

    // withCredentials: true
});

instance.interceptors.response.use((response) => {
    return response;
});

export default instance;
