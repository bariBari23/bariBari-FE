import { styled } from 'styled-components';
import { SearchIcon } from './IconFin';

export default function SearchBar() {
    return (
        <SearchTab>
            <SearchInput placeholder="반찬이름을 검색해보세요" />
            <SearchIcon />
        </SearchTab>
    );
}

const SearchTab = styled.div`
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 16px 8px 16px 8px;
    background-color: white;

    position: fixed;
    margin: auto;
    top: 0;
    z-index: 10000;
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
