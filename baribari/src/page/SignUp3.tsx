import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../component/Header';
import { SearchIcon } from '../component/Icon';
import { useNavigate } from 'react-router-dom';
import MapContainer from '../component/Map/MapContainer';
import { useRecoilState } from 'recoil';

export default function SignUp3() {
    const navigate = useNavigate();

    // const [markerPositions, setMarkerPositions] = useState([]);
    // const markerPositions1 = [
    //     [33.452278, 126.567803],
    //     [33.452671, 126.574792],
    //     [33.451744, 126.572441],
    // ];
    // const markerPositions2 = [
    //     [37.499590490909185, 127.0263723554437],
    //     [37.499427948430814, 127.02794423197847],
    //     [37.498553760499505, 127.02882598822454],
    //     [37.497625593121384, 127.02935713582038],
    //     [37.49629291770947, 127.02587362608637],
    //     [37.49754540521486, 127.02546694890695],
    //     [37.49646391248451, 127.02675574250912],
    // ];

    const [mapSize, setMapSize] = useState<[number, number]>([400, 400]);
    const insideBoxRef = useRef<HTMLDivElement>(null);
    const containerBoxRef = useRef<HTMLDivElement>(null);
    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 });

    //mapSize의 너비, 높이
    useEffect(() => {
        if (insideBoxRef.current && containerBoxRef.current) {
            const width = insideBoxRef.current.clientWidth;
            const height = containerBoxRef.current.clientHeight;
            setMapSize([width, height]);
        }
    }, [insideBoxRef, containerBoxRef]);

    const onSubmit = () => {
        // navigate('/signUp4') 나중에 수정 예정
        alert('나중에 signUp4로 루트 수정 예정');
        navigate('/login');
    };
    const [isSearched, setIsSearched] = useState(false);
    const [userAddress, setUserAddress] = useState('');

    // Function to handle address input change
    const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserAddress(event.target.value);
    };

    return (
        <Container ref={containerBoxRef}>
            <Header showPageName={true} pageTitle={'위치 설정'} showSearchBar={false} />
            <InsideBox ref={insideBoxRef}>
                <SearchTab>
                    <SearchInput
                        placeholder="도로명 주소로 집 주소를 설정하면, 주변 가게를 알려드려요."
                        value={userAddress}
                        onChange={handleAddressChange}
                    />
                    <SearchIcon onClick={() => setIsSearched(!isSearched)} />
                </SearchTab>
                <MapContainer
                    size={mapSize}
                    userAddress={userAddress}
                    userPosition={userPosition}
                    isSearched={isSearched}
                />{' '}
                <AddBtn onClick={onSubmit}>다음</AddBtn>
            </InsideBox>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InsideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 80px;
`;
const SearchTab = styled.button`
    height: 45px;
    width: calc(100% - 32px);
    display: flex;
    margin: 16px 16px 20px 16px;
    margin-top: 
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: none;
    background-color: #efefef;
    color: #949494;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

const SearchInput = styled.textarea`
    color: #504e5f;
    width: 465px;
    font-size: 16px;
    font-family: Pretendard-Regular;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    border: none;
    background-color: #efefef;
    resize: none;
    height: 32px;
    outline: none;
    &::placeholder {
        color: #949494;
    }
`;
const MapBox = styled.div`
    width: 100%;
    height: 400px;
    background-color: grey;
`;

const AgreeBox = styled.div`
    margin: 28px 16px;
    width: calc(100% - 32px);
`;

const AllAgree = styled.div`
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: solid 1px #ececec;
`;

const SubAgree = styled.div`
    display: flex;
    align-items: center;
    margin-top: 16px;
`;

const BigTextBox = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
    margin-right: auto;
`;

const TextBox = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    padding-right: 12px;
`;

const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 464px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;
