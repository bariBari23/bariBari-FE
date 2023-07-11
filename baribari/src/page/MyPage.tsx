import styled from 'styled-components';
import TopBar from '../component/TopBar';
import { ReactComponent as Pencil } from '../asset/pencil.svg';
import { RPointerIcon } from '../component/Icon';

export default function MyPage() {
    return (
        <Container>
            <TopBar page={'마이페이지'} />
            <InsideBox>
                <ProfileBox>
                    <ProfileImage />
                    <div style={{ fontSize: '22px', fontWeight: '700', lineHeight: '60px', marginRight: 'auto' }}>
                        바리바리 님
                    </div>
                    <Pencil style={{ marginRight: '0px' }} />
                </ProfileBox>
                <div style={{ backgroundColor: '#f9f9f9', height: '14px', width: '100%' }} />
                <KeywordBox>
                    <TextBox>내 위치</TextBox>
                    <Pencil style={{ marginRight: '0px', width: '24', height: '25' }} />
                </KeywordBox>
                <MapImage />
                <KeywordBox style={{ padding: '20px 0' }}>
                    <TextBox>즐겨찾는 가계</TextBox>
                    <RPointerIcon />
                </KeywordBox>
                <KeywordBox style={{ padding: '0' }}>
                    <TextBox>내가 쓴 리뷰</TextBox>
                    <RPointerIcon />
                </KeywordBox>
            </InsideBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 12px;
`;
const InsideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 126px;
    justify-content: flex-start;
    align-items: center;
`;

const ProfileBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: white;
    align-items: center;
    padding-bottom: 16px;
`;

const ProfileImage = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: grey;
    margin-right: 15px;
`;

const KeywordBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 14px 0;
`;

const TextBox = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    margin-right: auto;
`;

const MapImage = styled.div`
    width: 100%;
    height: 219px;
    border-radius: 12px;
    background-color: grey;
`;
