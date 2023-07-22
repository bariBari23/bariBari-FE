import { styled } from 'styled-components';
import { FilledHeartIcon } from './IconFin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchByQuery } from '../apis/api/search';
import defaultImg from '../assets/defaultImg.jpg';
import { ReactComponent as FloatingRefreshBtn } from '../assets/RefreshBtn.svg';
import { ContentContainerProps, DosirakItem } from '../utils/interface';
import { useQuery } from '@tanstack/react-query';

export default function ContentContainer({ keyword, filterLiked, sort }: ContentContainerProps) {
    const navigate = useNavigate();
    const handleCardClick = (id: number) => {
        navigate(`/detail/${id}`); // 일단 detail로 넘어가는 걸로! 나중에 수정 예정.
    };

    // React Query를 사용하여 API 데이터 가져오기
    const { data: dosirakList, refetch } = useQuery(
        ['dosirakList', keyword, filterLiked, sort],
        () => searchByQuery(keyword ?? '', filterLiked, sort ?? ''),
        {
            staleTime: 30000, //  30초 이상 오래된 경우에만 업데이트
            cacheTime: 300000, // 5분 동안 데이터를 캐시에 보관
            refetchOnWindowFocus: true, // 창이 포커스를 얻었을 때만 리프레시
            enabled: keyword !== undefined || filterLiked !== undefined || sort !== undefined, // 키워드, 필터, 정렬 값이 있을 때에만 API 호출
        },
    );
    return (
        <Container>
            {dosirakList?.data?.dosirakList?.map((dosirak: DosirakItem) => (
                <FoodCard key={dosirak.id} onClick={() => handleCardClick(dosirak.id)}>
                    <ImgWrapper>
                        <div style={{ width: '100%', height: '206px' }}>
                            {!dosirak.mainImageUrl || dosirak.mainImageUrl === ' ' || dosirak.mainImageUrl === '  ' ? (
                                <FoodImg src={defaultImg} alt="Default Food" />
                            ) : (
                                <FoodImg src={dosirak.mainImageUrl} alt={dosirak.name} />
                            )}
                        </div>
                        <StockTag>{dosirak.stock}개</StockTag>
                    </ImgWrapper>
                    <NameWrapper>
                        <FoodStoreName>{dosirak.storeName}</FoodStoreName>
                        {dosirak.likedStore && <FilledHeartIcon />}
                    </NameWrapper>
                    <FoodName>{dosirak.name}</FoodName>
                    <TagWrapper>
                        {dosirak.banchanList.map((banchan, index) => (
                            <FoodTag key={index}>{banchan}</FoodTag>
                        ))}
                    </TagWrapper>
                    <Price>{dosirak.price.toLocaleString()}원</Price>
                </FoodCard>
            ))}
            <RotateFloatingRefreshBtn
                style={{ position: 'absolute', bottom: '0px', right: '10px' }}
                onClick={() => refetch()}
            />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    @media (max-width: 365px) {
        justify-content: center; /* 웹뷰 가로 사이즈가 408px 이하일 때 카드 배열을 가운데 정렬 */
    }
    gap: 8px;
`;

const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 206px;
`;

const StockTag = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 35px;
    height: 18px;
    border-radius: 8px;
    background: #ff7455;
    color: #fff;
    font-family: Pretendard;
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NameWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FoodCard = styled.div`
    width: calc((100% - 8px) / 2);
    height: 305px;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    padding: 0 0 20px 0px;
    // 카드 폭을 100%로 맞춰보는 건 어떨까!
    @media (max-width: 365px) {
        width: 100%;
    }
`;

const FoodImg = styled.img`
    border-radius: 4px;
    background-color: lightgrey;
    margin-bottom: 12px;
    width: 100%; /* 이미지의 너비는 부모 컴포넌트의 너비에 맞추어짐 */
    height: 100%; /* 이미지의 높이는 100%로 설정하여 ImageContainer의 높이와 일치시킴 */
    object-fit: cover;
    @media (max-width: 365px) {
        width: 100%;
    }
`;

const FoodStoreName = styled.div`
    color: var(--orange-100, #ff7455);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const FoodName = styled.div`
    color: var(--black, #212121);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;
const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 4px 0px;
`;

const FoodTag = styled.div`
    width: auto;
    height: 10px;
    padding: 4px 8px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--grey-1, #f9f9f9);
    color: var(--grey-5, #767676);
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
`;
const Price = styled.div`
    color: var(--black, #212121);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
`;

const RotateFloatingRefreshBtn = styled(FloatingRefreshBtn)`
    transition: transform 1s ease;

    &:hover {
        transform: rotate(75deg);
    }
`;
