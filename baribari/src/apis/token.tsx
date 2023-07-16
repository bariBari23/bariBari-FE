import axios from 'axios';
import { setAccessToken, getAccessToken, removeAccessToken } from './cookie';

// 토큰을 가져오는 함수
export function getToken(): string | undefined {
    return getAccessToken(); // 예시로 쿠키에서 토큰을 가져온다고 가정합니다.
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
    return expirationTime < currentTime;
}

// 토큰을 갱신하는 함수
export async function tokenRefresh(): Promise<void> {
    try {
        // 토큰 갱신에 필요한 요청을 서버에 보내고 새로운 토큰을 받아옵니다.
        const newToken = await fetchTokenRefreshFromServer(); // 서버로부터 새로운 토큰을 받아온다고 가정합니다.
        setAccessToken(newToken); // 예시로 쿠키에 새로운 토큰을 저장합니다.
    } catch (error) {
        console.log('토큰 갱신에 실패했습니다:', error);
        throw error;
    }
}

// 토큰에서 만료 시간을 추출하는 함수 (예시용으로 간단하게 구현)
function getExpirationTimeFromToken(token: string): number {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const { exp } = JSON.parse(decodedPayload);
    return exp;
}

// 서버로부터 토큰 갱신 요청을 보내는 함수 (예시용으로 비동기로 처리)
async function fetchTokenRefreshFromServer(): Promise<string> {
    // 서버로 토큰 갱신 요청을 보내고 새로운 토큰을 받아옵니다.
    // 예를 들어, axios 또는 fetch를 사용하여 요청을 보낼 수 있습니다.
    const response = await axios.post('/refresh-token');
    return response.data.accessToken; // 새로운 토큰을 반환합니다.
}
