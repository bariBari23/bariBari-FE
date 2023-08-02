import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setAccessToken = (accessToken: string): void => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    cookies.set('access_token', accessToken, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(expireDate),
    });
};

export const setRefreshToken = (refreshToken: string): void => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 14);

    cookies.set('refresh_token', refreshToken, {
        sameSite: 'none',
        path: '/',
        httpOnly: false,
        expires: new Date(expireDate),
    });
};

export const getAccessToken = (): string | undefined => {
    return cookies.get('access_token');
};

export const getRefreshToken = (): string | undefined => {
    console.log('refresh_token', cookies.get('refresh_token'));
    return cookies.get('refresh_token');
};

export const removeAccessToken = (): void => {
    cookies.remove('access_token', { sameSite: 'strict', path: '/' });
};

export const removeRefreshToken = (): void => {
    cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
