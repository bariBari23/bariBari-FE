import styled from 'styled-components';
import TopBar from '../component/TopBar';

export default function StoreDetail(){
    return(
        <Container>
            <TopBar/>
            <FoodImgBox/>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const FoodImgBox = styled.div`
    display: flex;
    width: 100%;
    height: 240px;
    background-color: black;
`