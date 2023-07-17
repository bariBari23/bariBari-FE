import { styled } from 'styled-components';
import { SearchIcon } from './IconFin';

export default function SearchBar() {
    return (
        <SearchTab>
            <SearchInput placeholder="반찬이름을 검색해보세요" />
            <div style={{ padding: '3px' }}>
                <SearchIcon />
            </div>
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
