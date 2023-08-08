import { axiosInstance } from '..';

// 도시락 id로 검색 api
export async function searchById(id: number | null) {
    try {
        const endpoint = `/v1/dosirak/${id}`;
        const response = await axiosInstance.get(`/v1/dosirak/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 도시락 query로 검색 api
export async function searchByQuery(keyword: string, filterLiked: boolean, sort: string) {
    try {
        const response = await axiosInstance.get(
            `/v1/dosirak/query/?keyword=${keyword}&filterLiked=${filterLiked}&sort=${sort}`,
        );
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
