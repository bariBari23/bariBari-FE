import styled from 'styled-components';
import {LeftArrowIcon} from '../component/Icon';
export default function TopBar({page} : {page: String}){
    return(
        <Container>
            <IconBox><LeftArrowIcon/></IconBox>
            <TitleBox>{page}</TitleBox>
        </Container>
    );
}

const Container = styled.div`
    width: calc(100vw - 32px);
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 48px 8px 16px 16px;
    background-color: white;

    position: fixed;
    margin: auto;
    top: 0;
    z-index: 10000;
`
const IconBox = styled.div`
    display: flex;
    width: 32px;
    padding-right: 8px;
`

const TitleBox = styled.div`
    display: flex;
    color: ${props => props.theme.black};
    font-size: 22px;
    font-weight: 700;
`