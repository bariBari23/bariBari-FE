import Header from '../component/Header';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { ReactComponent as XIcon } from '../assets/xIcon.svg';
import { useNavigate } from 'react-router-dom';
import { deleteSingleCartItem, getCartItems, updateCartItem } from '../apis/api/cart';
import { useState, useEffect } from 'react';
import { CartItem } from '../utils/interface';

export default function Cart() {
    const navigate = useNavigate();
    const { data: cartItems, isLoading, error } = useQuery('cartItems', getCartItems);
    const [cartItemsState, setCartItemsState] = useState<CartItem[]>([]);

    useEffect(() => {
        if (cartItems?.data?.items) {
            const updatedItems = cartItems.data.items.map((item: CartItem) => ({ ...item, quantity: 1 }));
            console.log(updatedItems);
            setCartItemsState(updatedItems);
        }
    }, [cartItems]);

    if (error) {
        return <div>An error has occurred</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const increaseQuantity = (id: number) => {
        setCartItemsState((prevState) =>
            prevState.map((item) => {
                if (item.id === id && item.quantity < 4) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            }),
        );
    };

    const decreaseQuantity = (id: number) => {
        setCartItemsState((prevState) =>
            prevState.map((item) => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }),
        );
    };
    const handleGoOrder = () => {
        cartItemsState.forEach(async (item) => {
            try {
                await updateCartItem(item.id, item.quantity, item);
            } catch (error) {
                console.error('Error updating cart item: ', error);
            }
        });
        navigate('/order', { state: { cartItems: cartItemsState } });
    };
    const deleteItem = (id: number) => {
        deleteSingleCartItem(id);
        window.location.reload();
    };

    return (
        <div style={{ width: '100%', paddingTop: '70px' }}>
            <Header showPageName={true} pageTitle="장바구니" showSearchBar={false} />
            <CartList>
                {cartItemsState.map((item: CartItem) => (
                    <>
                        <StoreInfo>
                            <StoreImg src={item.storeMainImageUrl} />
                            <span> {item.storeName}</span>
                        </StoreInfo>
                        <FoodInfo>
                            <FoodImg src={item.dosirakMainImageUrl} />
                            <FoodDetail>
                                <span
                                    style={{
                                        color: '#212121',
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                        lineHeight: '21px',
                                    }}
                                >
                                    {item.name}
                                </span>
                                <span
                                    style={{
                                        color: '#FF7455',
                                        fontSize: '24px',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                        lineHeight: '32px',
                                    }}
                                >
                                    {item.quantity * item.price}원
                                </span>
                                <FoodCount>
                                    <CountButton onClick={() => increaseQuantity(item.id)}>+</CountButton>
                                    <span>{item.quantity}</span>
                                    <CountButton onClick={() => decreaseQuantity(item.id)}>-</CountButton>
                                </FoodCount>
                            </FoodDetail>
                            <button
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    display: 'flex',
                                    alignSelf: 'flex-start',
                                    cursor: 'pointer',
                                }}
                            >
                                <XIcon onClick={() => deleteItem(item.id)} />
                            </button>
                        </FoodInfo>
                    </>
                ))}
            </CartList>
            <SubmitButton onClick={handleGoOrder}>구매하기</SubmitButton>
            <BackSquare />
        </div>
    );
}

const CartList = styled.div`
    display: flex;
    padding: 0 16px;
    flex-direction: column;
    gap: 16px;
`;
const StoreInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 11px;
    margin-top: 18px;
    color: #212121;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
`;
const StoreImg = styled.img`
    height: 29px;
    width: 29px;
    background-color: lightgrey;
    border-radius: 8px;
`;

const FoodInfo = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
`;

const FoodDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
`;

const FoodImg = styled.img`
    width: 100px;
    height: 100px;
    background-color: lightgrey;
    border-radius: 8px;
`;
const FoodCount = styled.div`
    width: 95px;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border: 1px solid #767676;
    background: #fff;
    color: #767676;
`;
const CountButton = styled.button`
    border: none;
    cursor: pointer;
`;
const SubmitButton = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 564px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;

const BackSquare = styled.div`
    width: 100%;
    max-width: 568px;
    height: 96px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 5000;
`;
