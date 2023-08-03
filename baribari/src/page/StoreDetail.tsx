import styled from 'styled-components';
import Header from '../component/Header';
import FoodDetailBox from '../component/StoreDetail/FoodDetailBox';
import { useState, useEffect } from 'react';
import StoreDetailBox from '../component/StoreDetail/StoreDetailBox';
import ReviewBox from '../component/StoreDetail/ReviewBox';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchById } from '../apis/api/search';
import { getStoreInfo } from '../apis/api/store';
import { addCartItem } from '../apis/api/cart';
import Lottie from 'lottie-react';
import { lottie } from '../assets/lotti/index';

export default function StoreDetail() {
    const navigate = useNavigate();
    const [active, setActive] = useState('반찬 상세');
    const changeDetailBox = (value: string) => {
        setActive(value);
    };
    const [storeId, setStoreId] = useState<number | null>(null);

    const id = Number(useParams<{ id: string }>().id);
    const {
        data: dosirakData,
        isLoading,
        error,
    } = useQuery(['dosirakData', id], () => searchById(id), {
        onSuccess: (data) => {
            console.log(data.data.storeId);
            setStoreId(data.data.storeId);
        },
    });

    const {
        data: storeData,
        isLoading: storeIsLoading,
        error: storeError,
    } = useQuery(['storeData', storeId], () => getStoreInfo(storeId), {
        enabled: !!storeId,
    });
    console.log('바로 여기에요' + storeId);
    if (error || storeError) {
        return <div>An error has occurred</div>;
    }
    if (isLoading || storeIsLoading) {
        return (
            <div>
                <Lottie animationData={lottie} />
            </div>
        );
    }
    console.log('dosirakdata' + dosirakData);
    console.log('storeData' + storeData);

    const addToCart = () => {
        addCartItem(dosirakData.data.id)
            .then(() => {
                console.log('Items added successfully');
                navigate('/cart');
            })
            .catch((error) => console.log('Error:', error));
    };
    return (
        <Container>
            <Header showPageName={true} pageTitle={'반찬박스 이름'} showSearchBar={false} />
            <InsideBox>
                <FoodImgBox src={dosirakData.data.mainImageUrl} />
                <DetailNav>
                    <InformBtn isSelected={active === '반찬 상세'} onClick={() => changeDetailBox('반찬 상세')}>
                        반찬 상세
                    </InformBtn>
                    <InformBtn isSelected={active === '가게 정보'} onClick={() => changeDetailBox('가게 정보')}>
                        가게 정보
                    </InformBtn>
                    <InformBtn isSelected={active === '리뷰'} onClick={() => changeDetailBox('리뷰')}>
                        리뷰
                    </InformBtn>
                </DetailNav>
                <FoodDetailBox isSelected={active === '반찬 상세'} dosirakData={dosirakData} storeData={storeData} />
                <StoreDetailBox isSelected={active === '가게 정보'} storeData={storeData} />
                <ReviewBox isSelected={active === '리뷰'} id={storeId} rating={storeData.data.reviewMean} />
                <AddBtn onClick={addToCart}>장바구니에 넣기</AddBtn>
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
    margin-top: 65px;
    justify-content: flex-start;
    align-items: center;
    background-color: #f9f9f9;
    margin-bottom: 100px;
`;
const FoodImgBox = styled.img`
    display: flex;
    width: 100%;
    height: 240px;
    background-color: #efefef;
    object-fit: cover;
`;
const DetailNav = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    background-color: #f9f9f9;
    justify-content: space-between;
`;
const InformBtn = styled.button<{ isSelected: boolean }>`
    width: 33.33%;
    background: none;
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
    color: ${(props: { isSelected: boolean }) => (props.isSelected === true ? '#FF7455' : '#AAAAAA')};
    font-size: 16px;
    font-weight: ${(props: { isSelected: boolean }) => (props.isSelected === true ? '700' : '500')};
    border-bottom: ${(props: { isSelected: boolean }) => (props.isSelected === true ? 'solid 2px #FF7455' : 'none')};
`;
const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 48px);
    max-width: 568px;
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
    max-width: 568px;
    height: 96px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 5000;
`;
