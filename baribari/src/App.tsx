import './App.css';
import { useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';


export default function App({}) {
    function setScreenSize(){
        let vh = window.innerHeight*0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });
    return (
        <Container>
            <GlobalStyle />
        </Container>
    );
}


const Container = styled.div`
    height: calc(var(--vh, 1vh) * 100);
    background-color: black;

@media ${props => props.theme.tablet}{
    
}
`