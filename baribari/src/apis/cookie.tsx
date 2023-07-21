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

export const getAccessToken = (): string | undefined => {
    return cookies.get('access_token');
};

export const removeAccessToken = (): void => {
    cookies.remove('access_token', { sameSite: 'strict', path: '/' });
};
