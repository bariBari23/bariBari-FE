import styled from 'styled-components';
import TopBar from '../component/TopBar';
import { useState, useEffect } from 'react';
import { ReactComponent as Star } from '../asset/star.svg';
import Photo from '../asset/photo.png';

type SelectedValue = {
    quantity: string;
    flavor: string;
    wrap: string;
    [key: string]: string;
};

export default function UploadReview() {
    const [selectedValue, setSelectedValue] = useState<SelectedValue>({ quantity: '', flavor: '', wrap: '' });
    const [image, setImage] = useState('');
    const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue({ ...selectedValue, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setImage(imageUrl);
        }
    };

    function ClickBox({ name, value, children }: { name: string; value: string; children: string }) {
        return (
            <CheckBox isSelected={selectedValue[name] === value}>
                <input type="radio" name={name} value={value} style={{ display: 'none' }} onChange={handleSelection} />
                {children}
            </CheckBox>
        );
    }

    return (
        <Container>
            <TopBar page={'리뷰 쓰기'} />
            <InsideBox>
                <StoreBox>
                    <StoreImageBox />
                    <StoreNameBox style={{ marginRight: 'auto' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', fontStyle: 'normal', lineHeight: '23px' }}>
                            반찬가게 이름 철산래미안점
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
                            7,000원
                        </div>{' '}
                    </StoreNameBox>
                </StoreBox>
                <SubText>주문하신 반찬에 별점을 남겨주세요.</SubText>
                <ScoreBox>
                    <ScoreStar>
                        <Star style={{ width: '160px', height: '26px' }} />
                    </ScoreStar>
                    <ScoreText>보통</ScoreText>
                </ScoreBox>
                <SubText>주문하신 반찬의 양은 어떠셨나요?</SubText>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ClickBox name="quantity" value="less">
                        양이 적어요
                    </ClickBox>
                    <ClickBox name="quantity" value="enough">
                        충분해요
                    </ClickBox>
                    <ClickBox name="quantity" value="more">
                        너무 많아요
                    </ClickBox>
                </div>
                <SubText>주문하신 반찬의 맛은 어떠셨나요?</SubText>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ClickBox name="flavor" value="less">
                        별로예요
                    </ClickBox>
                    <ClickBox name="flavor" value="enough">
                        보통이에요
                    </ClickBox>
                    <ClickBox name="flavor" value="more">
                        맛있어요
                    </ClickBox>
                </div>
                <SubText>주문하신 반찬의 포장 상태는 어떠셨나요?</SubText>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ClickBox name="wrap" value="less">
                        허술해요
                    </ClickBox>
                    <ClickBox name="wrap" value="enough">
                        보통이에요
                    </ClickBox>
                    <ClickBox name="wrap" value="more">
                        깔끔해요
                    </ClickBox>
                </div>
                <SubText>주문하신 반찬은 어떠셨나요?</SubText>
                <TextReviewBox placeholder="후기를 입력해주세요."></TextReviewBox>
                <UploadPhoto htmlFor="upload" image={image}>
                    <input type="file" id="upload" onChange={handleFileChange} style={{ display: 'none' }} />
                </UploadPhoto>
            </InsideBox>
            <AddBtn>리뷰 등록하기</AddBtn>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
`;
const InsideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    justify-content: flex-start;
    padding-bottom: 110px;
`;

const StoreBox = styled.div`
    display: flex;
    height: 70px;
    margin-top: 28px;
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
    border: ${(props) => (props.isSelected === true ? '2px' : '1px')} solid
        ${(props) => (props.isSelected === true ? '#FF7455' : '#EFEFEF')};
    color: ${(props) => (props.isSelected === true ? '#FF7455' : '#767676')};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

const TextReviewBox = styled.textarea`
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
    line-height: 28px;
    &::placeholder {
        color: #aaa;
    }
`;

const UploadPhoto = styled.label<{ image: string }>`
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
    max-width: 464px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    bottom: 16px;
    z-index: 10000;
`;
