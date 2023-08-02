import { useNavigate } from 'react-router-dom';
import { ReactComponent as SignUpFinish } from '../assets/SignUpFinish.svg';
import { styled } from 'styled-components';
import Header from '../component/Header';

export default function SignUp4() {
    const navigate = useNavigate();

    const onClickButton = () => {
        navigate('/home');
    };

    return (
        <Container>
            <Header showPageName={false} pageTitle={''} showSearchBar={false} />
            <InsideBox>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text>가입이 완료되었어요!</Text>
                    <Text>이제부터 건강한 한끼를 전해드릴게요</Text>
                </div>
                <SignUpFinish />
                <Button onClick={onClickButton}>완료</Button>
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

const Text = styled.p`
    margin: 0px;
    color: #504e5f;
    font-family: Pretendard Variable;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
`;

const Button = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 464px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard Variable;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;
