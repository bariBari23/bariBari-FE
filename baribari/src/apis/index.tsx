import axios from 'axios';
import { getToken, isTokenExpired, refreshToken } from './token';
import { getAccessToken, removeAccessToken } from './cookie';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BARIBARI_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // accessToken을 가져옵니다.
        const accessToken = getAccessToken();

        // accessToken이 존재하고 만료되지 않은 경우 헤더에 추가합니다.
        if (accessToken && !isTokenExpired()) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            console.log(accessToken);
        }

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
            if (isTokenExpired()) {
                await refreshToken(); // 토큰 갱신
                const newAccessToken = getAccessToken();
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios.request(error.config); // 갱신된 토큰으로 다시 요청
            } else {
                removeAccessToken(); // 만료된 토큰을 삭제하여 로그인 상태를 해제합니다.
            }
        }

        return Promise.reject(error);
    },
);
