import styled from 'styled-components';
import ReviewCard from './ReviewCard';
import { ReactComponent as Star } from '../../assets/star.svg';

export default function ReviewBox({ isSelected }: { isSelected: boolean }) {
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
            <ReviewCard />
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
