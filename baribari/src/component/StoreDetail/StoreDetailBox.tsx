import { useQuery } from 'react-query';
import styled from 'styled-components';
import { searchById } from '../../apis/api/search';
import { getStoreInfo } from '../../apis/api/store';
import MapCapture from '../../assets/MapCapture.png';
import MapContainer from '../Map/MapContainer';
import { useState } from 'react';
import Star from '../../assets/plainStar';

export default function StoreDetailBox({ isSelected, storeData }: { isSelected: boolean; storeData: any }) {
    const storeAddress = '';
    const userPosition = { latitude: storeData.data.position.latitude, longitude: storeData.data.position.longitude };
    const onCall = () => {
        document.location.href = `tel:${storeData.data.phoneNumber}`;
    };

    return (
        <Container isSelected={isSelected}>
            <MainBox>
                <TitleBox>
                    <div style={{ height: '21px', marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {storeData.data.storeName}
                        <div
                            style={{
                                height: '21px',
                                marginTop: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px',
                                justifyContent: 'center',
                                color: '#000',
                                fontWeight: '700',
                                lineHeight: '21px',
                            }}
                        >
                            {isNaN(parseFloat(storeData.data.reviewMean))
                                ? '0.0'
                                : parseFloat(storeData.data.reviewMean).toFixed(1)}
                            <div
                                style={{
                                    marginLeft: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <Star
                                        width={14.3}
                                        key={starNumber}
                                        starNumber={starNumber}
                                        selected={starNumber <= parseFloat(storeData.data.reviewMean)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </TitleBox>
                <CallBtn
                    style={{ margin: 'auto 12px auto auto', display: 'flex', alignItems: 'center' }}
                    onClick={onCall}
                >
                    연락하기
                </CallBtn>
            </MainBox>
            <SubBox style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <InfoBox>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>가게 위치</div>{' '}
                        <div
                            style={{
                                display: 'flex',
                                paddingLeft: '12px',
                                color: '#212121',
                                fontWeight: '400',
                                flex: '1',
                            }}
                        >
                            {storeData.data.storeAddress}
                        </div>{' '}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>연락처</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '400' }}>
                            {storeData.data.businessNumber}
                        </div>{' '}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>운영시간</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '400' }}>
                            {storeData.data.dayList}
                        </div>{' '}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>휴무일</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '400' }}>
                            {storeData.data.offDay}
                        </div>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>도보 거리</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '400' }}>
                            걸어서 5분 {/*여기 수정*/}
                        </div>{' '}
                    </div>
                </InfoBox>
                <MapContainer
                    size={['93vw', 180]}
                    userAddress={storeAddress}
                    userPosition={userPosition}
                    isSearched={false}
                    isStoreLocation={true}
                />
                {/* <img src={MapCapture} style={{ height: '180px', borderRadius: '12px', objectFit: 'cover' }} /> */}
            </SubBox>
            <SubBox style={{ height: '250px' }}>
                <InfoBox>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>원산지</div>{' '}
                        <div
                            style={{
                                width: 'calc(100% - 70px)',
                                paddingLeft: '12px',
                                color: '#212121',
                                fontWeight: '500',
                            }}
                        >
                            {storeData.data.fromWhere}
                        </div>{' '}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>위생정보</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '400' }}>
                            {storeData.data.clean}
                        </div>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {' '}
                        <div style={{ flex: '0 0 70px', color: '#949494', fontWeight: '400' }}>안내사항</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '400' }}>
                            {storeData.data.description}
                        </div>{' '}
                    </div>
                </InfoBox>
            </SubBox>
        </Container>
    );
}

const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isSelected === true ? 'flex' : 'none')};
    flex-direction: column;
`;
const MainBox = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: white;
    width: 100%;
    height: 58px;
`;
const TitleBox = styled.div`
    display: flex;
    height: 28px;
    flex-direction: column;
    margin: 0 auto 0 12px;
    justify-content: flex-start;
    font-size: 18px;
    font-weight: 700;
`;
const CallBtn = styled.button`
    display: flex;
    height: 33px;
    width: 80px;
    border: solid 1px #767676;
    background-color: #f9f9f9;
    color: #767676;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    justify-content: center;
    align-items: center;
`;
const SubBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-top: 14px;
    padding: 20px 12px 20px 12px;
`;
const InfoBox = styled.div`
    height: 204px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
`;
const MapBox = styled.div`
    display: flex;
    width: 100%;
    height: 180px;
    border-radius: 12px;
    background-color: #ff9955;
`;
