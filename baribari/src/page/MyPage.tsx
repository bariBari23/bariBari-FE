import styled from 'styled-components';
import Header from '../component/Header';
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { RPointerIcon } from '../component/Icon';
import { useNavigate } from 'react-router-dom';
import Navigator from '../component/Navigator';
import { getUserInfo } from '../apis/api/user';
import { useEffect, useState } from 'react';
import MapContainer from '../component/Map/MapContainer';

export default function MyPage() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const userAddress = '';
    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 });
    const handleFavClick = () => {
        navigate('/fav');
    };
    const callUserInfo = async () => {
        try {
            const userInfo = await getUserInfo();
            // console.log(userInfo);
            setNickname(userInfo.data.nickname);
            setUserPosition(userInfo.data.position);
        } catch (error) {
            console.log('Error', error);
        }
    };
    useEffect(() => {
        callUserInfo();
    }, []);
    return (
        <Container>
            <Header showPageName={true} pageTitle={'마이페이지'} showSearchBar={false} />
            <InsideBox>
                <ProfileBox>
                    <ProfileImage />
                    <div style={{ fontSize: '22px', fontWeight: '700', lineHeight: '60px', marginRight: 'auto' }}>
                        {nickname} 님
                    </div>
                    <Pencil style={{ marginRight: '0px' }} />
                </ProfileBox>
                <div style={{ backgroundColor: '#f9f9f9', height: '14px', width: '100%' }} />
                <KeywordBox>
                    <TextBox>내 위치</TextBox>
                    <Pencil style={{ marginRight: '0px', width: '24', height: '25' }} />
                </KeywordBox>
                <MapContainer
                    size={[500, 300]}
                    userAddress={userAddress}
                    userPosition={userPosition}
                    isSearched={true}
                />
                <KeywordBox style={{ padding: '20px 0', cursor: 'pointer' }} onClick={handleFavClick}>
                    <TextBox>즐겨찾는 가게</TextBox>
                    <RPointerIcon />
                </KeywordBox>
                <KeywordBox style={{ padding: '0' }}>
                    <TextBox>내가 쓴 리뷰</TextBox>
                    <RPointerIcon />
                </KeywordBox>
            </InsideBox>
            <Navigator />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InsideBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 126px;
    justify-content: flex-start;
    align-items: center;
    padding: 0 12px;
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
