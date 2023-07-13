import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { LocaIcon } from './IconFin';
import FoodPic1 from '../assets/FoodPic1.svg';
import FoodPic2 from '../assets/FoodPic2.svg';

export default function RandomTabs() {
    const [randomTab, setRandomTab] = useState(0);

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
            {randomTab === 0 ? (
                <Container>
                    <Text>
                        <Header>
                            매일 출석 체크하고 <Highlight>10%</Highlight> 할인 쿠폰 받아요!
                        </Header>
                        <SubHeader>
                            <LocaIcon />
                            서울특별시 서대문구 대신동 125-16
                        </SubHeader>
                    </Text>
                    <img src={FoodPic1} alt="FoodPic1" />
                </Container>
            ) : (
                <Container>
                    <Text>
                        <Header>
                            바리바리에서 첫 구매시 <Highlight>15%</Highlight> 할인!
                        </Header>
                        <SubHeader>
                            <LocaIcon />
                            서울특별시 서대문구 대신동 125-16
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
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0px 0px 0px 18px;
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
    gap: 8px;
    margin-top: 0px;
`;
