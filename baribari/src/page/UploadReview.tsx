import styled from 'styled-components';
import Header from '../component/Header';
import { useState, useEffect } from 'react';
import Photo from '../assets/photo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { postReview } from '../apis/api/review';
import { getFileUrl } from '../apis/api/util';
import { axiosInstance } from '../apis';

type SelectedValue = [quantity: string, flavor: string, wrap: string];

export default function UploadReview() {
    const location = useLocation();
    const orderItem = location.state.item;
    let isSelected = false;
    const [quantity, setQuantity] = useState<string | null>(null);
    const [flavor, setFlavor] = useState<string | null>(null);
    const [wrap, setWrap] = useState<string | null>(null);
    const [ratingText, setRatingText] = useState<string>('');

    const [image, setImage] = useState<File | null>(null);
    const [imageFileUrl, setImageUrl] = useState<string | null>(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [imageUrl, setUrl] = useState('');
    

    const Star = ({
        starNumber,
        handleRatingChange,
        selected,
    }: {
        starNumber: number;
        handleRatingChange: any;
        selected: boolean;
    }) => (
        <div style={{ paddingRight: '4px' }}>
            <svg
                width="26px"
                height="26px"
                viewBox="0 0 26 26"
                onClick={() => handleRatingChange(starNumber)}
                fill={selected ? '#FFBE58' : '#EFEFEF'}
            >
                <path
                    id="Icon"
                    d="M10.4562 0.343335C10.6821 -0.114445 11.3349 -0.114445 11.5608 0.343335L14.4855 6.26936C14.5752 6.45114 14.7486 6.57714 14.9493 6.60629L21.489 7.55657C21.9942 7.62998 22.1959 8.25081 21.8304 8.60715L17.0981 13.2199C16.953 13.3614 16.8867 13.5653 16.921 13.7651L18.0381 20.2784C18.1244 20.7816 17.5963 21.1653 17.1445 20.9277L11.2951 17.8525C11.1157 17.7582 10.9013 17.7582 10.7219 17.8525L4.87257 20.9277C4.42071 21.1653 3.8926 20.7816 3.9789 20.2784L5.09602 13.7651C5.13029 13.5653 5.06405 13.3614 4.91888 13.2199L0.186674 8.60715C-0.178886 8.25081 0.0228347 7.62998 0.528026 7.55657L7.06778 6.60629C7.26839 6.57714 7.44181 6.45114 7.53153 6.26936L10.4562 0.343335Z"
                    fill={selected ? '#FFBE58' : '#EFEFEF'}
                />
            </svg>
        </div>
    );
    useEffect(() => {
        let displayText;

        if (rating >= 1 && rating <= 2) {
            displayText = '별로';
        } else if (rating === 3) {
            displayText = '보통';
        } else if (rating >= 4 && rating <= 5) {
            displayText = '좋아요';
        } else {
            displayText = '평가 없음';
        }

        setRatingText(displayText);
    }, [rating]);

    const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'quantity':
                setQuantity(e.target.value);
                break;
            case 'flavor':
                setFlavor(e.target.value);
                break;
            case 'wrap':
                setWrap(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            
        }
    };

    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };
    const selectedValue = [quantity, flavor, wrap];
    const onRealSubmit = async() =>{
        try {
            const reviewData = {
                orderItemId: orderItem.orderItemId,
                content: reviewText,
                rating: rating,
                photoList: [],
                mainImageUrl: imageUrl,
                tags: selectedValue,
            };
            console.log(reviewData.mainImageUrl);
            const response = await postReview(reviewData);
            console.log(response);
            alert('리뷰가 성공적으로 작성되었습니다.');
            navigate('/orderlist'); // If the mutation succeeds, navigate to the order list page.
        } catch (error) {
            // Handle the error here
            console.error('Failed to submit review:', error);
        }
    }
    const onSubmitReview = async () => {

        const reader = new FileReader();

        reader.onload = async function(event: ProgressEvent<FileReader>){
            const data = await axiosInstance.get(`/v1/file/presign`);
            setUrl(data?.data.data);
            console.log( 'url: ' + data?.data.data);
            const binaryData = event.target?.result;
            // console.log(binaryData);
            const response = await axiosInstance.put(`${data?.data.data}`, binaryData);
            console.log(response);
            onRealSubmit();
        }

        reader.readAsBinaryString(image!);
    };

    function ClickBox({ name, value, children }: { name: string; value: string; children: string }) {
        switch (name) {
            case 'quantity':
                isSelected = quantity === value;
                break;
            case 'flavor':
                isSelected = flavor === value;
                break;
            case 'wrap':
                isSelected = wrap === value;
                break;
            default:
                break;
        }
        return (
            <CheckBox isSelected={isSelected}>
                <input type="radio" name={name} value={value} style={{ display: 'none' }} onChange={handleSelection} />
                {children}
            </CheckBox>
        );
    }

    const navigate = useNavigate();

    return (
        <Container>
            <Header showPageName={true} pageTitle={'리뷰 쓰기'} showSearchBar={false} />
            <InsideBox>
                <StoreBox>
                    <StoreImageBox />
                    <StoreNameBox style={{ marginRight: 'auto' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', fontStyle: 'normal', lineHeight: '23px' }}>
                            {orderItem.storeName}
                        </div>
                        <div
                            style={{
                                fontSize: '14px',
                                fontWeight: '400',
                                fontStyle: 'normal',
                                lineHeight: '20px',
                                color: '#949494',
                            }}
                        >
                            주문일자: 2023. 05. 14
                        </div>
                    </StoreNameBox>
                    <StoreNameBox style={{ alignItems: 'flex-end' }}>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: '16px',
                                fontWeight: '700',
                                fontStyle: 'normal',
                                lineHeight: '23px',
                                color: '#FF7455',
                                marginRight: '0',
                                paddingTop: '23px',
                                marginLeft: 'auto',
                            }}
                        >
                            {orderItem.total.toLocaleString()}원
                        </div>{' '}
                    </StoreNameBox>
                </StoreBox>
                <SubText>주문하신 반찬에 별점을 남겨주세요.</SubText>
                <ScoreBox>
                    <ScoreStar>
                        <div style={{ width: '160px', height: '26px', display: 'flex' }}>
                            {[1, 2, 3, 4, 5].map((starNumber) => (
                                <Star
                                    key={starNumber}
                                    starNumber={starNumber}
                                    handleRatingChange={handleRatingChange}
                                    selected={starNumber <= rating}
                                />
                            ))}
                        </div>
                        <ScoreText>{ratingText}</ScoreText>
                    </ScoreStar>
                </ScoreBox>
                <SubText>주문하신 반찬의 양은 어떠셨나요?</SubText>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <ClickBox name="quantity" value="smallAmount">
                        양이 적어요
                    </ClickBox>
                    <ClickBox name="quantity" value="averageAmount">
                        충분해요
                    </ClickBox>
                    <ClickBox name="quantity" value="largeAmount">
                        너무 많아요
                    </ClickBox>
                </div>
                <SubText>주문하신 반찬의 맛은 어떠셨나요?</SubText>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <ClickBox name="flavor" value="badStatus">
                        별로예요
                    </ClickBox>
                    <ClickBox name="flavor" value="plainTaste">
                        보통이에요
                    </ClickBox>
                    <ClickBox name="flavor" value="goodTaste">
                        맛있어요
                    </ClickBox>
                </div>
                <SubText>주문하신 반찬의 포장 상태는 어떠셨나요?</SubText>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <ClickBox name="wrap" value="badStatus">
                        허술해요
                    </ClickBox>
                    <ClickBox name="wrap" value="plainStatus">
                        보통이에요
                    </ClickBox>
                    <ClickBox name="wrap" value="goodStatus">
                        깔끔해요
                    </ClickBox>
                </div>
                <SubText>주문하신 반찬은 어떠셨나요?</SubText>
                <TextReviewBox placeholder="후기를 입력해주세요." onChange={handleReviewTextChange}></TextReviewBox>
                <UploadPhoto htmlFor="upload" image={imageFileUrl}>
                    <input type="file" id="upload" onChange={handleFileChange} style={{ display: 'none' }} />
                </UploadPhoto>
            </InsideBox>
            <AddBtn onClick={onSubmitReview}>리뷰 등록하기</AddBtn>
            <BackSquare />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InsideBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 93px;
    justify-content: flex-start;
    padding: 0 16px 110px 16px;
    padding-bottom: 110px;
`;

const StoreBox = styled.div`
    display: flex;
    height: 70px;
    padding: 8px 12px 8px 12px;
    background-color: #f9f9f9;
    border-radius: 12px;
`;

const StoreImageBox = styled.div`
    width: 65px;
    height: 65px;
    margin-right: 18px;
    background-color: grey;
    border-radius: 8px;
`;

const StoreNameBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SubText = styled.div`
    display: flex;
    margin-top: 28px;
    padding-bottom: 16px;
    color: #767676;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const ScoreBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const ScoreStar = styled.div`
    margin: 18px auto 12px auto;
    justify-content: spacebetween;
`;
const ScoreText = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    margin: auto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    color: #ffbe58;
`;
const CheckBox = styled.label<{ isSelected: boolean }>`
    appearance: none;
    display: flex;
    width: 28%;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: ${(props) => (props.isSelected === true ? '0 0 0 2px #FF7455 inset' : '0 0 0 1px #EFEFEF inset')};
    color: ${(props) => (props.isSelected === true ? '#FF7455' : '#767676')};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

const TextReviewBox = styled.textarea`
    outline: none;
    display: flex;
    height: 153px;
    padding: 8px 16px;
    margin-bottom: 28px;
    border-radius: 8px;
    background: #f9f9f9;
    border: none;
    color: #212121;
    font-size: 16px;
    font-weight: 600;
    font-family: Pretendard Variable;
    line-height: 28px;
    &::placeholder {
        color: #aaa;
    }
    resize: none;
`;

const UploadPhoto = styled.label<{ image: string | null }>`
    display: inline-block;
    width: 62px;
    height: 62px;
    border-radius: ${({ image }) => (image ? '12px' : '0')};
    background-image: url(${(props) => props.image || Photo});
    background-size: cover;
`;

const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 568px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard Variable;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;

//나중에 리팩토링 꼭 하자.... 컴포넌트화 꼭 하자...
const BackSquare = styled.div`
    width: 100%;
    max-width: 568px;
    height: 96px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 5000;
`;
