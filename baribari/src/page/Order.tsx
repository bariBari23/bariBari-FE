import styled from 'styled-components';
import Header from '../component/Header';
import { SetStateAction, useEffect, useReducer, useState } from 'react';
import CheckIcon from '../component/CheckIcon';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../apis/api/order';
import { useLocation } from 'react-router-dom';
import { CartItem } from '../utils/interface';
import { deleteAllCartItem } from '../apis/api/cart';

const timeSlots = [
    '8:00 ~ 9:00',
    '9:00 ~ 10:00',
    '10:00 ~ 11:00',
    '11:00 ~ 12:00',
    '12:00 ~ 13:00',
    '13:00 ~ 14:00',
    '14:00 ~ 15:00',
];
const paymentMethodMap: { [key: string]: string } = {
    CASH: '무통장 입금',
    CARD: '현장 결제',
};
const paymentMethods = ['CASH', 'CARD'];

type State = {
    time: string;
    pay: string;
};

type Action = { type: 'SET_TIME'; time: string } | { type: 'SET_PAY'; pay: string };

export default function Order() {
    const location = useLocation();
    const { preCartItems } = location.state || {};
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sum, setSum] = useState(0);
    console.log('여기' + preCartItems);
    const cartItems = preCartItems.map((item: CartItem) => {
        const total = item.quantity * item.price;
        return { ...item, total };
    });

    useEffect(() => {
        // cartItems 배열에서 item.total 값을 누적하여 주문 총 금액 계산
        const total = cartItems.reduce((acc: number, item: CartItem) => acc + item.total, 0);
        setSum(total); // 계산된 총 금액을 sum 변수에 설정
    }, []);

    const handleOrderClick = async () => {
        try {
            const orderData = {
                orderDemand: '맛있게해주세요요',
                orderPhoneNumber: phoneNumber,
                estimatedPickUpTime: state.time,
                payMethod: state.pay,
            };
            console.log(orderData);

            const response = await createOrder(orderData);
            await deleteAllCartItem();
            console.log(response);
            alert('예약이 완료되었습니다.');
            navigate('/orderlist');
        } catch (error) {
            console.log('Order failed: ', error);
        }
    };

    const [state, dispatch] = useReducer(
        (state: State, action: Action) => {
            switch (action.type) {
                case 'SET_TIME':
                    return { ...state, time: action.time };
                case 'SET_PAY':
                    return { ...state, pay: action.pay };
                default:
                    throw new Error();
            }
        },
        {
            time: '',
            pay: '',
        },
    );
    return (
        <Container>
            <AddBtn onClick={handleOrderClick}>{sum.toLocaleString()}원 결제하기</AddBtn>
            <Header showPageName={true} pageTitle={'주문하기'} showSearchBar={false} />
            <InsideBox>
                <InfoBox>
                    <TitleText>주문자 정보</TitleText>
                    <PhoneInput
                        placeholder="휴대폰 번호를 입력해주세요"
                        onChange={(e: { target: { value: SetStateAction<string> } }) => setPhoneNumber(e.target.value)}
                    />
                </InfoBox>
                <InfoBox style={{ height: '201px', padding: '24px 16px 24px 16px' }}>
                    <TitleText>픽업 시간</TitleText>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            height: '192px',
                            alignItems: 'space-between',
                            paddingTop: '20px',
                            alignContent: 'space-between',
                        }}
                    >
                        {timeSlots.map((slot) => (
                            <div
                                style={{
                                    display: 'flex',
                                    paddingBottom: '20px',
                                    alignItems: 'center',
                                }}
                            >
                                <CheckIcon
                                    active={state.time === slot}
                                    onClick={() =>
                                        dispatch({
                                            type: 'SET_TIME',
                                            time: slot,
                                        })
                                    }
                                    isAll={false}
                                />
                                <TimeBox>{slot}</TimeBox>
                            </div>
                        ))}
                    </div>
                </InfoBox>
                <InfoBox style={{ padding: '28px 16px', gap: '20px' }}>
                    <TitleText>결제 수단</TitleText>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        {paymentMethods.map((method) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CheckIcon
                                    active={state.pay === method}
                                    onClick={() =>
                                        dispatch({
                                            type: 'SET_PAY',
                                            pay: method,
                                        })
                                    }
                                    isAll={false}
                                />
                                <TimeBox style={{ lineHeight: '28px', width: '95px' }}>
                                    {paymentMethodMap[method]}
                                </TimeBox>
                            </div>
                        ))}
                    </div>
                </InfoBox>

                <InfoBox style={{ padding: '24px 16px', paddingBottom: '120px', gap: '24px', marginBottom: '0' }}>
                    {cartItems.map((item: CartItem) => (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <SmallText style={{ marginRight: '20px' }}>{item.name}</SmallText>
                            <SmallText style={{ marginRight: 'auto' }}>{item.quantity}개</SmallText>
                            <SmallText style={{ marginRight: '0' }}>{item.total.toLocaleString()}원</SmallText>
                        </div>
                    ))}
                    <div
                        style={{
                            paddingTop: '16px',
                            display: 'flex',
                            flexDirection: 'row',
                            borderTop: 'solid 1px #EFEFEF',
                            alignItems: 'center',
                        }}
                    >
                        <TitleText style={{ marginRight: 'auto' }}>결제 금액</TitleText>
                        <div
                            style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                fontStyle: 'normal',
                                lineHeight: '32px',
                                marginRight: '0',
                                color: '#FF7455',
                            }}
                        >
                            {sum.toLocaleString()}원
                        </div>
                    </div>
                </InfoBox>

                <BackSquare />
            </InsideBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InsideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 91px;
    margin-bottom: 40px;
    justify-content: flex-start;
    background-color: #f9f9f9;
`;
const InfoBox = styled.div`
    display: flex;
    height: 92px;
    background-color: white;
    padding: 0 16px 20px 16px;
    margin-bottom: 14px;
    flex-direction: column;
`;

const TitleText = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
`;
const PhoneInput = styled.input`
    display: flex;
    height: 44px;
    margin-top: 20px;
    border: solid 1px #767676;
    border-radius: 8px;
    padding-left: 8px;
    color: #767676;
    font-size: 16px;
    font-weight: 600;
`;

const TimeBox = styled.div`
    display: flex;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-left: 12px;
`;

const SmallText = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #212121;
`;

const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 564px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard Variable;
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
    max-width: 600px;
    height: 96px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 5000;
`;
