import { axiosInstance } from '..';

// 유저와 해당 가게와의 거리 계산 api
export async function userStoreDistance(storeId: number) {
    try {
        const response = await axiosInstance.get(`/v1/distance/${storeId}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 모든 가게와의 거리 api
export async function allStoreDistance() {
    try {
        const response = await axiosInstance.get(`/v1/distance`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

//유저 거리 수정하기 api
export async function createUserLocation(latitude: number, longitude: number) {
    try {
        const response = await axiosInstance.put(`/v1/my/location`, {
            latitude: latitude,
            longitude: longitude,
        });
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 유저 위치 받는 api
export async function getUserLocation() {
    try {
        const response = await axiosInstance.get(`/v1/my/location`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
