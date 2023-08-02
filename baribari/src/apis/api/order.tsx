import { axiosInstance } from '..';
import { getAccessToken } from '../cookie';
interface OrderData {
    orderDemand: string;
    orderPhoneNumber: string;
    estimatedPickUpTime: string;
    payMethod: string;
}

// 주문 api
export async function createOrder(orderData: OrderData) {
    try {
        const modifiedOrderData = {
            orderDemand: '맛있게해주세요요',
            orderPhoneNumber: '5555',
            estimatedPickUpTime: '8:00 ~ 9:00',
            payMethod: 'CARD',
        };

        const response = await axiosInstance.post(`/v1/order`, orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
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
export async function getOrder(orderList: object) {
    try {
        const response = await axiosInstance.get(`/v1/order`, orderList);
        return response.data.data.orderList;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 주문 조회 api
export async function getOrderItems(orderItems: object) {
    try {
        const response = await axiosInstance.get(`/v1/orderItem`, orderItems);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
