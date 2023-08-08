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
import SearchSkeleton from '../assets/3dSearch.png';

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
                    <HeartList filterLiked={filterLiked} onFilterLikedChange={setFilterLiked} />
                    <DropDown onSelectSortOption={(option) => setSelectedSortOption(option)} />
                </Container>
                {keyword === '' ? (
                    <div></div>
                ) : (
                    <ContentContainer
                        keyword={debouncedSearchText}
                        filterLiked={filterLiked}
                        sort={selectedSortOption}
                        setRefresh={false}
                    />
                )}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 56px 16px 0px 16px;
    margin-top: 5px;
`;

const Container = styled.div`
    display: flex;
    height: 36px;
    justify-content: space-between;
    padding: 25px 0 16px 0;
    align-items: center;
`;
