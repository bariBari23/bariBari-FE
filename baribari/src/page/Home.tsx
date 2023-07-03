import { styled } from 'styled-components';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { BellIcon, OrderIcon, RPointerIcon, SearchIcon } from '../component/IconTest';
import Navigator from '../component/Navigator';
import ContentContainer from '../component/ContentContainer';
import RandomTab from '../component/RandomTab';
import DropDown from '../component/DropDown';

export default function Home() {
    return (
        <div>
            <HeaderHome>
                <Logo />
                <RightSideHeader>
                    <BellIcon />
                    <OrderIcon />
                </RightSideHeader>
            </HeaderHome>
            <Wrapper>
                <RandomTab />
                <InquiryTab>
                    <div>
                        <InquiryTabTitle>바리바리에 입점 문의하기</InquiryTabTitle>
                        <InquiryTabSub>바리바리에 입점하고 더 많은 수익 창출해보세요!</InquiryTabSub>
                    </div>
                    <RPointerIcon />
                </InquiryTab>
                <SearchTab>
                    <p>반찬 이름을 검색해보세요</p>
                    <SearchIcon />
                </SearchTab>
            </Wrapper>
            <DropDown />
            <Wrapper>
                <ContentContainer />
                <Navigator />
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    width: 24.375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const HeaderHome = styled.div`
    display: flex;
    padding: 48px 16px 8px 16px;
    justify-content: space-between;
    align-items: center;
`;

const RightSideHeader = styled.div`
    display: flex;
`;

const InquiryTab = styled.div`
    display: flex;
    width: 357px;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    background: #fff1ee;
`;

const InquiryTabTitle = styled.div`
    color: #ff7455;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
`;

const InquiryTabSub = styled.div`
    color: #949494;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
`;

const SearchTab = styled.button`
    width: 358px;
    height: 28px;
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background-color: #efefef;
    color: #949494;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;
