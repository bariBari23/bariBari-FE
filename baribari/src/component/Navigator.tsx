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
            <NavCard active={currentPage === 'order'} onClick={() => handlePageChange('order')}>
                <OrderListIcon />
                <p>주문내역</p>
            </NavCard>
            <NavCard active={currentPage === 'home'} onClick={() => handlePageChange('home')}>
                <HomeIcon />
                <p>홈</p>
            </NavCard>
            <NavCard active={currentPage === 'myPage'} onClick={() => handlePageChange('myPage')}>
                <MyPageIcon />
                <p>마이페이지</p>
            </NavCard>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
`;
const NavCard = styled.nav<{ active: boolean }>`
    display: flex;
    width: 119.333px;
    padding: 16px 0px 24px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    color: ${({ active }) => (active ? '#FF7455' : '#AAAAAA')};
    filter: ${({ active }) =>
        active ? '#FF7455' : 'invert(57%) sepia(0%) saturate(0%) hue-rotate(264deg) brightness(103%) contrast(88%)'};
    cursor: pointer;
`;
