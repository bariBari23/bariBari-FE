import { styled } from 'styled-components';
import { useState } from 'react';
import { HeartListProps } from '../utils/interface';

export default function HeartList({ filterLiked, onFilterLikedChange }: HeartListProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onFilterLikedChange(!isClicked);
    };

    return (
        <HeartListButton onClick={handleClick} $isclicked={isClicked}>
            찜한 가게
        </HeartListButton>
    );
}

const HeartListButton = styled.button<{ $isclicked: boolean }>`
    width: 80px;
    height: 36px;
    padding: 8px 12px;
    border-radius: 8px;
    background: ${(props) => (props.$isclicked ? '#fff1ee' : '#F9F9F9')};
    color: ${(props) => (props.$isclicked ? '#FF7455' : '#767676')};
    text-align: center;
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    border: none;
`;
