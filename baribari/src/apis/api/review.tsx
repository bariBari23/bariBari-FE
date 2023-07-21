import { axiosInstance } from '..';
import { getAccessToken } from '../cookie';

// 리뷰 작성 api
export async function postReview(data: object) {
    try {
        const token = getAccessToken();
        console.log(token);
        const response = await axiosInstance.post(`/v1/review`, data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 상점 리뷰 전체 조회 api
export async function getReview(storeId: number) {
    try {
        const response = await axiosInstance.get(`/v1/review/store/${storeId}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
