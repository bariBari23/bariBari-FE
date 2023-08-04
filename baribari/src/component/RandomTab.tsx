import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import FoodPic1 from '../assets/FoodPic1.svg';
import FoodPic2 from '../assets/FoodPic2.svg';
import SvgSprite from './Sprite';
import { getUserLocation } from '../apis/api/location';
import { useRecoilValue } from 'recoil';
import { userAddressState } from '../utils/atom';
import { Cookies } from 'typescript-cookie';

export default function RandomTabs() {
    const [randomTab, setRandomTab] = useState(0);
    const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
    // const searchValue = useRecoilValue(userAddressState);
    const searchValue = Cookies.get('userAddress')
        ? JSON.stringify(Cookies.get('userAddress')).replace(/\"/g, '')
        : '서울 서대문구 이화여대길 52';

    useEffect(() => {
        const showUserLocation = async () => {
            try {
                const response = await getUserLocation();
                setUserLocation([response.data.latitude, response.data.longitude]);
            } catch (error) {
                console.log('Error', error);
            }
        };

        showUserLocation();
    }, []);

    useEffect(() => {
        const intervalId = setTimeout(() => {
            setRandomTab((prevTab) => (prevTab === 0 ? 1 : 0));
        }, 5000);

        return () => {
            clearTimeout(intervalId);
        };
    }, [randomTab]);

    return (
        <div>
            <SvgSprite />
            {randomTab === 0 ? (
                <Container>
                    <Text>
                        <Header>
                            매일 출석 체크하고 <br />
                            <Highlight>10%</Highlight> 할인 쿠폰 받아요!
                        </Header>
                        <SubHeader>
                            <svg width="20" height="20">
                                <use xlinkHref="#property-1-map-1" />
                            </svg>
                            {searchValue}
                        </SubHeader>
                    </Text>
                    <img src={FoodPic1} alt="FoodPic1" />
                </Container>
            ) : (
                <Container>
                    <Text>
                        <Header>
                            건강한 한끼가 만드는 <br />
                            <Highlight>행복</Highlight>을 느껴보세요!
                        </Header>
                        <SubHeader>
                            <svg width="20" height="20">
                                <use xlinkHref="#property-1-map-1" />
                            </svg>
                            {searchValue !== '' ? searchValue : '서울 서대문구 이화여대길 52'}
                        </SubHeader>
                    </Text>
                    <img src={FoodPic2} alt="FoodPic2" />
                </Container>
            )}
        </div>
    );
}
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    margin-bottom: 20px;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Header = styled.h2`
    color: #504e5f;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    margin-bottom: 0px;
`;

const Highlight = styled.span`
    color: #ff7455;
`;

const SubHeader = styled.div`
    color: #989898;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 0px;
`;
