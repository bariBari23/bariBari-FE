import { axiosInstance } from '..';
import { getRefreshToken, removeAccessToken, setAccessToken, setRefreshToken } from '../cookie';

export async function loginUser(email: string, password: string) {
    try {
        // 로그인 API 호출
        const response = await axiosInstance.post(
            'https://baribari.store/api/v1/auth/login',
            {
                email,
                password,
            },
            {
                withCredentials: true, // withCredentials 옵션 추가
            },
        );
        console.log('response', response.headers);
        const { accessToken } = response.data.data;
        console.log('얍', response.data.data);
        // 토큰을 쿠키에 저장
        setAccessToken(accessToken);
        // const setCookieHeader = response.headers['connection'];
        // console.log('Set-Cookie 헤더:', setCookieHeader);

        // // 쿠키 값을 파싱하여 refreshToken 추출
        // let refreshToken;
        // if (setCookieHeader) {
        //     for (const cookie of setCookieHeader) {
        //         const cookieValue = cookie.split(';')[0].trim();
        //         const [name, value] = cookieValue.split('=');
        //         if (name === 'refresh_token') {
        //             refreshToken = value;
        //             break;
        //         }
        //     }
        // }

        // console.log('이때 끝남', getExpirationTimeFromToken(accessToken));
        return response.data; // 필요한 데이터 반환
    } catch (error) {
        // 에러 처리
        console.log('Error:', error);
        removeAccessToken();

        throw error;
    }
}

export async function registerUser(nickname: string, email: string, password: string, phone: string) {
    try {
        // 회원가입 API 호출
        const response = await axiosInstance.post('https://baribari.store/api/v1/signup', {
            nickname,
            email,
            password,
            phone,
        });

        return response.data; // 필요한 데이터 반환
    } catch (error) {
        // 에러 처리
        console.log('Error:', error);
        throw error;
    }
}

export async function getUserInfo() {
    try {
        // 회원가입 API 호출
        const response = await axiosInstance.get('/v1/auth/info', {});
        return response.data; // 필요한 데이터 반환
    } catch (error) {
        // 에러 처리
        console.log('Error:', error);
        throw error;
    }
}
function getExpirationTimeFromToken(accessToken: any): any {
    throw new Error('Function not implemented.');
}
