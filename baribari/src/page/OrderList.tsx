import { styled } from 'styled-components';
import Navigator from '../component/Navigator';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getOrderItems } from '../apis/api/order';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';

import SearchSkeleton from '../assets/3dSearch.png';
import { Key } from 'react';

export default function OrderList() {
    const navigate = useNavigate();

    function convertDate(dateString: string) {
        const date = parseISO(dateString);
        return format(date, 'M/dd (EEEE)', { locale: ko });
    }

    const handleUploadReviewClick = (item: any) => {
        if (item.isReviewed) {
            alert('이미 작성한 리뷰입니다.');
        } else if (item.status != 'PICKED_UP') {
            alert('반찬 수령 완료 후 리뷰 작성이 가능합니다.');
        } else {
            navigate('/uploadReview', { state: { item } });
        }
    };
    const { data: orderItems, isLoading, error } = useQuery('orderItems', getOrderItems);
    if (error) {
        return <div>An error has occurred</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(orderItems);
    const handleClickNavButton = () => {
        navigate(`/cart`);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '70px',
                width: '100vw',
            }}
        >
            <Header>주문 내역</Header>
            <div style={{ marginBottom: '100px' }}>
                {orderItems.data.orderItems.length === 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            backgroundColor: '#F9F9F9',
                            width: '100vw',
                            height: '100%',
                            flexDirection: 'column',
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <img src={SearchSkeleton} alt="돋보기" style={{ width: '210px', height: '210px' }} />
                        <span
                            style={{
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                lineHeight: '16px',
                                color: '#D3D3D3',
                            }}
                        >
                            주문 내역이 없어요
                        </span>
                        <NavButton onClick={handleClickNavButton}>반찬박스 주문하러 가기</NavButton>
                    </div>
                ) : (
                    orderItems.data.orderItems.map((item: any, index: number) => (
                        <Wrapper>
                            <OrderStatus>
                                {/* 백으로부터 받은 data의 주문 날짜랑 픽업 status */}
                                <div style={{ marginBottom: '8px' }}>{convertDate(item.orderCreatedAt)}</div>
                                <div style={{ marginBottom: '8px' }}>|</div>
                                <div style={{ marginBottom: '8px' }}>
                                    {item.status === 'READY'
                                        ? '준비 완료'
                                        : item.status === 'PICKED_UP'
                                        ? '수령 완료'
                                        : item.status === 'ORDERED'
                                        ? '주문 완료'
                                        : item.status}
                                </div>
                            </OrderStatus>

                            <>
                                <Separator />
                                <FoodItem>
                                    <FoodImg src={item.dosirakImage} />
                                    <FoodInfo>
                                        {/* 백으로부터 받은 data의 반찬가게 이름, 반찬 이름, count, 가격*/}
                                        <p
                                            style={{
                                                margin: '0px',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                                lineHeight: '28px',
                                                fontStyle: 'normal',
                                            }}
                                        >
                                            {item.storeName}
                                        </p>
                                        <FoodOrderInfo>
                                            <p style={{ margin: '0px' }}>{item.dosirakName}</p>
                                            <p style={{ margin: '0px' }}>{item.count}개</p>
                                            <p style={{ margin: '0px' }}>{item.total.toLocaleString()}원</p>
                                        </FoodOrderInfo>
                                    </FoodInfo>
                                </FoodItem>
                            </>
                            <ReviewButtonFirst
                                isReviewed={item.isReviewed}
                                onClick={() => handleUploadReviewClick(item)}
                            >
                                {item.status !== 'PICKED_UP'
                                    ? `${item.estimatedPickUpTime} 수령 예정`
                                    : item.isReviewed
                                    ? '리뷰 작성 완료'
                                    : '리뷰 쓰기'}
                            </ReviewButtonFirst>
                        </Wrapper>
                    ))
                )}
            </div>
            <Navigator />
        </div>
    );
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 16px;
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
    font-family: Pretendard Variable;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
`;

const FoodOrderInfo = styled.div`
    display: flex;
    color: #212121;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    gap: 12px;
    margin-top: 4px;
`;

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #efefef;
`;
// 리뷰 버튼 스타일링은 디자인팀에게 보여주는 용도로 First, Second, Last 지정함.
// 추후에는 하나의 버튼으로 통일 예정.
const ReviewButtonFirst = styled.button<{ isReviewed: boolean }>`
    width: 100%;
    height: 40px;
    border-radius: 12px;
    background: ${(props) => (props.isReviewed ? '#efefef' : '#ff7455')};
    border: none;
    color: ${(props) => (props.isReviewed ? '#949494' : '#fff')};
    text-align: center;
    margin: 24px 0px 20px 0px;
    // font
    font-size: 14px;
    font-family: Pretendard Variable;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.1px;
`;

const NavButton = styled.button`
    border: none;
    width: 208px;
    height: 40px;
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    margin-top: 40px;
`;

const Header = styled.div`
    height: 32px;
    width: 100%;
    padding: 25px 8px 8px 16px;
    background-color: white;
    position: fixed;
    margin: auto;
    top: 0;
    z-index: 10000;
    font-family: Pretendard Variable;
    color: #212121;
    font-size: 22px;
    font-weight: 700;
`;
