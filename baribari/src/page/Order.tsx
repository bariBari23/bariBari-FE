import styled from 'styled-components';
import TopBar from '../component/TopBar';
import FoodDetailBox from '../component/StoreDetail/FoodDetailBox';
import { useState, useEffect, useReducer } from 'react';
import CheckIcon from '../component/SignUp3/CheckIcon';
import StoreDetailBox from '../component/StoreDetail/StoreDetailBox';
import ReviewBox from '../component/StoreDetail/ReviewBox';

const timeSlots = [
    '8:00 ~ 9:00',
    '9:00 ~ 10:00',
    '10:00 ~ 11:00',
    '11:00 ~ 12:00',
    '12:00 ~ 13:00',
    '13:00 ~ 14:00',
    '14:00 ~ 15:00',
];
const paymentMethods = ['무통장 입금', '현장 결제'];

type State = {
    time: string;
    pay: string;
};

type Action = { type: 'SET_TIME'; time: string } | { type: 'SET_PAY'; pay: string };

export default function Order() {
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
            <TopBar page={'결제하기'} />
            <InsideBox>
                <InfoBox>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>주문자 정보</div>
                    <PhoneInput placeholder="휴대폰 번호를 입력해주세요"></PhoneInput>
                </InfoBox>
                <InfoBox style={{ height: '201px', padding: '24px 16px 24px 16px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', lineHeight: '28px', marginBottom: '20px' }}>
                        픽업 시간
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            height: '192px',
                            alignItems: 'space-between',
                        }}
                    >
                        {timeSlots.map((slot) => (
                            <div
                                style={{
                                    display: 'flex',
                                    paddingBottom: '20px',
                                    paddingRight: '20%',
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
                    <div style={{ fontSize: '18px', fontWeight: '700', lineHeight: '28px' }}>결제 수단</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {paymentMethods.map((method) => (
                            <div style={{ display: 'flex', paddingRight: '20%', alignItems: 'center' }}>
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
                                <TimeBox style={{ lineHeight: '28px', width: '95px' }}>{method}</TimeBox>
                            </div>
                        ))}
                    </div>
                </InfoBox>
                <InfoBox style={{ padding: '24px 16px', gap: '24px' }}></InfoBox>
                <AddBtn>19,000원 결제하기</AddBtn>
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
    margin-top: 88px;
    justify-content: flex-start;
    background-color: #f9f9f9;
`;
const InfoBox = styled.div`
    display: flex;
    height: 92px;
    background-color: white;
    padding: 26px 16px 20px 16px;
    margin-bottom: 14px;
    flex-direction: column;
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
const CheckBox = styled.input`
    appearance: none;
    display: flex;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    border: solid 2px #767676;
    position: relative;
    padding-right: 12px;

    &:checked {
        background-color: #ff7455;
        border-color: #ff7455;
    }

    &:checked::before {
        content: '';
        position: absolute;
        margin: auto;
        border: solid white;
        left: 4px;
        top: 1px;
        border-width: 0 2px 2px 0;
        height: 6px;
        width: 4px;
        transform: rotate(45deg);
    }
`;
const TimeBox = styled.div`
    display: flex;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    padding-left: 12px;
`;

const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 464px;
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
