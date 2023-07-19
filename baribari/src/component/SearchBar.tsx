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
                placeholder="반찬이름을 검색해보세요"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setKeyword(e.target.value)}
                value={keyword}
            />
            <SearchIcon />
        </SearchTab>
    );
}

const SearchTab = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background-color: #efefef;
    color: #949494;
`;
const SearchInput = styled.textarea`
    color: #504e5f;
    width: 465px;
    font-size: 16px;
    font-family: Pretendard-Regular;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    border: none;
    background-color: #efefef;
    resize: none;
    height: 32px;
    outline: none;
    &::placeholder {
        color: #949494;
    }
`;
