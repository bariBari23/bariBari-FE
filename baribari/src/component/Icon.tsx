import { styled } from 'styled-components';
import icon from '../assets/css_sprites.png';

// bell 아이콘
export const BellIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -10px -10px;
`;

// 장바구니 아이콘
export const OrderIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -10px -62px;
`;

// '>' 모양 아이콘
export const RPointerIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -168px -114px;
`;

// '<' 모양 아이콘
export const LPointerIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -10px -166px;
`;

// 'V' 모양 아이콘
export const DPointerIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -64px -10px;
    filter: invert(57%) sepia(0%) saturate(0%) hue-rotate(264deg) brightness(103%) contrast(88%);
`;

// '^' 모양 아이콘
export const UPointerIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -116px -10px;
    filter: invert(57%) sepia(0%) saturate(0%) hue-rotate(264deg) brightness(103%) contrast(88%);
`;

//왼쪽 화살표 아이콘
export const LeftArrowIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -114px -166px;
`;

//오른쪽 화살표 아이콘
export const RightArrowIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -62px -166px;
`;

//돋보기 모양 아이콘
export const SearchIcon = styled.button`
    width: 32px;
    height: 32px;
    filter: invert(57%) sepia(0%) saturate(0%) hue-rotate(264deg) brightness(103%) contrast(88%);
    background-image: url(${icon});
    background-position: -168px -62px;
`;

// gps 위치 아이콘
export const LocaIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -62px -114px;
`;

// 주문내역 아이콘
export const OrderListIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -114px -114px;
`;

// 홈 아이콘
export const HomeIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -10px -114px;
`;

// 마이페이지 아이콘
export const MyPageIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -168px -10px;
`;

//빈 하트 아이콘
export const EmptyHeartIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -62px -62px;
`;

//채워진 하트 아이콘
export const FilledHeartIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${icon});
    background-position: -116px -62px;
`;
