import { styled } from 'styled-components';
import { LeftArrowIcon } from './IconFin';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { currentPageState, keywordsState } from '../utils/atom';

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

    const [searchKeyword, setSearchKeyword] = useRecoilState(keywordsState); // 검색어 상태 추가
    // const resetSearchKeyword = useResetRecoilState(keywordsState);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    const handleSearchKeywordChange = (keyword: string) => {
        setSearchKeyword(keyword);
    };
    const handleGoBack = () => {
        navigate(`/${currentPage}`); // 이전 페이지로 이동
    };
    // useEffect(() => {
    //     // 다른 페이지로 이동할 때 Recoil 상태 초기화
    //     return () => {
    //         resetSearchKeyword();
    //     };
    // }, [resetSearchKeyword]);
    return (
        <Container>
            <IconBox>
                <div style={{ padding: '8px' }}>
                    <LeftArrowIcon onClick={handleGoBack} />
                </div>
            </IconBox>
            {showPageName ? (
                <TitleBox>{pageTitle}</TitleBox>
            ) : (
                showSearchBar && <SearchBar onKeywordChange={handleSearchKeywordChange} />
            )}
        </Container>
    );
};

const Container = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 25px 8px 8px 8px;
    background-color: white;

    position: fixed;
    margin: auto;
    top: 0;
    z-index: 10000;
`;
const IconBox = styled.div`
    display: flex;
    width: 32px;
    padding-right: 8px;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.black};
    font-size: 22px;
    font-weight: 700;
`;

export default Header;
