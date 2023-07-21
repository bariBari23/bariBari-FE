import styled from 'styled-components';
import ReviewCard from './ReviewCard';
import { ReactComponent as Star } from '../../assets/star.svg';
import { useQuery } from 'react-query';
import { getReview } from '../../apis/api/review';

export default function ReviewBox({ isSelected, id }: { isSelected: boolean; id: number }) {
    return (
        <Container isSelected={isSelected}>
            <ScoreBox>
                <div
                    style={{
                        paddingRight: '18px',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '32px',
                    }}
                >
                    4.4
                </div>
                <div>
                    <Star />
                </div>
            </ScoreBox>
            <ReviewCard id={id} />
        </Container>
    );
}

const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isSelected === true ? 'flex' : 'none')};
    flex-direction: column;
    padding-bottom: 200px;
    background-color: white;
`;

const ScoreBox = styled.div`
    padding: 20px 12px;
    margin-bottom: 14px;
    display: flex;
`;
