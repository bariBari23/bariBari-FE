import { atom } from 'recoil';

export const keywordsState = atom({
    key: 'keywordsState',
    default: '',
});
export const userAddressState = atom({
    key: 'userAddressState',
    default: '서울 서대문구 이화여대길 52',
});
export const storeAddressState = atom({
    key: 'storeAddressState',
    default: [],
});

export const currentPageState = atom<string>({
    key: 'currentpage',
    default: 'home',
});
