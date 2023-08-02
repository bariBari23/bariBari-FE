import { atom } from 'recoil';
import { IStoreInfoView } from './interface';

export const storeInfo = atom<IStoreInfoView>({
    key: 'storeInfo',
    default: {
        storeId: 0,
        meanRating: 0.0,
    },
});
