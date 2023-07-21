import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Star } from '../../assets/star.svg';
import { useQuery } from 'react-query';
import { getReview } from '../../apis/api/review';

export default function ReviewCard({ id }: { id: number | null }) {
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const { data: reviewData, isLoading, error } = useQuery(['review', id], () => getReview(id));

    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = 'inherit';
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    }, []);
    return (
        <Container>
            {reviewData?.data?.reviewList.map((review: any) => (
                <>
                    <CircleProfile src={review.reviewWriterProfileImageUrl} />
                    <SubReviewCard key={review.reviewId}>
                        <div
                            style={{
                                width: '100%',
                                marginBottom: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ display: 'flex', fontSize: '18px', fontStyle: 'normal', fontWeight: '700' }}>
                                {review.reviewWriterName}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    color: '#AAA',
                                }}
                            >
                                {review.createdAt}
                            </div>
                        </div>
                        <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    lineHeight: '28px',
                                }}
                            >
                                {review.orderItem.dosirakName}
                            </div>
                            <Star style={{ display: 'flex', width: '102px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <EvaluationTile>맛있어요</EvaluationTile>
                            <EvaluationTile>양은 충분했어요</EvaluationTile>
                            <EvaluationTile style={{ marginRight: '0px' }}>포장이 깔끔해요</EvaluationTile>
                        </div>
                        <ImageBox src={review.mainImageUrl} />
                        <ReviewText ref={textRef}>{review.content}</ReviewText>
                    </SubReviewCard>
                </>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    padding: 0px 16px;
    margin-bottom: 20px;
`;

const CircleProfile = styled.img`
    width: 44px;
    height: 44px;
    background-color: grey;
    border-radius: 100%;
`;

const SubReviewCard = styled.div`
    display: flex;
    width: calc(100% - 56px);
    flex-direction: column;
    padding-top: 8px;
    align-items: flex-start;
`;

const EvaluationTile = styled.div`
    display: flex;
    padding: 4px 12px;
    border: solid 1px #ff7455;
    border-radius: 8px;
    color: #ff7455;
    margin-right: 8px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
`;

const ImageBox = styled.img`
    margin: 14px 0;
    display: flex;
    height: 282px;
    width: 100%;
    border-radius: 12px;
    background-color: grey;
`;

const ReviewText = styled.textarea`
    display: flex;
    width: 100%;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    border: none;
    color: black;
    overflow: auto;
    resize: none;
`;
