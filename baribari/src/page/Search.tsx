import { styled } from 'styled-components';
import ContentContainer from '../component/ContentContainer';
import DropDown from '../component/DropDown';
import Header from '../component/Header';
import HeartList from '../component/HeartList';
import Navigator from '../component/Navigator';

export default function Search() {
    return (
        <div>
            <Header showPageName={false} pageTitle="" showSearchBar={true} />
            <Wrapper>
                <Container>
                    <HeartList />
                    <DropDown />
                </Container>
                <ContentContainer />
            </Wrapper>
            <Navigator />
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 95px 16px 0px 16px;
    margin-top: 5px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
