import { styled } from 'styled-components';
import Header from '../component/Header';
import Navigator from '../component/Navigator';

export default function OrderList() {
    return (
        <div>
            <Header showPageName={true} pageTitle="주문 내역" showSearchBar={false} />
            <Wrapper>
                <OrderStatus>
                    {/* 백으로부터 받은 data의 주문 날짜랑 픽업 status */}
                    <p style={{ marginBottom: '8px' }}>5/16(화요일)</p>
                    <p style={{ marginBottom: '8px' }}>|</p>
                    <p style={{ marginBottom: '8px' }}>픽업 완료</p>
                </OrderStatus>
                <Separator />
                <FoodItem>
                    <FoodImg />
                    <FoodInfo>
                        {/* 백으로부터 받은 data의 반찬가게 이름, 반찬 이름, count, 가격*/}
                        <p style={{ margin: '0px' }}>반찬가게 이름</p>
                        <FoodOrderInfo>
                            <p style={{ margin: '0px' }}>반찬 이름</p>
                            <p style={{ margin: '0px' }}>1개</p>
                            <p style={{ margin: '0px' }}>8,000원</p>
                        </FoodOrderInfo>
                    </FoodInfo>
                </FoodItem>
                <ReviewButtonFirst>리뷰 쓰기</ReviewButtonFirst>
            </Wrapper>
            <Wrapper>
                <OrderStatus>
                    {/* 백으로부터 받은 data의 주문 날짜랑 픽업 status */}
                    <p>5/16(화요일)</p>
                    <p>|</p>
                    <p>픽업 완료</p>
                </OrderStatus>
                <Separator />
                <FoodItem>
                    <FoodImg />
                    <FoodInfo>
                        {/* 백으로부터 받은 data의 반찬가게 이름, 반찬 이름, count, 가격*/}
                        <p style={{ margin: '0px' }}>반찬가게 이름</p>
                        <FoodOrderInfo>
                            <p style={{ margin: '0px' }}>반찬 이름</p>
                            <p style={{ margin: '0px' }}>1개</p>
                            <p style={{ margin: '0px' }}>8,000원</p>
                        </FoodOrderInfo>
                    </FoodInfo>
                </FoodItem>
                <ReviewButtonSecond>리뷰 작성 완료</ReviewButtonSecond>
            </Wrapper>
            <Wrapper>
                <OrderStatus>
                    {/* 백으로부터 받은 data의 주문 날짜랑 픽업 status */}
                    <p>5/16(화요일)</p>
                    <p>|</p>
                    <p>픽업 예정</p>
                </OrderStatus>
                <Separator />
                <FoodItem>
                    <FoodImg />
                    <FoodInfo>
                        {/* 백으로부터 받은 data의 반찬가게 이름, 반찬 이름, count, 가격*/}
                        <p style={{ margin: '0px' }}>반찬가게 이름</p>
                        <FoodOrderInfo>
                            <p style={{ margin: '0px' }}>반찬 이름</p>
                            <p style={{ margin: '0px' }}>1개</p>
                            <p style={{ margin: '0px' }}>8,000원</p>
                        </FoodOrderInfo>
                    </FoodInfo>
                </FoodItem>
                <ReviewButtonLast>19:00 픽업 예정</ReviewButtonLast>
            </Wrapper>
            <Navigator />
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
`;

const OrderStatus = styled.div`
    display: flex;
    gap: 10px;
`;

const FoodItem = styled.div`
    display: flex;
    gap: 26px;
    align-items: center;
    margin-top: 8px;
`;

const FoodImg = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 8px;
    background-color: #767676;
`;

const FoodInfo = styled.div`
    color: #212121;
    font-size: 16px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
`;

const FoodOrderInfo = styled.div`
    display: flex;
    color: #212121;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    gap: 12px;
    margin-top: 0px;
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #efefef;
`;
// 리뷰 버튼 스타일링은 디자인팀에게 보여주는 용도로 First, Second, Last 지정함.
// 추후에는 하나의 버튼으로 통일 예정.
const ReviewButtonFirst = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 12px;
    background: #ff7455;
    border: none;
    color: #fff;
    text-align: center;
    margin: 24px 0px 20px 0px;
    // font
    font-size: 14px;
    font-family: Pretendard-Regular;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.1px;
`;
const ReviewButtonSecond = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 12px;
    background: #efefef;
    border: none;
    color: #504e5f;
    text-align: center;
    margin: 24px 0px 20px 0px;
    // font
    font-size: 14px;
    font-family: Pretendard-Regular;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.1px;
`;

const ReviewButtonLast = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 12px;
    background: #ffe3dd;
    border: none;
    color: #ff7455;
    text-align: center;
    margin: 24px 0px 20px 0px;
    // font
    font-size: 14px;
    font-family: Pretendard-Regular;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.1px;
`;
