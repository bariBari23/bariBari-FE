export interface LoginData {
    email: string;
    password: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    total: number;
    quantity: number;
    dosirakMainImageUrl: string;
    storeName: string;
    storeMainImageUrl: string;
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

export interface ContentContainerProps {
    keyword: string | null;
    filterLiked: boolean;
    sort: string | null;
    setRefresh: boolean;
}

export interface DosirakItem {
    id: number;
    banchanList: string[];
    mainImageUrl: string;
    name: string;
    price: number;
    stock: number;
    storeName: string;
    likedStore: boolean;
}

export interface HeartListProps {
    filterLiked: boolean;
    onFilterLikedChange: (value: boolean) => void;
}
