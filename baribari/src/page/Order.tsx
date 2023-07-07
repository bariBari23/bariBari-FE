import styled from 'styled-components';
import TopBar from '../component/TopBar';
import FoodDetailBox from '../component/StoreDetail/FoodDetailBox';
import { useState, useEffect } from 'react';
import StoreDetailBox from '../component/StoreDetail/StoreDetailBox';
import ReviewBox from '../component/StoreDetail/ReviewBox';

export default function Order() {
    const [active, setActive] = useState('반찬 상세');
    const changeDetailBox = (value: string) => {
        setActive(value);
    };
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
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', paddingBottom: '20px' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>8:00 ~ 9:00</TimeBox>
                            </div>
                            <div style={{ display: 'flex', paddingBottom: '20px' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>9:00 ~ 10:00</TimeBox>
                            </div>
                            <div style={{ display: 'flex', paddingBottom: '20px' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>10:00 ~ 11:00</TimeBox>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>11:00 ~ 12:00</TimeBox>
                            </div>
                        </div>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', paddingBottom: '20px' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>12:00 ~ 13:00</TimeBox>
                            </div>
                            <div style={{ display: 'flex', paddingBottom: '20px' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>13:00 ~ 14:00</TimeBox>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <CheckBox type="radio" name="time" value="8" />
                                <TimeBox>14:00 ~ 15:00</TimeBox>
                            </div>
                        </div>
                    </div>
                </InfoBox>
                <InfoBox style={{ height: '92px', padding: '24px 16px 24px 16px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', lineHeight: '28px', marginBottom: '20px' }}>
                        결제 수단
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <CheckBox type="radio" name="pay" value="8" />
                            <TimeBox>카카오페이</TimeBox>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <CheckBox type="radio" name="pay" value="8" />
                            <TimeBox>무통장 입금</TimeBox>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <CheckBox type="radio" name="pay" value="8" />
                            <TimeBox>현장 결제</TimeBox>
                        </div>
                    </div>
                </InfoBox>
                <InfoBox style={{ paddingBottom: '30px' }}></InfoBox>
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
    width: calc(100% - 64px);
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
