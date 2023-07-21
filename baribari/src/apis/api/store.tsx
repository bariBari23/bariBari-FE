import { axiosInstance } from '..';

// 상점 정보 조회 api
export async function getStoreInfo(storeId: number) {
    try {
        const response = await axiosInstance.get(`/v1/store/${storeId}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 좋아요 한 상점 리스트 보여주는 api
export async function getLikedStoreInfo() {
    try {
        const response = await axiosInstance.get(`/v1/store/like/`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 상점 좋아요 누르기 api
export async function clickStoreLike(storeId: number) {
    try {
        const response = await axiosInstance.post(`/v1/store/like/${storeId}`, {});
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 상점 좋아요 취소 api
export async function cancelStoreLike(storeId: number) {
    try {
        const response = await axiosInstance.delete(`/v1/store/like/${storeId}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
