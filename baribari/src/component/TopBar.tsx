import styled from 'styled-components';
import {LeftArrowIcon} from '../component/Icon';
export default function TopBar(){
    return(
        <Container>
            <IconBox><LeftArrowIcon/></IconBox>
            <TitleBox>타이틀</TitleBox>
        </Container>
    );
}

const Container = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 48px 8px 8px 16px;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
`
const IconBox = styled.div`
    display: flex;
    width: 32px;
    padding-right: 8px;
`

const TitleBox = styled.div`
    display: flex;
    width: 100%;
    color: black;
    font-size: 22px;
    font-weight: 700;
`