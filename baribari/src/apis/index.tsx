import axios from 'axios';
import { getToken, isTokenExpired, tokenRefresh } from './token';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BARIBARI_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getToken();

        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 404) {
            console.log('404 에러 페이지로 넘어가야 함!');
        }

        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            if (isTokenExpired()) await tokenRefresh();

            const accessToken = getToken();

            error.config.headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            };

            const response = await axios.request(error.config);
            return response;
        }
        return Promise.reject(error);
    },
);
