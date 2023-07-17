import styled from 'styled-components';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { ReactComponent as SmallStar } from '../../assets/star.svg';

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
                        <div
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                lineHeight: '20px',
                                alignItems: 'center',
                            }}
                        >
                            반찬가게 이름 철산래미안점
                        </div>

                        <div
                            style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                height: '21px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            4.4
                            <SmallStar style={{ display: 'flex', width: '89.4px', marginLeft: '12px' }} />
                        </div>
                    </StoreNameBox>
                    <Heart style={{ padding: '3px', marginRight: '0' }} />
                </StoreBox>
            </MainBox>
            <SubBox>
                <RawFoodBox>
                    <FoodTag>시금치 나물</FoodTag>
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
    height: 120px;
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
    height: 52px;
    margin: 24px 12px 0 12px;
    padding: 8px 12px 8px 8px;
    background-color: #f9f9f9;
    border-radius: 8px;
    align-items: center;
`;

const StoreImageBox = styled.div`
    width: 52px;
    height: 52px;
    margin-right: 16px;
    background-color: grey;
    border-radius: 8px;
`;

const StoreNameBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: auto;
`;

const FoodTag = styled.div`
    margin-right: auto;
    font-size: 16px;
    font-weight: 600;
    line-height: 130%;
    padding: 7.354px 14.709px;
    border-radius: 14.709px;
    background-color: #f9f9f9;
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
    height: 33.7px;
    padding: 12px 16px;
    align-items: center;
    border-bottom: solid 1px #efefef;
    color: #504e5f;
`;
