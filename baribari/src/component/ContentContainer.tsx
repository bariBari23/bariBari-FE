import { styled } from 'styled-components';
import { FilledHeartIcon } from './IconFin';
import { useNavigate } from 'react-router-dom';

export default function ContentContainer() {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/detail'); // 일단 detail로 넘어가는 걸로! 나중에 수정 예정.
    };

    return (
        <Container>
            <FoodCard onClick={handleCardClick}>
                <FoodImg></FoodImg>
                <NameWrapper>
                    <FoodStoreName>유미네 반찬가게</FoodStoreName>
                    <FilledHeartIcon />
                </NameWrapper>
                <FoodName>계란말이 쏙쏙 반찬 박스</FoodName>
                <TagWrapper>
                    <FoodTag>계란말이</FoodTag>
                    <FoodTag>감자채볶음</FoodTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </FoodCard>
            <FoodCard onClick={handleCardClick}>
                <FoodImg></FoodImg>
                <FoodStoreName>유미네 반찬가게</FoodStoreName>
                <FoodName>계란말이 쏙쏙 반찬 박스</FoodName>
                <TagWrapper>
                    <FoodTag>계란말이</FoodTag>
                    <FoodTag>감자채볶음</FoodTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </FoodCard>
            <FoodCard onClick={handleCardClick}>
                <FoodImg></FoodImg>
                <NameWrapper>
                    <FoodStoreName>유미네 반찬가게</FoodStoreName>
                    <FilledHeartIcon />
                </NameWrapper>
                <FoodName>계란말이 쏙쏙 반찬 박스</FoodName>
                <TagWrapper>
                    <FoodTag>계란말이</FoodTag>
                    <FoodTag>감자채볶음</FoodTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </FoodCard>
            <FoodCard onClick={handleCardClick}>
                <FoodImg></FoodImg>
                <FoodStoreName>유미네 반찬가게</FoodStoreName>
                <FoodName>계란말이 쏙쏙 반찬 박스</FoodName>
                <TagWrapper>
                    <FoodTag>계란말이</FoodTag>
                    <FoodTag>감자채볶음</FoodTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </FoodCard>
            <FoodCard onClick={handleCardClick}>
                <FoodImg></FoodImg>
                <NameWrapper>
                    <FoodStoreName>유미네 반찬가게</FoodStoreName>
                    <FilledHeartIcon />
                </NameWrapper>
                <FoodName>계란말이 쏙쏙 반찬 박스</FoodName>
                <TagWrapper>
                    <FoodTag>계란말이</FoodTag>
                    <FoodTag>감자채볶음</FoodTag>
                    <FoodTag>멸치볶음</FoodTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </FoodCard>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    @media (max-width: 365px) {
        justify-content: center; /* 웹뷰 가로 사이즈가 408px 이하일 때 카드 배열을 가운데 정렬 */
    }
    gap: 8px;
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

const FoodImg = styled.div`
    width: 100%;
    height: 206px;
    border-radius: 4px;
    background-color: lightgrey;
    margin-bottom: 12px;

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
