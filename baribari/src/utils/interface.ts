export interface LoginData {
    email: string;
    password: string;
}

export interface JoinData {
    name: string;
    password: string;
    phone: string;
    email: string;
}

export interface StoreLikedItem {
    storeId: number;
    storeName: string;
}
