import styled from 'styled-components';
import TopBar from '../component/TopBar';
import FoodDetailBox from '../component/StoreDetail/FoodDetailBox';

export default function StoreDetail(){
    return(
        <Container>
            <TopBar/>
            <InsideBox>
                <FoodImgBox/>
                <DetailNav>
                </DetailNav>
                <FoodDetailBox/>
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
`
