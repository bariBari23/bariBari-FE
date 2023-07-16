import { axiosInstance } from '..';

// 주문 api
export async function createOrder() {
    try {
        const response = await axiosInstance.post(`/v1/orders`, {});
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 주문 중에 품목 하나 취소 api
export async function cancelSingleOrder(orderId: number, orderItemId: number) {
    try {
        await axiosInstance.delete(`/v1/orders/${orderId}/${orderItemId}`);
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 해당 주문 취소 api
export async function cancelOrder(orderId: number) {
    try {
        await axiosInstance.delete(`/v1/orders/${orderId}`);
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 주문 조회 api
export async function getOrder() {
    try {
        const response = await axiosInstance.get(`/v1/orderItem`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
