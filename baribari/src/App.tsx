import './App.css';
import { ReactElement, ReactNode, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAccessToken } from './apis/cookie';

const queryClient = new QueryClient();

function CheckLogin({ children }: { children: ReactNode }): ReactElement | null {
    const token = getAccessToken();

    if (!token) {
        alert('로그인이 필요합니다.');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

function CheckLogout({ children }: { children: ReactNode }): ReactElement | null {
    const token = getAccessToken();

    if (token) {
        alert('로그아웃 후 사용 가능한 서비스입니다.');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default function App() {
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <GlobalStyle />
                <InsideContainer>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/order"
                            element={
                                <CheckLogin>
                                    <Order />
                                </CheckLogin>
                            }
                        />
                        <Route
                            path="/orderlist"
                            element={
                                <CheckLogin>
                                    <OrderList />
                                </CheckLogin>
                            }
                        />
                        <Route path="/search" element={<Search />} />
                        <Route path="/detail/:id" element={<StoreDetail />} />
                        <Route
                            path="/uploadReview"
                            element={
                                <CheckLogin>
                                    <UploadReview />
                                </CheckLogin>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <CheckLogin>
                                    <Cart />
                                </CheckLogin>
                            }
                        />
                        <Route
                            path="/fav"
                            element={
                                <CheckLogin>
                                    <Fav />
                                </CheckLogin>
                            }
                        />
                        <Route
                            path="/myPage"
                            element={
                                <CheckLogin>
                                    <MyPage />
                                </CheckLogin>
                            }
                        />
                        <Route path="/signUp3" element={<SignUp3 />} />
                    </Routes>
                </InsideContainer>
            </Container>
        </QueryClientProvider>
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
    width: 100%;
    height: 100vh;
    margin: 8px 0;
`;
