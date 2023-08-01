import { setAccessToken, getAccessToken, removeAccessToken, removeRefreshToken } from './cookie';
import { axiosInstance } from '.';

export function getToken(): string | undefined {
    const token = getAccessToken();
    if (!token) {
        return undefined;
    }
    return token;
}
// 토큰의 만료 여부를 확인하는 함수
export function isTokenExpired(): boolean {
    const token = getToken();
    if (!token) {
        return true; // 토큰이 없으면 만료된 것으로 간주합니다.
    }
    // 토큰의 만료 시간과 현재 시간을 비교하여 만료 여부를 판단합니다.
    // 실제로는 토큰을 디코딩하여 만료 시간을 확인해야 합니다.
    const expirationTime = getExpirationTimeFromToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime === undefined || expirationTime < currentTime;
}
// 토큰을 갱신하는 함수
// export async function refreshToken(): Promise<void> {
//     try {
//         console.log('아이스크림2');
//         // 토큰 갱신에 필요한 요청을 서버에 보내고 새로운 토큰을 받아옵니다.
//         const newToken = await fetchTokenRefreshFromServer();
//         console.log('아이스크림');
//         // 새로운 토큰을 쿠키에 저장합니다.
//         setAccessToken(newToken);
//     } catch (error) {
//         console.log('토큰 갱신에 실패했습니다욧:', error);
//         removeAccessToken(); // 토큰 갱신 실패 시, 로그인 상태를 해제할 수 있습니다.
//         throw error;
//     }
// }

function getExpirationTimeFromToken(token: string): number {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const { exp } = decodedPayload;
    console.log('expp', exp);
    const expirationDate = new Date(exp * 1000);
    console.log(expirationDate);
    return exp;
}

export async function fetchTokenRefreshFromServer(): Promise<string> {
    // 서버로 토큰 갱신 요청을 보내고 새로운 토큰을 받아옵니다.
    try {
        console.log('뭔뎅,미');
        const response = await axiosInstance.get('/v1/auth/refresh');
        console.log('리프레시토큰쓰', response);
        return response.data.data.accessToken;
    } catch (error) {
        console.log('토큰 갱신에 실패했습니다:', error);
        throw error;
    }
}

// 토큰을 갱신하는 함수
export async function refreshToken(): Promise<void> {
    try {
        console.log('아이스크림2');
        const newToken = await fetchTokenRefreshFromServer();
        console.log('아이스크림');
        setAccessToken(newToken);
    } catch (error) {
        console.log('토큰 갱신에 실패했습니다욧:', error);

        // 리프레시 토큰이 만료된 경우
        removeAccessToken();
        removeRefreshToken();
        alert('로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');
        throw error;
    }
}
