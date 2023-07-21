import { axiosInstance } from '..';

interface CartItem {
    // 카트에 담긴 아이템의 인터페이스 정의
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// 카트에 있는 목록을 불러올 수 있는 api
export async function getCartItems(cartItems: object) {
    try {
        const response = await axiosInstance.get('/v1/cart', cartItems);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 모든 카트 아이템을 삭제할 수 있는 api
export async function deleteAllCartItem(): Promise<void> {
    try {
        await axiosInstance.delete(`/v1/cart`);
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 카트 아이템 한 개를 삭제할 수 있는 api
export async function deleteSingleCartItem(itemId: number): Promise<void> {
    try {
        await axiosInstance.delete(`/v1/cart/${itemId}`);
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 카트에 품목을 추가할 수 있는 api
export async function addCartItem(item: CartItem): Promise<void> {
    try {
        await axiosInstance.post('/v1/cart', item);
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

// 카트에 아이템을 변경할 수 있는 api
export async function updateCartItem(itemId: number, quantity: number, updatedItem: CartItem): Promise<void> {
    try {
        await axiosInstance.put(`/v1/cart/${itemId}/${quantity}`, updatedItem);
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}
