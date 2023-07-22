import { useEffect, useState, useRef } from 'react';
import { createUserLocation } from '../../apis/api/location';
import { getUserInfo } from '../../apis/api/user';

declare global {
    interface Window {
        kakao: any;
    }
    const kakao: any;
}

export default function MapContainer(props: {
    size: [number, number];
    userAddress: string;
    isSearched: boolean;
    userPosition: {
        latitude: number;
        longitude: number;
    };
}): JSX.Element {
    const { size, userAddress, isSearched, userPosition } = props;
    const [kakaoMap, setKakaoMap] = useState<any>(null);
    const [marker, setMarkers] = useState<any>(null);

    // 유저의 위치 정보를 createUserLocation api 활용해 보냄
    const callCreateUserLocation = async () => {
        if (marker) {
            try {
                const userInfo = await getUserInfo();
                const email = userInfo.data.email;
                const latitude = marker.n.La;
                const longitude = marker.n.Ma;
                try {
                    const result = await createUserLocation(latitude, longitude, email);
                    console.log('API 호출 결과:', result);
                } catch (error) {
                    console.log('API 호출 중 에러 발생:', error);
                }
            } catch (error) {
                console.log('Error fetching user info:', error);
            }
        }
    };
    // 마커 이미지 커스텀
    const createCustomMarkerImage = () => {
        if (kakaoMap) {
            // assets/markerHome.svg의 상대 경로를 지정
            const imageUrl = 'https://ibb.co/K6VZjBY';
            // 커스텀 마커 이미지 생성
            const icon = new kakao.maps.MarkerImage(imageUrl, new kakao.maps.Size(31, 35), {
                offset: new kakao.maps.Point(16, 34),
                alt: '마커 이미지 예제',
                shape: 'poly',
                coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
            });
            return icon;
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
                const center = new kakao.maps.LatLng(37.56137355770315, 126.94500188216101);
                const options = {
                    center,
                    level: 5,
                };
                const map = new kakao.maps.Map(container, options);
                setKakaoMap(map); // map 인스턴스 생성 후 state에 저장
            });
        };
    }, []);
    // 마이페이지에서 받은 좌표를 도로명 주소로 바꾸는 부분
    // useEffect(() => {
    //     if (!kakaoMap) {
    //         console.log('야');
    //         return;
    //     } else {
    //         if (userPosition.latitude !== 0 && userPosition.longitude !== 0) {
    //             var geocoder = new kakao.maps.services.Geocoder();
    //             var coord = new kakao.maps.LatLng(userPosition.latitude, userPosition.longitude);
    //             var callback = function (result: any, status: any) {
    //                 console.log('result', result);
    //                 if (status === kakao.maps.services.Status.OK) {
    //                     // userAddress를 변경
    //                 }
    //             };

    //             geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    //         }
    //     }
    // }, [kakaoMap]);
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
                    // image: customMarkerImage,
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
    return <div id="container" style={{ width: '100vw', height: '50vh' }} />;
}