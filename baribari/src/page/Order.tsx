import styled from 'styled-components';
import TopBar from '../component/TopBar';
import { useReducer } from 'react';
import CheckIcon from '../component/SignUp3/CheckIcon';

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
            <AddBtn>19,000원 결제하기</AddBtn>
            <TopBar page={'결제하기'} />
            <InsideBox>
                <InfoBox>
                    <TitleText>주문자 정보</TitleText>
                    <PhoneInput placeholder="휴대폰 번호를 입력해주세요"></PhoneInput>
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
                                <TimeBox style={{ lineHeight: '28px', width: '95px' }}>{method}</TimeBox>
                            </div>
                        ))}
                    </div>
                </InfoBox>
                <InfoBox style={{ padding: '24px 16px', paddingBottom: '120px', gap: '24px', marginBottom: '0' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <SmallText style={{ marginRight: '20px' }}>반찬 박스 이름</SmallText>
                        <SmallText style={{ marginRight: 'auto' }}>1개</SmallText>
                        <SmallText style={{ marginRight: '0' }}>19,000원</SmallText>
                    </div>
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
                            19,000원
                        </div>
                    </div>
                </InfoBox>
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
