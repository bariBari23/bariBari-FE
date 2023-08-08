import { axiosInstance } from '..';

// 파일 저장 url 가져오는 api
export async function getFileUrl() {
    try {
        const response = await axiosInstance.get(`/v1/file/presign`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
