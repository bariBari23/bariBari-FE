import styled from 'styled-components';
import { ReactComponent as Star } from '../../asset/star.svg';

export default function ReviewBox({ isSelected }: { isSelected: boolean }) {
    return (
        <Container isSelected={isSelected}>
            <ScoreBox>
                <div style={{paddingRight: '18px', fontSize: '24px', fontStyle: 'normal', fontWeight: '700', lineHeight: '32px'}}>4.4</div>
                <div><Star/></div>
            </ScoreBox>
            <ReviewCard>
                <CircleProfile/>
                <SubReviewCard>
                    <div style={{width: '100%', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', fontSize: '18px', fontStyle: 'normal', fontWeight: '700'}}>닉네임</div>
                        <div style={{display: 'flex', fontSize: '12px', fontStyle: 'normal', fontWeight: '600', color: '#AAA'}}>2022.08.12</div>
                    </div>
                    <div style={{marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center'}}>
                        <div style={{display: 'flex', fontSize: '16px', fontStyle: 'normal', fontWeight: '600', lineHeight: '28px'}}>명철 반찬세트</div>
                        <Star style={{display: 'flex', width: '102px'}}/>
                    </div>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                        <EvaluationTile>맛있어요</EvaluationTile>
                        <EvaluationTile>양은 충분했어요</EvaluationTile>
                        <EvaluationTile style={{marginRight: '0px'}}>포장이 깔끔해요</EvaluationTile>
                    </div>
                </SubReviewCard>

            </ReviewCard>
        </Container>
    );
}

const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isSelected === true ? 'flex' : 'none')};
    flex-direction: column;
    padding-bottom: 40px;
`;

const ScoreBox = styled.div`
    padding: 20px 12px;
    margin-bottom: 14px;
    display: flex;

`
const ReviewCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    padding: 0px 16px;
    margin-bottom: 20px;
`

const CircleProfile = styled.div`
    width: 44px;
    height: 44px;
    background-color: grey;
    border-radius: 100%;
`

const SubReviewCard = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 8px;
    align-items: flex-start;
    gap: 14px;
`

const EvaluationTile = styled.div`
    display: flex;
    padding: 4px 12px;
    border: solid 1px #FF7455;
    border-radius: 8px;
    color: #FF7455;
    margin-right: 8px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
`
