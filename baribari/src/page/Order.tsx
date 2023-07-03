import styled from 'styled-components';
import TopBar from '../component/TopBar';
import FoodDetailBox from '../component/StoreDetail/FoodDetailBox';
import {useState, useEffect} from 'react';
import StoreDetailBox from '../component/StoreDetail/StoreDetailBox';
import ReviewBox from '../component/StoreDetail/ReviewBox';

export default function Order(){
    const [active, setActive] = useState('반찬 상세');
    const changeDetailBox = (value: string) =>{
        setActive(value);
    }
    return(
        <Container>
            <TopBar page = {'결제하기'}/>
            <InsideBox>
                <UserInfoBox>
                    <div style={{fontSize: '18px', fontWeight: '700'}}>주문자 정보</div>
                    <PhoneInput placeholder='휴대폰 번호를 입력해주세요'></PhoneInput>

                </UserInfoBox>
                <FoodImgBox/>
                <DetailNav>
                    <InformBtn isSelected = {active==="반찬 상세"} onClick={() => changeDetailBox('반찬 상세')}>반찬 상세</InformBtn>
                    <InformBtn isSelected = {active==="가게 정보"} onClick={() => changeDetailBox('가게 정보')}>가게 정보</InformBtn>
                    <InformBtn isSelected = {active==="리뷰"} onClick={() => changeDetailBox('리뷰')}>리뷰</InformBtn>
                </DetailNav>
                <FoodDetailBox isSelected = {active==="반찬 상세"}/>
                <StoreDetailBox isSelected = {active==="가게 정보"}/>
                <ReviewBox isSelected = {active==="리뷰"}/>
                <AddBtn>장바구니에 넣기</AddBtn>
            </InsideBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

`
const InsideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    justify-content: flex-start;
    background-color: #F9F9F9;
`
const UserInfoBox = styled.div`
    display: flex;
    height: 92px;
    background-color: white;
    padding: 26px 16px 20px 8px;
    margin-bottom: 14px;
    flex-direction: column;
`
const PhoneInput = styled.input`
    display: flex;
    height: 44px;
    margin-top: 20px;
    width: 100%;
    border: solid 1px #767676;
    border-radius: 8px;
    padding-left: 8px;
    color: #767676;
    font-size: 16px;
    font-weight: 600;
`
const FoodImgBox = styled.div`
    display: flex;
    width: 100%;
    height: 240px;
    background-color: #EFEFEF;
`
const DetailNav = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    background-color: #F9F9F9;
    justify-content: space-between;
`
const InformBtn = styled.button<{isSelected: boolean}>`
    width: 33.33%;
    background: none;
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.isSelected === true ? '#FF7455' : '#AAAAAA')};
    font-size: 16px;
    font-weight: ${(props) => (props.isSelected === true ? '700' : '500')};
    border-bottom: ${(props) => (props.isSelected === true ? 'solid 2px #FF7455' : 'none')};
`
const AddBtn = styled.div`
    display: flex;
    padding: 18px 40px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    background: #FF7455;
    color: #FFF;
    font-size: 24px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    border: none;
  `