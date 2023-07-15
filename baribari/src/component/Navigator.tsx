import { styled } from 'styled-components';
import { useState } from 'react';
import { OrderListIcon, HomeIcon, MyPageIcon } from './IconFin';
import { useNavigate } from 'react-router';

export default function Navigator() {
    const [currentPage, setCurrentPage] = useState('home');
    const navigate = useNavigate();

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        if (page === 'home') {
            navigate('/');
        } else {
            navigate(`/${page}`);
        }
    };
    return (
        <NavContainer>
            <NavCard $isactive={currentPage === 'orderlist'} onClick={() => handlePageChange('orderlist')}>
                <OrderListIcon />
                <span>주문내역</span>
            </NavCard>
            <NavCard $isactive={currentPage === 'home'} onClick={() => handlePageChange('home')}>
                <HomeIcon />
                <span>홈</span>
            </NavCard>
            <NavCard $isactive={currentPage === 'myPage'} onClick={() => handlePageChange('myPage')}>
                <MyPageIcon />
                <span>마이페이지</span>
            </NavCard>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    display: flex;
    width: 100%;
    height: 44px;
    padding: 16px 0 24px 0;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    background-color: white;
    max-width: 600px;

    position: fixed;
    bottom: 0;
    z-index: 200000;
`;
const NavCard = styled.nav<{ $isactive: boolean }>`
    display: flex;
    width: 119.333px;
    padding: 16px 0px 24px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: ${({ $isactive }) => ($isactive ? '#FF7455' : '#AAAAAA')};
    filter: ${({ $isactive }) =>
        $isactive ? '#FF7455' : 'invert(57%) sepia(0%) saturate(0%) hue-rotate(264deg) brightness(103%) contrast(88%)'};
    cursor: pointer;
`;
