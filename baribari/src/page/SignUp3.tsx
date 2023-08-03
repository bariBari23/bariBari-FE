import { useRef, useState } from 'react';

import styled from 'styled-components';
import Header from '../component/Header';
import { SearchIcon } from '../component/Icon';
import { useNavigate } from 'react-router-dom';
import MapContainer from '../component/Map/MapContainer';

export default function SignUp3() {
    const navigate = useNavigate();
    const insideBoxRef = useRef<HTMLDivElement>(null);
    const containerBoxRef = useRef<HTMLDivElement>(null);
    const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 });

    const onSubmit = () => {
        navigate('/home');
    };
    const [isSearched, setIsSearched] = useState(false);
    const [userAddress, setUserAddress] = useState('');

    // Function to handle address input change
    const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserAddress(event.target.value);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setIsSearched(!isSearched);
        }
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
                        onKeyDown={handleEnterKeyPress}
                    />
                    <SearchIcon
                        onClick={() => setIsSearched(!isSearched)}
                        style={{ border: 'none', backgroundColor: '#ff000000' }}
                    />
                </SearchTab>
                <MapContainer
                    size={['100vw', '70vh']}
                    userAddress={userAddress}
                    userPosition={userPosition}
                    isSearched={isSearched}
                    isStoreLocation={false}
                />
                <AddBtn onClick={onSubmit}>다음</AddBtn>
            </InsideBox>
            <BackSquare />
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
    margin: 16px 16px 30px 16px;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border: none;
    background-color: #efefef;
    color: #949494;
    font-family: Pretendard Variable;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

const SearchInput = styled.textarea`
    color: #504e5f;
    width: 465px;
    font-size: 16px;
    font-family: Pretendard Variable;
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

const AddBtn = styled.div`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 464px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard Variable;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;

const BackSquare = styled.div`
    width: 100%;
    max-width: 568px;
    height: 96px;
    background-color: white;

    position: fixed;
    bottom: 0;
    z-index: 5000;
`;
