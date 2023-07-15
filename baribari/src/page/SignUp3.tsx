import styled from 'styled-components';
import Header from '../component/Header';
import { SearchIcon } from '../component/Icon';
import { useNavigate } from 'react-router-dom';

export default function SignUp3() {
    const navigate = useNavigate();

    const onSubmit = () => {
        // navigate('/signUp4') 나중에 수정 예정
        alert('나중에 signUp4로 루트 수정 예정');
        navigate('/login');
    };
    return (
        <Container>
            <Header showPageName={true} pageTitle={'위치 설정'} showSearchBar={false} />
            <InsideBox>
                <SearchTab>
                    집 주소를 설정하면, 주변 가게를 알려드려요.
                    <SearchIcon />
                </SearchTab>
                <MapBox />
                <AddBtn onClick={onSubmit}>다음</AddBtn>
            </InsideBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InsideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 80px;
`;
const SearchTab = styled.button`
    height: 45px;
    width: calc(100% - 32px);
    display: flex;
    margin: 16px 16px 30px 16px;
    margin-top: 
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: none;
    background-color: #efefef;
    color: #949494;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;
const MapBox = styled.div`
    width: 100%;
    height: 500px;
    background-color: grey;
`;

const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 464px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;
