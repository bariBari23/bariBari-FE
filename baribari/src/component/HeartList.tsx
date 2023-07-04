import { styled } from 'styled-components';

export default function HeartList() {
    return <HeartListButton>찜한 가게</HeartListButton>;
}

const HeartListButton = styled.button`
    width: 76px;
    height: 33px;
    border-radius: 8px;
    background: #fff1ee;
    color: #ff7455;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: none;
`;
