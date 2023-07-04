import { styled } from 'styled-components';

export default function ContentContainer() {
    return (
        <Container>
            <DosirakCard>
                <DosirakImg></DosirakImg>
                <DosirakStoreName>유미네 반찬가게</DosirakStoreName>
                <DosirakName>계란말이 쏙쏙 반찬 박스</DosirakName>
                <TagWrapper>
                    <DosirakTag>계란말이</DosirakTag>
                    <DosirakTag>감자채볶음</DosirakTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </DosirakCard>
            <DosirakCard>
                <DosirakImg></DosirakImg>
                <DosirakStoreName>유미네 반찬가게</DosirakStoreName>
                <DosirakName>계란말이 쏙쏙 반찬 박스</DosirakName>
                <TagWrapper>
                    <DosirakTag>계란말이</DosirakTag>
                    <DosirakTag>감자채볶음</DosirakTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </DosirakCard>
            <DosirakCard>
                <DosirakImg></DosirakImg>
                <DosirakStoreName>유미네 반찬가게</DosirakStoreName>
                <DosirakName>계란말이 쏙쏙 반찬 박스</DosirakName>
                <TagWrapper>
                    <DosirakTag>계란말이</DosirakTag>
                    <DosirakTag>감자채볶음</DosirakTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </DosirakCard>
            <DosirakCard>
                <DosirakImg></DosirakImg>
                <DosirakStoreName>유미네 반찬가게</DosirakStoreName>
                <DosirakName>계란말이 쏙쏙 반찬 박스</DosirakName>
                <TagWrapper>
                    <DosirakTag>계란말이</DosirakTag>
                    <DosirakTag>감자채볶음</DosirakTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </DosirakCard>
            <DosirakCard>
                <DosirakImg></DosirakImg>
                <DosirakStoreName>유미네 반찬가게</DosirakStoreName>
                <DosirakName>계란말이 쏙쏙 반찬 박스</DosirakName>
                <TagWrapper>
                    <DosirakTag>계란말이</DosirakTag>
                    <DosirakTag>감자채볶음</DosirakTag>
                    <DosirakTag>멸치볶음</DosirakTag>
                </TagWrapper>
                <Price>7,000원</Price>
            </DosirakCard>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 8px;
`;

const DosirakCard = styled.div`
    height: 305px;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    padding: 8px 8px 8px 8px;
`;

const DosirakImg = styled.div`
    width: 172px;
    height: 206px;
    border-radius: 4px;
    background-color: lightgrey;
    margin-bottom: 12px;
`;

const DosirakStoreName = styled.div`
    color: var(--orange-100, #ff7455);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const DosirakName = styled.div`
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

const DosirakTag = styled.div`
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
