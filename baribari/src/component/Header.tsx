import { styled } from 'styled-components';
import { LeftArrowIcon } from './Icon';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

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

    return (
        <Container>
            <IconBox>
                <LeftArrowIcon onClick={handleGoBack} />
            </IconBox>
            {showPageName ? <TitleBox>{pageTitle}</TitleBox> : showSearchBar && <SearchBar />}
        </Container>
    );
};

const Container = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 48px 8px 16px 8px;
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
    color: ${(props) => props.theme.black};
    font-size: 22px;
    font-weight: 700;
`;

export default Header;
