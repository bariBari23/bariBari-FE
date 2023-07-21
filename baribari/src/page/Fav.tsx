import Header from '../component/Header';
import Navigator from '../component/Navigator';
import { FilledHeartBigIcon } from '../component/IconFin';
import { styled } from 'styled-components';
import { cancelStoreLike, clickStoreLike, getLikedStoreInfo } from '../apis/api/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StoreLikedItem } from '../utils/interface';

export default function Fav() {
    const { status, data, refetch } = useQuery(['likedStoreInfo'], getLikedStoreInfo);

    const { mutate: likeStore } = useMutation(clickStoreLike, {
        onSuccess: () => {
            refetch(); // API 호출 성공 시 데이터를 리프레시합니다.
        },
    });

    const { mutate: unlikeStore } = useMutation(cancelStoreLike, {
        onSuccess: () => {
            refetch(); // API 호출 성공 시 데이터를 리프레시합니다.
        },
    });

    if (status === 'loading') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        return <span>Error</span>;
    }

    const handleLikeToggle = (storeId: number) => {
        // 해당 storeId가 이미 즐겨찾기에 있는지 확인
        const isLiked = data.data.likeList.some((item: any) => item.storeId === storeId);

        if (isLiked) {
            // 이미 즐겨찾기에 있는 경우, 취소
            unlikeStore(storeId);
        } else {
            // 즐겨찾기에 없는 경우, 추가
            likeStore(storeId);
        }
    };

    return (

        <div>
            <Wrapper>
                <Header showPageName={true} pageTitle="즐겨찾기" showSearchBar={false} />
                {data.data.likeList.map((item: StoreLikedItem) => (
                    <StoreTab key={item.storeId}>
                        <StoreImg />
                        <StoreInfo>
                            <p style={{ margin: '0px' }}>{item.storeName}</p>
                        </StoreInfo>
                        <FilledHeartBigIcon onClick={() => handleLikeToggle(item.storeId)} />
                    </StoreTab>
                ))}
            </Wrapper>
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
