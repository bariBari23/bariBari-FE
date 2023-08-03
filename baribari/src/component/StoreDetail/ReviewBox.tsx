import styled from 'styled-components';
import ReviewCard from './ReviewCard';

import { useQuery } from 'react-query';
import { getReview } from '../../apis/api/review';
import Star from '../../assets/plainStar';

export default function ReviewBox({
    isSelected,
    id,
    rating,
}: {
    isSelected: boolean;
    id: number | null;
    rating: number | any;
}) {
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
                        display: 'flex',
                        gap: '18px',
                    }}
                >
                    {isNaN(parseFloat(rating)) ? '0.0' : parseFloat(rating).toFixed(1)}
                    <div style={{ display: 'flex', width: '137px', justifyContent: 'space-between' }}>
                        {[1, 2, 3, 4, 5].map((starNumber) => (
                            <Star
                                width={21}
                                key={starNumber}
                                starNumber={starNumber}
                                selected={starNumber <= parseFloat(rating)}
                            />
                        ))}
                    </div>
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
