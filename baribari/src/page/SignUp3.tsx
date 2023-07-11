import styled from 'styled-components';
import TopBar from '../component/TopBar';
import { SearchIcon } from '../component/Icon';
import { ReactComponent as Check } from '../asset/checkbox.svg';
import { ReactComponent as RPointerIcon } from '../asset/rpointerIcon.svg';

export default function SignUp3() {
    return (
        <Container>
            <TopBar page={'위치 설정'} />
            <InsideBox>
                <SearchTab>
                    집 주소를 설정하면, 주변 가게를 알려드려요.
                    <SearchIcon />
                </SearchTab>
                <MapBox />
                <AddBtn>다음</AddBtn>
                <AgreeBox>
                    <AllAgree>
                        <BigTextBox>전체 동의</BigTextBox>
                        <Check type="button" values="all" style={{ marginRight: '0', padding: '4px' }} />
                    </AllAgree>
                    <SubAgree>
                        <TextBox style={{ color: '#FF7455', paddingRight: '26px' }}>필수</TextBox>
                        <TextBox>서비스 이용약관</TextBox>
                        <RPointerIcon style={{ marginRight: 'auto' }} />
                        <Check
                            type="button"
                            values="service"
                            style={{ marginRight: '0', padding: '3px', width: '18px', height: '18px' }}
                        />
                    </SubAgree>
                    <SubAgree>
                        <TextBox style={{ color: '#FF7455', paddingRight: '26px' }}>필수</TextBox>
                        <TextBox>개인정보 수집 및 이용동의</TextBox>
                        <RPointerIcon style={{ marginRight: 'auto' }} />
                        <Check
                            type="button"
                            values="usage"
                            style={{ marginRight: '0', padding: '3px', width: '18px', height: '18px' }}
                        />
                    </SubAgree>
                    <SubAgree>
                        <TextBox style={{ color: '#FF7455', paddingRight: '26px' }}>필수</TextBox>
                        <TextBox>개인정보 제 3자 제공동의</TextBox>
                        <RPointerIcon style={{ marginRight: 'auto' }} />
                        <Check
                            type="button"
                            values="third"
                            style={{ marginRight: '0', padding: '3px', width: '18px', height: '18px' }}
                        />
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

const CheckBox = styled.input`
    appearance: none;
    display: flex;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    border: solid 2px #767676;
    position: relative;
    padding-right: 12px;

    &:checked {
        background-color: #ff7455;
        border-color: #ff7455;
    }

    &:checked::before {
        content: '';
        position: absolute;
        margin: auto;
        border: solid white;
        left: 4px;
        top: 1px;
        border-width: 0 2px 2px 0;
        height: 6px;
        width: 4px;
        transform: rotate(45deg);
    }
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
