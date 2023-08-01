import axios from 'axios';
import { getToken, isTokenExpired, refreshToken } from './token';
import {
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken,
} from './cookie';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BARIBARI_URL,
    timeout: 10000,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // accessToken을 가져옵니다.
        const accessToken = getAccessToken();
        // accessToken이 존재하고 만료되지 않은 경우 헤더에 추가합니다.
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

const MAX_RETRY_COUNT = 3;
let retryCount = 0;

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 404) {
            console.log('404 에러 페이지로 넘어가야 함!');
        }

        return response;
    },
    async function (error) {
        const {
            config,
            response: { status },
        } = error;
        console.log('에러입니다', status);

        if (status === 401) {
            if (retryCount < MAX_RETRY_COUNT) {
                retryCount++;
                const originalRequest = config;
                const refreshTokenValue = getRefreshToken(); // 쿠키에서 refresh_token을 얻어옴
                console.log('리프레시 토큰 유무', refreshTokenValue);

                if (refreshTokenValue) {
                    try {
                        const { data } = await axiosInstance.get('/v1/auth/refresh');
                        console.log('새로운 accessToken 발급', data);

                        const { access_token } = data;
                        setAccessToken(access_token); // 새로운 access token을 쿠키에 저장

                        // 요청을 보낼 때 헤더에 새로운 access token을 추가
                        originalRequest.headers.authorization = `Bearer ${access_token}`;
                        console.log('여기까지 잘 왔다!!');

                        retryCount = 0; // 재시도 횟수 초기화
                        return axiosInstance(originalRequest); // 원래 요청을 재시도하고 응답 반환
                    } catch (e) {
                        console.log('리프레시 토큰 갱신 실패');
                        console.log(e);

                        // 리프레시 토큰이 만료된 경우
                        removeAccessToken();
                        removeRefreshToken();
                        alert('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
                    }
                } else {
                    console.log('리프레시 토큰이 쿠키에 없음');
                    // 여기서 에러 처리를 수행
                    // 예: removeAccessToken(), removeRefreshToken(), alert 등
                }
            } else {
                console.log('재시도 횟수 초과');
                // 여기서 에러 처리를 수행
                // 예: removeAccessToken(), removeRefreshToken(), alert 등
            }
        }

        return Promise.reject(error);
    },
);
// const MAX_RETRY_COUNT = 3;
// let retryCount = 0;

// axiosInstance.interceptors.response.use(
//     (response) => {
//         if (response.status === 404) {
//             console.log('404 에러 페이지로 넘어가야 함!');
//         }

//         return response;
//     },
//     async function (error) {
//         const {
//             config,
//             response: { status },
//         } = error;
//         console.log('에러입니다', status);
//         if (status === 401) {
//             if (retryCount < MAX_RETRY_COUNT) {
//                 retryCount++;
//                 const originalRequest = config;
//                 const refreshTokenValue = getRefreshToken(); // 쿠키에서 refresh_token을 얻어옴
//                 console.log('욥일넝', refreshTokenValue);
//                 if (refreshTokenValue) {
//                     try {
//                         const { data } = await axiosInstance.get('/v1/auth/refresh');
//                         console.log('야야양', data);
//                         // 서버로부터 받은 data 객체에 refresh_token 정보가 있다고 가정
//                         const { access_token } = data;

//                         setAccessToken(access_token); // 새로운 access token을 쿠키에 저장
//                         console.log('access 토큰 받았당', access_token);
//                         // 요청을 보낼 때 헤더에 새로운 access token을 추가
//                         originalRequest.headers.authorization = `Bearer ${access_token}`;
//                         console.log('여기까지 잘 왔다!!');
//                         retryCount = 0; // 재시도 횟수 초기화
//                         return axiosInstance(originalRequest); // 원래 요청을 재시도하고 응답 반환
//                     } catch (e) {
//                         console.log('리프레시 토큰 에러');
//                         console.log(e);
//                         removeAccessToken();
//                         removeRefreshToken();
//                         alert('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
//                     }
//                 } else {
//                     console.log('리프레시 토큰이 쿠키에 없음');
//                     // 여기서 에러 처리를 수행
//                     // 예: removeAccessToken(), removeRefreshToken(), alert 등
//                 }
//             } else {
//                 console.log('재시도 횟수 초과');
//                 // 여기서 에러 처리를 수행
//                 // 예: removeAccessToken(), removeRefreshToken(), alert 등
//             }
//         }

//         return Promise.reject(error);
//     },
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//         if (response.status === 404) {
//             console.log('404 에러 페이지로 넘어가야 함!');
//         }

//         return response;
//     },
//     async function (error) {
//         const {
//             config,
//             response: { status },
//         } = error;
//         console.log('에러입니다', status);
//         if (status === 401) {
//             console.log('엥');
//             const originalRequest = config;
//             const refreshTokenValue = getRefreshToken(); // 쿠키에서 refresh_token을 얻어옴
//             console.log('욥일넝', refreshTokenValue);
//             try {
//                 const { data } = await axiosInstance.get('/v1/auth/refresh');
//                 console.log('야야양', data);
//                 // 서버로부터 받은 data 객체에 refresh_token 정보가 있다고 가정
//                 const { access_token, refresh_token } = data;

//                 setAccessToken(access_token); // 새로운 access token을 쿠키에 저장
//                 setRefreshToken(refresh_token); // 새로운 refresh token을 쿠키에 저장

//                 // 요청을 보낼 때 헤더에 새로운 access token을 추가
//                 originalRequest.headers.authorization = `Bearer ${access_token}`;
//                 console.log('여기까지 잘 왔다!!');
//                 return axiosInstance(originalRequest); // 원래 요청을 재시도하고 응답 반환
//             } catch (e) {
//                 console.log('리프레시 토큰 에러');
//                 console.log(e);
//                 removeAccessToken();
//                 removeRefreshToken();
//                 alert('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
//             }
//         }

//         return Promise.reject(error);
//     },
// );
