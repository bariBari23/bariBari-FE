import { styled } from 'styled-components';
import { LeftArrowIcon } from './IconFin';
import SearchBar from './SearchBar';
const Header = ({
    showPageName,
    pageTitle,
    showSearchBar,
}: {
    showPageName: boolean;
    pageTitle: string;
    showSearchBar: boolean;
}) => {
    return (
        <HeaderContainer>
            <LeftArrowIcon />
            {/* 검색창도 넣을 수 있게 구현 예정  showSearchBar && <SearchBar/>로*/}
            {showPageName ? <PageTitle>{pageTitle}</PageTitle> : showSearchBar && <SearchBar />}
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
