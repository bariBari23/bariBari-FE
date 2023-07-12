import styled from 'styled-components';
import { ReactComponent as Heart } from '../../assets/heart.svg';

export default function FoodDetailBox({ isSelected }: { isSelected: boolean }) {
    return (
        <Container isSelected={isSelected}>
            <MainBox>
                <TitleBox>
                    <div style={{ marginRight: 'auto' }}>명절 반찬 박스 세트</div>
                    <div style={{ marginRight: '0' }}>18,000원</div>
                </TitleBox>
                <StoreBox>
                    <StoreImageBox />
                    <StoreNameBox>
                        <div style={{ marginBottom: '14px', fontSize: '14px', fontWeight: '600' }}>
                            반찬가게 이름 철산래미안점
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: '400' }}>별점 4.4</div>
                    </StoreNameBox>
                    <Heart />
                </StoreBox>
            </MainBox>
            <SubBox>
                <RawFoodBox>
                    <div style={{ marginRight: 'auto', fontSize: '16px', fontWeight: '600' }}>시금치 나물</div>
                    <div style={{ marginRight: '0', fontSize: '14px', fontWeight: '500' }}>60g</div>
                </RawFoodBox>
            </SubBox>
        </Container>
    );
}

const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isSelected === true ? 'flex' : 'none')};
    flex-direction: column;
`;
const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0 20px 0;
    background-color: white;
    width: 100%;
    height: 138px;
`;
const TitleBox = styled.div`
    display: flex;
    line-height: 32px;
    flex-direction: row;
    margin: 0 12px 0 12px;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 700;
`;
const StoreBox = styled.div`
    display: flex;
    height: 70px;
    margin: 24px 12px 0 12px;
    padding: 8px 12px 8px 8px;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

const StoreImageBox = styled.div`
    width: 52px;
    height: 52px;
    margin: 8px 16px 8px 12px;
    background-color: grey;
    border-radius: 8px;
`;

const StoreNameBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px auto auto 0;
`;

const IconHeart = styled.div`
    display: flex;
    align-items: center;
    margin-right: 12px;
    font-size: 24px;
`;
const SubBox = styled.div`
    display: flex;
    min-height: 320px;
    background-color: white;
    margin-top: 14px;
    padding-top: 20px;
`;

const RawFoodBox = styled.div`
    display: flex;
    width: 100%;
    height: 52px;
    margin: 0 16px 0 16px;
    align-items: center;
    border-bottom: solid 1px #efefef;
    color: #504e5f;
`;
