import styled from 'styled-components';
import TopBar from '../component/TopBar';
import FoodDetailBox from '../component/StoreDetail/FoodDetailBox';
import { useState, useEffect } from 'react';
import StoreDetailBox from '../component/StoreDetail/StoreDetailBox';
import ReviewBox from '../component/StoreDetail/ReviewBox';

export default function StoreDetail() {
    const [active, setActive] = useState('반찬 상세');
    const changeDetailBox = (value: string) => {
        setActive(value);
    };
    return (
        <Container>
            <TopBar page={'반찬박스 이름'} />
            <InsideBox>
                <FoodImgBox />
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
                <FoodDetailBox isSelected={active === '반찬 상세'} />
                <StoreDetailBox isSelected={active === '가게 정보'} />
                <ReviewBox isSelected={active === '리뷰'} />
                <AddBtn>장바구니에 넣기</AddBtn>
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
    align-items: center;
    background-color: #f9f9f9;
`;
const FoodImgBox = styled.div`
    display: flex;
    width: 100%;
    height: 240px;
    background-color: #efefef;
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
