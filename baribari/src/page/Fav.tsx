import Header from '../component/Header';
import Navigator from '../component/Navigator';
import { FilledHeartBigIcon } from '../component/IconFin';
import { styled } from 'styled-components';
import { cancelStoreLike, clickStoreLike, getLikedStoreInfo } from '../apis/api/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StoreLikedItem } from '../utils/interface';
import StoreImage from '../assets/storeImg.png';
import SvgSprite from '../component/Sprite';
import HeartSkeleton from '../assets/3dHeart.png';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { lottie } from '../assets/lotti/index';

export default function Fav() {
    const { status, data, refetch } = useQuery(['likedStoreInfo'], getLikedStoreInfo);
    const navigate = useNavigate();
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
        return (
            <div>
                <Lottie animationData={lottie} />
            </div>
        );
    }

    if (status === 'error') {
        return <span>Error</span>;
    }

    const handleLikeToggle = (storeId: number) => {
        // 해당 storeId가 이미 즐겨찾기에 있는지 확인
        const isLiked = data.likeList.some((item: any) => item.storeId === storeId);
        if (isLiked) {
            // 이미 즐겨찾기에 있는 경우, 취소
            unlikeStore(storeId);
        } else {
            // 즐겨찾기에 없는 경우, 추가
            likeStore(storeId);
        }
    };

    const handleClickNavButton = () => {
        navigate(`/home`);
    };

    return (
        <div>
            <Wrapper>
                <Header showPageName={true} pageTitle="즐겨찾기" showSearchBar={false} />
                {data.likeList.length === 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            backgroundColor: '#F9F9F9',
                            width: '100vw',
                            height: '100%',
                            flexDirection: 'column',
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            left: '50%',
                            top: '45%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <img src={HeartSkeleton} alt="하트" style={{ width: '210px', height: '210px' }} />
                        <span
                            style={{
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                lineHeight: '16px',
                                color: '#D3D3D3',
                            }}
                        >
                            즐겨찾는 가게가 없어요
                        </span>
                        <NavButton onClick={handleClickNavButton}>반찬박스 구경하러 가기</NavButton>
                    </div>
                ) : (
                    <div>
                        {data.likeList.map((item: StoreLikedItem) => (
                            <StoreTab key={item.storeId}>
                                <StoreImg src={StoreImage} />
                                <StoreInfo>
                                    <p style={{ margin: '0px' }}>{item.storeName}</p>
                                </StoreInfo>
                                <FilledHeartBigIcon onClick={() => handleLikeToggle(item.storeId)} />
                            </StoreTab>
                        ))}
                    </div>
                )}
            </Wrapper>
            <Navigator />
        </div>
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
    justify-content: space-between;
    align-items: center;
`;

const StoreImg = styled.img`
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

const NavButton = styled.button`
    border: none;
    width: 208px;
    height: 40px;
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    margin-top: 40px;
`;
