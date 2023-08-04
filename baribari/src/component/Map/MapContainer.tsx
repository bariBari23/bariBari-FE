import { useEffect, useState, useRef } from 'react';
import { createUserLocation, getUserLocation } from '../../apis/api/location';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storeAddressState, userAddressState } from '../../utils/atom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Cookies } from 'typescript-cookie';

declare global {
    interface Window {
        kakao: any;
    }
    const kakao: any;
}

export default function MapContainer(props: {
    size: [any, any];
    userAddress: string;
    isSearched: boolean;
    isStoreLocation: boolean;
    userPosition: {
        latitude: number;
        longitude: number;
    };
}): JSX.Element {
    const kakaoMapRef = useRef<any | null>(null);

    const { size, userAddress, isSearched, userPosition, isStoreLocation } = props;
    const [kakaoMap, setKakaoMap] = useState<any>(null);
    const [marker, setMarkers] = useState<any>(null);
    const [storeMarkers, setStoreMarkers] = useState<any[]>([]);
    const storeAddress = useRecoilValue(storeAddressState);
    // 도로명 주소 저장해주는 userStringAddress
    const [userStringAddress, setUserStringAddress] = useRecoilState(userAddressState);
    // 유저의 위치 정보를 createUserLocation api 활용해 보냄
    const [activeStore, setActiveStore] = useState<{ id: string; address: string; name: string } | null>(null);
    const callCreateUserLocation = async () => {
        if (isSearched) {
            const userGeocoder = new kakao.maps.services.Geocoder();
            // 주소를 검색하여 위도와 경도를 얻음
            userGeocoder.addressSearch(userAddress, async (result: any, status: any) => {
                if (status === kakao.maps.services.Status.OK) {
                    const latitude = result[0].y;
                    const longitude = result[0].x;
                    const coord = new kakao.maps.LatLng(latitude, longitude);

                    const translateToAddress = async () => {
                        userGeocoder.coord2RegionCode(
                            coord.getLng(),
                            coord.getLat(),
                            function (result: string | any[], status: any) {
                                if (status === kakao.maps.services.Status.OK) {
                                    for (let i = 0; i < result.length; i++) {
                                        if (result[i].region_type === 'H') {
                                            setUserStringAddress(result[i].address_name);
                                            Cookies.set('userAddress', result[i].address_name);
                                            // Assuming you have a recoil setter
                                        }
                                    }
                                }
                            },
                        );
                    };

                    try {
                        // 위도와 경도를 서버로 전송하여 createUserLocation api를 호출

                        const response = await createUserLocation(latitude, longitude);
                        console.log('API 호출 결과는', response);
                        translateToAddress();
                    } catch (error) {
                        console.log('에러 발생', error);
                    }
                } else {
                    console.log('주소를 찾을 수 없습니다.');
                    alert('주소를 찾을 수 없습니다.');
                }
            });
        }
    };

    // useEffect(() => {
    //     if (userPosition.latitude !== 0 && userPosition.longitude !== 0) {
    //         const addressGeocoder = new kakao.maps.services.Geocoder();
    //         const coord = new kakao.maps.LatLng(userPosition.latitude, userPosition.longitude);

    //         const translateToAddress = async () => {
    //             addressGeocoder.coord2RegionCode(
    //                 coord.getLng(),
    //                 coord.getLat(),
    //                 function (result: string | any[], status: any) {
    //                     if (status === kakao.maps.services.Status.OK) {
    //                         for (let i = 0; i < result.length; i++) {
    //                             if (result[i].region_type === 'H') {
    //                                 setUserStringAddress(result[i].address_name);
    //                                 // Assuming you have a recoil setter
    //                             }
    //                         }
    //                     }
    //                 },
    //             );
    //         };
    //         translateToAddress();
    //     }
    // }, [userPosition]);

    const navigate = useNavigate();

    // 마커 이미지 커스텀
    const createCustomMarkerImage = () => {
        if (kakaoMap) {
            const imageUrl = 'https://i.ibb.co/7vrcJBH/marker-Home.png';
            const imageUrlTwo = 'https://i.ibb.co/8KFW6rw/marker-Store.png';
            // 커스텀 마커 이미지 생성
            const icon = new kakao.maps.MarkerImage(imageUrl, new kakao.maps.Size(35, 35), {
                offset: new kakao.maps.Point(16, 34),
                alt: '내 위치 마커 이미지 예제',
                shape: 'poly',
                coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
            });
            const iconTwo = new kakao.maps.MarkerImage(imageUrlTwo, new kakao.maps.Size(35, 35), {
                offset: new kakao.maps.Point(16, 34),
                alt: '상점 마커 이미지 예제',
                shape: 'poly',
                coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
            });

            return { icon, iconTwo };
        }
        return null;
    };
    useEffect(() => {
        const container = document.getElementById('container');
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                // userPosition이 0이 아닐 경우에만 지도의 중심을 userPosition으로 설정
                if (userPosition.latitude !== 0 && userPosition.longitude !== 0) {
                    const center = new kakao.maps.LatLng(userPosition.latitude, userPosition.longitude);
                    const options = {
                        center,
                        level: 5,
                    };

                    const map = new kakao.maps.Map(container, options);
                    setKakaoMap(map);
                    kakaoMapRef.current = map; // map 인스턴스를 kakaoMapRef.current에 할당
                } else {
                    // userPosition이 0일 경우 기본 중심 좌표로 설정
                    const center = new kakao.maps.LatLng(37.556735973773996, 126.93661051346454);
                    const options = {
                        center,
                        level: 7,
                    };

                    const map = new kakao.maps.Map(container, options);
                    setKakaoMap(map);
                    kakaoMapRef.current = map; // map 인스턴스를 kakaoMapRef.current에 할당
                }
            });
        };
    }, [userPosition]);
    const map = kakaoMapRef.current;
    if (map) {
        map.relayout();
    }

    //회원가입 시 처음 위치 검색 후 설정할 때
    useEffect(() => {
        if (!kakaoMap || !userAddress) {
            return;
        }

        // 전의 마커 지우기
        if (userAddress.length === 0) {
            marker.setMap(null);
            setMarkers(null);
        }
        // 전의 마커 지우기
        if (marker) {
            marker.setMap(null);
            setMarkers(null);
        }

        // Use the geocoder to get the location data based on the userAddress
        const geocoder = new kakao.maps.services.Geocoder();
        const callback = function (result: any, status: any) {
            if (status === kakao.maps.services.Status.OK) {
                // result로 받은 주소가 많을 경우 result[0]에 있는 위도, 경도 사용
                const latitude = result[0].y;
                const longitude = result[0].x;
                //새로운 마커 이미지 생성
                const customMarkerImage = createCustomMarkerImage();
                // 새로운 위도, 경도로 마커 생성
                const newMarker = new kakao.maps.Marker({
                    map: kakaoMap,
                    position: new kakao.maps.LatLng(latitude, longitude),
                    image: isStoreLocation ? customMarkerImage?.iconTwo : customMarkerImage?.icon,
                });
                setMarkers(newMarker);
            } else {
                // 주소가 아예 존재하지 않을 때
                setMarkers(null);
            }
        };
        geocoder.addressSearch(userAddress, callback);
    }, [kakaoMap, isSearched]);

    useEffect(() => {
        if (isSearched) {
            callCreateUserLocation();
        }
    }, [isSearched, marker]);

    // 상점 세부 페이지에서 지도 띄우기
    useEffect(() => {
        if (!kakaoMap) {
            return;
        }
        if (userPosition.latitude !== 0 && userPosition.longitude !== 0) {
            // 내 위치 띄우기
            const latitude = userPosition.latitude;
            const longitude = userPosition.longitude;
            const customMarkerImage = createCustomMarkerImage();
            // 새로운 위도, 경도로 마커 생성
            const newMarker = new kakao.maps.Marker({
                map: kakaoMap,
                position: new kakao.maps.LatLng(latitude, longitude),
                image: customMarkerImage?.iconTwo,
            });
            setMarkers(newMarker);
        }
    }, [kakaoMap, userPosition]);

    // 마이페이지에서 상점 이미지 띄우기 + 내 장소 띄우기
    useEffect(() => {
        if (!kakaoMap) {
            return;
        }
        const geocoder = new kakao.maps.services.Geocoder();
        if (userPosition.latitude !== 0 && userPosition.longitude !== 0 && isStoreLocation === false) {
            // 내 위치 띄우기
            const latitude = userPosition.latitude;
            const longitude = userPosition.longitude;
            const customMarkerImage = createCustomMarkerImage();
            // 새로운 위도, 경도로 마커 생성
            const newMarker = new kakao.maps.Marker({
                map: kakaoMap,
                position: new kakao.maps.LatLng(latitude, longitude),
                image: customMarkerImage?.icon,
            });
            setMarkers(newMarker);
            console.log(newMarker);
            console.log(storeAddress);
            // 상점 위치들 띄우기
            storeAddress.forEach((store) => {
                geocoder.addressSearch(store.address, (result: any, status: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const latitude = result[0].y;
                        const longitude = result[0].x;
                        const customMarkerImage = createCustomMarkerImage();

                        const newMarker = new kakao.maps.Marker({
                            map: kakaoMap,
                            position: new kakao.maps.LatLng(latitude, longitude),
                            image: customMarkerImage?.iconTwo, // iconTwo를 사용하여 상점 위치에 대한 마커 생성
                        });
                        const overlay = new kakao.maps.CustomOverlay({
                            position: new kakao.maps.LatLng(latitude, longitude),
                            content: `<div style="border: solid 2px #ff7455; border-radius: 100px; text-align: center; font-family: Pretendard Variable; font-size: 12px; background-color: #FF7455; padding: 3px 4px; color: white; font-weight: 600;">${store.name}</div>`,
                            xAnchor: 0.5,
                            yAnchor: 2.5,
                        });

                        kakao.maps.event.addListener(newMarker, 'mouseover', function () {
                            // setActiveStore(store);
                            overlay.setMap(kakaoMap);
                            console.log('mouseOver');
                        });

                        kakao.maps.event.addListener(newMarker, 'mouseout', function () {
                            overlay.setMap(null);
                        });
                        kakao.maps.event.addListener(newMarker, 'click', function () {
                            navigate(`/detail/${store.id}`);
                        });

                        setStoreMarkers((prevMarkers) => [...prevMarkers, newMarker]);
                    }
                });
            });
        }
    }, [kakaoMap, userPosition]);

    return (
        <div id="container" style={{ width: '100%', height: size[1], borderRadius: '12px' }}>
            {/* {activeStore && <InfoWindow>{activeStore.name}</InfoWindow>} */}
        </div>
    );
}
