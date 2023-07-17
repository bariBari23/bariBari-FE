import Header from '../component/Header';
import Navigator from '../component/Navigator';
import { FilledHeartBigIcon } from '../component/IconFin';
import { styled } from 'styled-components';
import { ReactComponent as Star } from '../assets/StarIcon.svg';

const DATA = [
    {
        status: 'success',
        data: {
            likeList: [
                {
                    storeId: 2,
                    storeName: '유미네 반찬가게',
                },
                {
                    storeId: 3,
                    storeName: '오씨네 반찬가게',
                },
                {
                    storeId: 4,
                    storeName: '민주네 반찬가게',
                },
            ],
        },
    },
];

export default function Fav() {
    return (
        <Wrapper>
            <Header showPageName={true} pageTitle="즐겨찾기" showSearchBar={false} />
            {DATA[0].data.likeList.map((item) => (
                <StoreTab key={item.storeId}>
                    <StoreImg />
                    <StoreInfo>
                        <p style={{ margin: '0px' }}>{item.storeName}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <p style={{ margin: '0px 8px 0px 0px', fontSize: '18px', fontWeight: '700' }}>4.4</p>
                            {/* 별점에 따라 별 갯수 달라짐 */}
                            {/*<Star />
                            <Star />
                            <Star />
                            <Star />
            <Star />*/}
                        </div>
                    </StoreInfo>
                    <FilledHeartBigIcon />
                </StoreTab>
            ))}
            <Navigator />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 90vh;
    width: 100%;
    padding-top: 70px;
`;

const StoreTab = styled.div`
    display: flex;
    margin: 8px 16px 20px 16px;
    gap: 16px;
    align-items: center;
`;

const StoreImg = styled.div`
    width: 52px;
    height: 52px;
    background: lightgrey;
    border-radius: 8px;
`;

const StoreInfo = styled.div`
    color: #212121;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 4px;
`;
