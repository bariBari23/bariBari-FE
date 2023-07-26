import { styled } from 'styled-components';
import { SearchIcon } from './IconFin';
import { debounce } from 'lodash';
import { useRecoilState } from 'recoil';
import { keywordsState } from '../utils/atom';
import { useEffect, useState } from 'react';
import useDebounce from '../utils/useDebounce';

export default function SearchBar({ onKeywordChange }: { onKeywordChange: (keyword: string) => void }) {
    const [keyword, setKeyword] = useRecoilState(keywordsState);

    // debounce된 검색어를 가져옴
    const debouncedSearchText = useDebounce(keyword, 500);

    // 검색어가 변경될 때마다 실행될 콜백 함수
    useEffect(() => {
        onKeywordChange(debouncedSearchText);
    }, [debouncedSearchText]);

    return (
        <SearchTab>
            <SearchInput
                placeholder="반찬 메뉴를 검색해보세요"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setKeyword(e.target.value)}
                value={keyword}
            />
            <SearchIcon />
        </SearchTab>
    );
}

const SearchTab = styled.div`
    width: calc(100vw - 88px);
    height: 28px;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    border-radius: 8px;
    background-color: #efefef;
    gap: 4px;
`;
const SearchInput = styled.textarea`
    width: calc(100vw - 112px);
    display: flex;
    color: #504e5f;
    align-items: center;
    font-family: Pretendard Variable;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    border: none;
    background-color: #efefef;
    resize: none;
    height: 28px;
    outline: none;
    &::placeholder {
        color: #949494;
    }
`;
