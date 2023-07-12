import { styled } from 'styled-components';
import { SearchIcon } from './Icon'; //이거 나중에 멀지하면서 IconFin으로 바꿔야 함

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
