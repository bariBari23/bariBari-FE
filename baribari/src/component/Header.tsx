import { styled } from 'styled-components';
import { ReactComponent as LeftArrow } from '../assets/left-arrow.svg';
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
            <LeftArrow />
            {showPageName && <p>{pageTitle}</p>}
            {/* 검색창도 넣을 수 있게 구현 예정 */}
            {showSearchBar}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    width: 100%;
    height: 5.75rem;
`;

export default Header;
