import { styled } from 'styled-components';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { RPointerBigIcon, SearchIcon } from '../component/IconFin';
import Navigator from '../component/Navigator';
import ContentContainer from '../component/ContentContainer';
import RandomTab from '../component/RandomTab';
import DropDown from '../component/DropDown';
import HeartList from '../component/HeartList';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SvgSprite from '../component/Sprite';

export default function Home() {
    const navigate = useNavigate();
    const [filterLiked, setFilterLiked] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');

    const handleCartClick = () => {
        navigate('/cart'); // 장바구니 페이지로 이동
    };
    const handleBellClick = () => {
        alert('아직 알림이 온 게 없어요!');
    };
    const handleInquiryClick = () => {
        const url = 'https://decisive-fahrenheit-52b.notion.site/cfbed6717e864f30a487fc616b3ddbe9?pvs=4';
        window.open(url, '_blank');
    };
    return (
        <div>
            <SvgSprite />
            <HeaderHome>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <Logo />
                </Link>
                <RightSideHeader>
                    <svg width="34" height="32" onClick={handleBellClick}>
                        <use xlinkHref="#property-1-notification" />
                    </svg>
                    <svg width="32" height="32" onClick={handleCartClick}>
                        <use xlinkHref="#property-1-cart" />
                    </svg>
                </RightSideHeader>
            </HeaderHome>

            <RandomTab />
            <WrapperTab>
                <InquiryTab onClick={handleInquiryClick}>
                    <div>
                        <InquiryTabTitle>바리바리에 입점 문의하기</InquiryTabTitle>
                        <InquiryTabSub>바리바리에 입점하고 더 많은 수익 창출해보세요!</InquiryTabSub>
                    </div>
                    <RPointerBigIcon />
                </InquiryTab>
                <Link to="/search" style={{ textDecoration: 'none', width: 'calc(100% - 32px)' }}>
                    <SearchTab>
                        <SearchText>반찬 메뉴를 검색해보세요</SearchText>
                        <SearchIcon
                            style={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}
                        />
                    </SearchTab>
                </Link>
            </WrapperTab>
            <WrapperList>
                <Container>
                    <HeartList filterLiked={filterLiked} onFilterLikedChange={setFilterLiked} />
                    <DropDown onSelectSortOption={(option) => setSelectedSortOption(option)} />
                </Container>
                <ContentContainer
                    keyword={null}
                    filterLiked={filterLiked}
                    sort={selectedSortOption}
                    setRefresh={true}
                />
            </WrapperList>
            <WrapperNav>
                <Navigator />
            </WrapperNav>
        </div>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WrapperTab = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const WrapperList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: space-between;
    padding: 0 16px;
    margin-top: 5px;
    margin-bottom: 110px;
`;

const WrapperNav = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const HeaderHome = styled.div`
    display: flex;
    padding: 48px 16px 8px 16px;
    justify-content: space-between;
    align-items: center;
`;

const RightSideHeader = styled.div`
    display: flex;
    gap: 4px;
`;

const InquiryTab = styled.div`
    display: flex;
    width: calc(100% - 64px);
    margin: 0 16px;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    background: #fff1ee;
`;

const InquiryTabTitle = styled.div`
    color: #ff7455;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
`;

const InquiryTabSub = styled.div`
    color: #949494;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
`;

const SearchTab = styled.button`
    height: 45px;
    width: 100%;
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: none;
    background-color: #efefef;
    color: #949494;
    font-family: Pretendard Variable;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

const SearchText = styled.div`
    color: #949494;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;
