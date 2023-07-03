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
        <>
            <GlobalStyle />
            <Container>바리바리가 최고</Container>
            <button>얍</button>
        </>
    );
}


const Container = styled.div`
background-color: black;

@media ${props => props.theme.tablet}{
    background-color: orange;
}
`