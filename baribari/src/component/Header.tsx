import { styled } from 'styled-components';
import { LeftArrowIcon } from './IconFin';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { keywordsState } from '../utils/atom';

const Header = ({
    showPageName,
    pageTitle,
    showSearchBar,
}: {
    showPageName: boolean;
    pageTitle: string;
    showSearchBar: boolean;
}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };
    const [searchKeyword, setSearchKeyword] = useRecoilState(keywordsState); // 검색어 상태 추가
    const resetSearchKeyword = useResetRecoilState(keywordsState);
    const handleSearchKeywordChange = (keyword: string) => {
        setSearchKeyword(keyword);
    };
    useEffect(() => {
        // 다른 페이지로 이동할 때 Recoil 상태 초기화
        return () => {
            resetSearchKeyword();
        };
    }, [resetSearchKeyword]);
    return (
        <HeaderContainer>
            <LeftArrowIcon onClick={handleGoBack} />
            {showPageName ? (
                <PageTitle>{pageTitle}</PageTitle>
            ) : (
                showSearchBar && <SearchBar onKeywordChange={handleSearchKeywordChange} />
            )}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    padding: 48px 8px 8px 8px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const PageTitle = styled.div`
    color: var(--grey-subtext, #504e5f);
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    margin-left: 8px;
`;

export default Header;
