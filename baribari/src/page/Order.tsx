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
                <InfoBox>
                    <div style={{fontSize: '18px', fontWeight: '700'}}>주문자 정보</div>
                    <PhoneInput placeholder='휴대폰 번호를 입력해주세요'></PhoneInput>
                </InfoBox>
                <InfoBox style={{height: '201px', paddingTop: '20px'}}>
                    <div style={{fontSize: '18px', fontWeight: '700'}}>픽업 시간</div>
                    <CheckBox></CheckBox>
                </InfoBox>
            
                <ReviewBox isSelected = {active==="리뷰"}/>
                <AddBtn>19,000원 결제하기</AddBtn>
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
const InfoBox = styled.div`
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
    border: solid 1px #767676;
    border-radius: 8px;
    padding-left: 8px;
    color: #767676;
    font-size: 16px;
    font-weight: 600;
`
const CheckBox = styled.input`
    display: flex;
    height: 140px;
    margin-top: 20px;
    padding-bottom: 1px;
    border: none;
    color: #767676;
    font-size: 16px;
    font-weight: 600;
`
const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 48px);
    border-radius: 12px;
    background: #FF7455;
    color: #FFF;
    font-size: 24px;
    font-family: Pretendard;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    left: 24px;
    bottom: 8px;
    z-index: 10000;
  `