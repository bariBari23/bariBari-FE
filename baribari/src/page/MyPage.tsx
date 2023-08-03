import styled from 'styled-components';
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { ReactComponent as Profile } from '../assets/img-profile.svg';
import { RPointerMedIcon } from '../component/IconFin';
import { useNavigate } from 'react-router-dom';
import Navigator from '../component/Navigator';
import { getUserInfo } from '../apis/api/user';
import { useEffect, useState } from 'react';
import MapContainer from '../component/Map/MapContainer';
import { allStoreDistance } from '../apis/api/location';
import { useRecoilState } from 'recoil';
import { storeAddressState } from '../utils/atom';

export default function MyPage() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const userAddress = '';
    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 });
    const [storeAddress, setStoreAddress] = useRecoilState(storeAddressState);

    const handleFavClick = (event: { stopPropagation: any; preventDefault: () => void }) => {
        navigate('/fav');
    };
    const callUserInfo = async () => {
        try {
            const userInfo = await getUserInfo();
            setNickname(userInfo.data.nickname);
            setUserPosition(userInfo.data.position);
        } catch (error) {
            console.log('Error', error);
        }
    };
    const callStoreLocation = async () => {
        try {
            const storeLocationData = await allStoreDistance();
            const storeAddressData = storeLocationData.data.distanceList.map(
                (item: { storeAddress: any }) => item.storeAddress,
            );
            setStoreAddress(storeAddressData); // Recoil 상태 업데이트
        } catch (error) {
            console.log('Error', error);
        }
    };
    useEffect(() => {
        callUserInfo();
        callStoreLocation();
    }, []);

    return (
        <Container>
            <Header>마이페이지</Header>
            <InsideBox>
                <ProfileBox>
                    <Profile />
                    <div style={{ fontSize: '22px', fontWeight: '700', lineHeight: '60px', marginRight: 'auto' }}>
                        {nickname} 님
                    </div>
                    <Pencil style={{ marginRight: '0px' }} />
                </ProfileBox>
                <div style={{ backgroundColor: '#f9f9f9', height: '14px', width: '100vw' }} />
                <KeywordBox>
                    <TextBox>내 위치</TextBox>
                    <Pencil style={{ marginRight: '0px', width: '24', height: '25' }} />
                </KeywordBox>

                <MapContainer
                    size={['95vw', 250]}
                    userAddress={userAddress}
                    userPosition={userPosition}
                    isSearched={false}
                    isStoreLocation={false}
                />

                <KeywordBox style={{ padding: '20px 0', cursor: 'pointer' }} onClick={handleFavClick}>
                    <TextBox>즐겨찾는 가게</TextBox>
                    <div style={{ padding: '8.5px' }}>
                        <RPointerMedIcon />
                    </div>
                </KeywordBox>
                <KeywordBox style={{ padding: '0' }}>
                    <TextBox>내가 쓴 리뷰</TextBox>
                    <div style={{ padding: '8.5px' }}>
                        <RPointerMedIcon />
                    </div>
                </KeywordBox>
            </InsideBox>
            <Navigator />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;

const InsideBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 70px;
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
    gap: 12px;
`;

const KeywordBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 14px 0;
`;

const TextBox = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    margin-right: auto;
    align-items: center;
`;

const Header = styled.div`
    height: 32px;
    width: 100%;
    padding: 25px 8px 8px 16px;
    background-color: white;
    position: fixed;
    margin: auto;
    top: 0;
    z-index: 10000;
    font-family: Pretendard Variable;
    color: #212121;
    font-size: 22px;
    font-weight: 700;
`;
