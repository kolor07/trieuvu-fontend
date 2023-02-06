import axios from 'axios';
import * as tokenService from '../services/tokenService';
import { backEndPoint } from '../utils/common';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'content-type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = tokenService.getLocalAccessToken();
        console.log('token ....', token);
        if (token) {
            // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            config.headers['authorization'] = 'Bearer ' + token; // for Node.js Express back-end
        }
        // config.headers['Authorization'] =
        //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcxMDI2ODM5LCJleHAiOjE2NzEwMzA0Mzl9.Qia6Q9ckAwbUWT-VNxrj2wJb1cElOqoahM7hyEMdtyg';
        console.log('request config ....', config.headers);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);
instance.interceptors.response.use(
    (res) => {
        console.log('interceptors ', res);
        return res;
    },
    async (err) => {
        // console.log('im here', err);
        const originalConfig = err.config;
        console.log('err.config.url', err.config.url);
        console.log('err.response', err.response);
        if (originalConfig.url !== backEndPoint.singIn && originalConfig.url !== backEndPoint.signUp && err.response) {
            // access token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post(backEndPoint.refreshToken, {
                        refreshToken: tokenService.getLocalRefreshToken(),
                    });

                    console.log('re-get access token ...', rs);
                    const { accessToken } = rs.data.data;
                    console.log('re-get access token ...', accessToken);
                    tokenService.updateAccessToken(accessToken);
                    return instance(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        } else {
            // console.clear();
            return Promise.resolve(err.response);
        }
    },
);

export default instance;
