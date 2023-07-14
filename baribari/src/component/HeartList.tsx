import { styled } from 'styled-components';
import { useState } from 'react';

export default function HeartList() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <HeartListButton onClick={handleClick} $isclicked={isClicked}>
            찜한 가게
        </HeartListButton>
    );
}

const HeartListButton = styled.button<{ $isclicked: boolean }>`
    width: 76px;
    height: 33px;
    border-radius: 8px;
    background: ${(props) => (props.$isclicked ? '#fff1ee' : '#d3d3d3')};
    color: ${(props) => (props.$isclicked ? '#FF7455' : '#767676')};
    text-align: center;
    font-family: Pretendard-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: none;
`;
