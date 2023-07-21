import { styled } from 'styled-components';
import ContentContainer from '../component/ContentContainer';
import DropDown from '../component/DropDown';
import Header from '../component/Header';
import HeartList from '../component/HeartList';
import Navigator from '../component/Navigator';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { keywordsState } from '../utils/atom';
import useDebounce from '../utils/useDebounce';

export default function Search() {
    const [filterLiked, setFilterLiked] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [keyword, setKeyword] = useRecoilState(keywordsState);

    const debouncedSearchText = useDebounce(keyword, 500);
    useEffect(() => {
        setKeyword(debouncedSearchText);
    }, [debouncedSearchText]);

    return (
        <div>
            <Header showPageName={false} pageTitle="" showSearchBar={true} />
            <Wrapper>
                <Container>
                    <HeartList /*filterLiked={filterLiked}*/ /*onFilterLikedChange={setFilterLiked}*/ />
                    <DropDown onSelectSortOption={(option) => setSelectedSortOption(option)} />
                </Container>
                <ContentContainer keyword={debouncedSearchText} filterLiked={filterLiked} sort={selectedSortOption} />
            </Wrapper>
            <Navigator />
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 16px;
    margin-top: 5px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
