import { useReducer } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import { SearchIcon } from '../component/Icon';
import CheckIcon from '../component/CheckIcon';
import { ReactComponent as RPointerIcon } from '../assets/rpointerIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function SignUp3() {
    const [state, dispatch] = useReducer(
        (state: { [x: string]: boolean }, action: { type: string }) => {
            switch (action.type) {
                case 'all':
                    return { all: !state.all, service: !state.all, usage: !state.all, third: !state.all };
                case 'service':
                case 'usage':
                case 'third':
                    return { ...state, [action.type]: !state[action.type] };
                default:
                    return state;
            }
        },
        {
            all: false,
            service: false,
            usage: false,
            third: false,
        },
    );

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
                <AgreeBox>
                    <AllAgree>
                        <BigTextBox>전체 동의</BigTextBox>
                        <CheckIcon onClick={() => dispatch({ type: 'all' })} active={state.all} isAll={true} />
                    </AllAgree>
                    <SubAgree>
                        <TextBox style={{ color: '#FF7455', paddingRight: '26px' }}>필수</TextBox>
                        <TextBox>서비스 이용약관</TextBox>
                        <RPointerIcon style={{ marginRight: 'auto' }} />
                        <CheckIcon onClick={() => dispatch({ type: 'service' })} active={state.service} isAll={false} />
                    </SubAgree>
                    <SubAgree>
                        <TextBox style={{ color: '#FF7455', paddingRight: '26px' }}>필수</TextBox>
                        <TextBox>개인정보 수집 및 이용동의</TextBox>
                        <RPointerIcon style={{ marginRight: 'auto' }} />
                        <CheckIcon onClick={() => dispatch({ type: 'usage' })} active={state.usage} isAll={false} />
                    </SubAgree>
                    <SubAgree>
                        <TextBox style={{ color: '#FF7455', paddingRight: '26px' }}>필수</TextBox>
                        <TextBox>개인정보 제 3자 제공동의</TextBox>
                        <RPointerIcon style={{ marginRight: 'auto' }} />
                        <CheckIcon onClick={() => dispatch({ type: 'third' })} active={state.third} isAll={false} />
                    </SubAgree>
                </AgreeBox>
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
    margin: 16px 16px 20px 16px;
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
    height: 400px;
    background-color: grey;
`;

const AgreeBox = styled.div`
    margin: 28px 16px;
    width: calc(100% - 32px);
`;

const AllAgree = styled.div`
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: solid 1px #ececec;
`;

const SubAgree = styled.div`
    display: flex;
    align-items: center;
    margin-top: 16px;
`;

const BigTextBox = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
    margin-right: auto;
`;

const TextBox = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    padding-right: 12px;
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
