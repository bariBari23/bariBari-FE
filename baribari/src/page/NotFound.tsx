import { styled } from 'styled-components';
import NotFoundSkeleton from '../assets/3dNotFound.png';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    const handleClickNavButton = () => {
        navigate(`/home`);
    };

    return (
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
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img src={NotFoundSkeleton} alt="느낌표" style={{ width: '210px', height: '210px' }} />
            <p
                style={{
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '16px',
                    color: '#AAA',
                }}
            >
                죄송해요! 잘못된 페이지로 들어왔어요
            </p>
            <NavButton onClick={handleClickNavButton}>홈으로 돌아가기</NavButton>
        </div>
    );
}

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
