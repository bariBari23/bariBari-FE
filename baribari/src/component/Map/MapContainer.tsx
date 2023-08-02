import { useEffect, useState, useRef } from 'react';
import { createUserLocation, getUserLocation } from '../../apis/api/location';
import { useRecoilValue } from 'recoil';
import { storeAddressState } from '../../utils/atom';

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
    const [userStringAddress, setUserStringAddress] = useState<string>('');
    // 유저의 위치 정보를 createUserLocation api 활용해 보냄
    const callCreateUserLocation = async () => {
        if (isSearched) {
            const geocoder = new kakao.maps.services.Geocoder();
            // 주소를 검색하여 위도와 경도를 얻음
            geocoder.addressSearch(userAddress, async (result: any, status: any) => {
                if (status === kakao.maps.services.Status.OK) {
                    const latitude = result[0].y;
                    const longitude = result[0].x;

                    try {
                        // 위도와 경도를 서버로 전송하여 createUserLocation api를 호출
                        const response = await createUserLocation(latitude, longitude);
                        console.log('API 호출 결과는', response);
                    } catch (error) {
                        console.log('에러 발생', error);
                    }
                } else {
                    console.log('주소를 찾을 수 없습니다.');
                }
            });
        }
    };

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
                const center = new kakao.maps.LatLng(37.556735973773996, 126.93661051346454);
                const options = {
                    center,
                    level: 5,
                };

                const map = new kakao.maps.Map(container, options);
                setKakaoMap(map);
                kakaoMapRef.current = map; // map 인스턴스를 kakaoMapRef.current에 할당
            });
        };
    }, []);

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
                console.log(result);
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
            // 상점 위치들 띄우기
            storeAddress.forEach((address) => {
                geocoder.addressSearch(address, (result: any, status: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const latitude = result[0].y;
                        const longitude = result[0].x;
                        const customMarkerImage = createCustomMarkerImage();

                        const newMarker = new kakao.maps.Marker({
                            map: kakaoMap,
                            position: new kakao.maps.LatLng(latitude, longitude),
                            image: customMarkerImage?.iconTwo, // iconTwo를 사용하여 상점 위치에 대한 마커 생성
                        });
                        setStoreMarkers((prevMarkers) => [...prevMarkers, newMarker]);
                    }
                });
            });
        }
    }, [kakaoMap, userPosition]);

    return <div id="container" style={{ width: '100%', height: size[1], borderRadius: '12px' }} />;
}
