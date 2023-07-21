import { useQuery } from 'react-query';
import styled from 'styled-components';
import { searchById } from '../../apis/api/search';
import { getStoreInfo } from '../../apis/api/store';

export default function StoreDetailBox({ isSelected, id }: { isSelected: boolean; id: number }) {
    // const { data: storeData, isLoading, error } = useQuery(['store', id], () => getStoreInfo(id));
    // const { data: dosirakData } = useQuery(['dosirak', id], () => searchById(id));
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error occurred</div>;
    // }
    return (
        <Container isSelected={isSelected}>
            <MainBox>
                <TitleBox>
                    {/* <div style={{ height: '21px', marginRight: 'auto', marginBottom: '11px' }}>
                        {storeData.data.storeName}
                    </div> */}
                    <div style={{ height: '21px' }}>4.4</div>
                </TitleBox>
                <CallBtn style={{ marginRight: '12px' }}>연락하기</CallBtn>
            </MainBox>
            <SubBox style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <InfoBox>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>가게 위치</div>{' '}
                        {/* <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            {storeData.data.storeAddress}
                        </div>{' '} */}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>연락처</div>{' '}
                        {/* <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            {storeData.data.businessNumber}
                        </div>{' '} */}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>운영시간</div>{' '}
                        {/* <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            {storeData.data.dayList}
                        </div>{' '} */}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>휴무일</div>{' '}
                        {/* <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            {storeData.data.offDay}
                        </div>{' '} */}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>도보 거리</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            걸어서 5분 {/*여기 수정*/}
                        </div>{' '}
                    </div>
                </InfoBox>
                <MapBox />
            </SubBox>
            <SubBox style={{ height: '250px' }}>
                <InfoBox>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>원산지</div>{' '}
                        {/* <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            {dosirakData.data.fromWhere}
                        </div>{' '} */}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>중량/용량</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>500g {/*수정*/}</div>{' '}
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '16px' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>끼니</div>{' '}
                        <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>2끼 {/*수정*/}</div>{' '}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {' '}
                        <div style={{ width: '70px', color: '#949494', fontWeight: '400' }}>안내사항</div>{' '}
                        {/* <div style={{ paddingLeft: '12px', color: '#212121', fontWeight: '500' }}>
                            {storeData.data.description}
                        </div>{' '} */}
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
    width: 73px;
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
`;
const MapBox = styled.div`
    display: flex;
    width: 100%;
    height: 180px;
    border-radius: 12px;
    background-color: #ff9955;
`;
