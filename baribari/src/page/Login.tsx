import { styled } from 'styled-components';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Header from '../component/Header';

export default function LogIn() {
    return (
        <Wrapper>
            <Header showPageName={false} pageTitle="" showSearchBar={false} />
            <Logo />
            <p>자취생을 위한 건강한 식사 방법</p>
            <form></form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: beige;
    width: 24.375rem;
    height: 56.3125rem;
`;
