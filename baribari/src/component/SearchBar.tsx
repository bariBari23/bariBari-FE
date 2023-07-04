import { styled } from 'styled-components';
import { SearchIcon } from './Icon';

export default function SearchBar() {
    return (
        <SearchTab>
            <SearchInput placeholder="반찬이름을 검색해보세요" />
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
    border-radius: 8px;
    background-color: #efefef;
    color: #949494;
`;
const SearchInput = styled.textarea`
    color: var(--grey-4, #949494);
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
`;