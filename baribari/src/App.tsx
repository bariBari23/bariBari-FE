import './App.css';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Join from './page/Join';
import Login from './page/Login';
import Order from './page/Order';
import OrderList from './page/OrderList';
import Search from './page/Search';
import Cart from './page/Cart';
import Fav from './page/Fav';
import StoreDetail from './page/StoreDetail';
import UploadReview from './page/UploadReview';
import MyPage from './page/MyPage';
import SignUp3 from './page/SignUp3';

export default function App() {
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });
    return (
        <Container>
            <GlobalStyle />
            <InsideContainer>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/orderlist" element={<OrderList />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/detail" element={<StoreDetail />} />
                    <Route path="/uploadReview" element={<UploadReview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/fav" element={<Fav />} />
                    <Route path="/myPage" element={<MyPage />} />
                    <Route path="/signUp3" element={<SignUp3 />} />
                </Routes>
            </InsideContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    height: calc(var(--vh, 1vh) * 100);
    max-width: 600px;
    justify-content: center;
    margin: auto;
    @media ${(props) => props.theme.tablet} {
    }
`;

const InsideContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 8px 0;
`;
