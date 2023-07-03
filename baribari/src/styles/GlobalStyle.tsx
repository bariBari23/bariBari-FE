import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }  

  
  body {
    font-family: 'Pretendard-Regular';
    line-height: 1.5;
  }
  
  button{
    display: flex;
    width: 366px;
    padding: 18px 40px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    background: #FF7455;
    color: #FFF;
    font-size: 24px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    border: none;
  }
`;
