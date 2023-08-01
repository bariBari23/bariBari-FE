import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Star from '../../assets/plainStar';
import { useQuery } from 'react-query';
import { getReview } from '../../apis/api/review';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { ReactComponent as Profile } from '../../assets/img-profile.svg';

export default function ReviewCard({ id }: { id: number | null }) {
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const { data: reviewData, isLoading, error } = useQuery(['review', id], () => getReview(id));
    console.log(reviewData);

    function convertDate(dateString: string) {
        const date = parseISO(dateString);
        return format(date, 'yyyy.MM.dd', { locale: ko });
    }

    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = 'inherit';
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    }, []);
    const tagMap: { [key: string]: string } = {
        smallAmount: '양이 적어요',
        averageAmount: '충분해요',
        largeAmount: '너무 많아요',
        badTaste: '별로예요',
        plainTaste: '보통이에요',
        goodTaste: '맛있어요',
        badStatus: '허술해요',
        plainStatus: '보통이에요',
        goodStatus: '깔끔해요',
    };
    // let dateFormatted = '';
    // if (reviewData && reviewData.data) {
    //     const recordDate = reviewData.data.createdAt;

    return (
        <Container>
            {reviewData?.data?.reviewList.map((review: any) => (
                <>
                    <Profile style={{ width: '44px', height: '44px' }} />
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
                                {convertDate(review.reviewCreatedAt)}
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
                            <div style={{ display: 'flex', width: '102px' }}>
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <Star
                                        width={16}
                                        key={starNumber}
                                        starNumber={starNumber}
                                        selected={starNumber <= parseFloat(review.rating)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <EvaluationTile>{tagMap[review.tags[0]]}</EvaluationTile>
                            <EvaluationTile>{tagMap[review.tags[1]]}</EvaluationTile>
                            <EvaluationTile style={{ marginRight: '0px' }}>{tagMap[review.tags[2]]}</EvaluationTile>
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
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 0px 16px;
    margin-bottom: 20px;
`;

const CircleProfile = styled.div`
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
