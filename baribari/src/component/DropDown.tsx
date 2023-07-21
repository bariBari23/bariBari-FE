import { styled } from 'styled-components';
import { useState } from 'react';
import { DPointerIcon, UPointerIcon } from './IconFin';
import { ReactComponent as HorizontalLine } from '../assets/horizontalLine2.svg';

export default function DropDown({ onSelectSortOption }: { onSelectSortOption: (option: string) => void }) {
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('최신순');

    const onClickDropDownButton = () => {
        setViewOpen(!viewOpen);
    };

    const handleSelectValue = (option: string) => {
        let sortOption: string = '';

        switch (option) {
            case '최신순':
                sortOption = '';
                break;
            case '가격 낮은순':
                sortOption = 'price,asc';
                break;
            case '가격 높은순':
                sortOption = 'price,desc';
                break;
            default:
                break;
        }
        setSelectedValue(option);
        setViewOpen(false);
        onSelectSortOption(sortOption); // 선택된 옵션을 부모 컴포넌트로 전달
    };

    return (
        <DropDownContainer>
            <DropDownButton type="button" onClick={onClickDropDownButton}>
                <div style={{ width: '96px', textAlign: 'left' }}>{selectedValue}</div>
                <div style={{ marginRight: '0', padding: '2px' }}>{viewOpen ? <DPointerIcon /> : <UPointerIcon />}</div>
            </DropDownButton>
            {viewOpen && (
                <DropDownList>
                    <DropDownListItem onClick={() => handleSelectValue('최신순')}>최신순</DropDownListItem>
                    <HorizontalLine />
                    <DropDownListItem onClick={() => handleSelectValue('가격 낮은순')}>가격 낮은순</DropDownListItem>
                    <HorizontalLine />
                    <DropDownListItem onClick={() => handleSelectValue('가격 높은순')}>가격 높은순</DropDownListItem>
                </DropDownList>
            )}
        </DropDownContainer>
    );
}

const DropDownContainer = styled.div`
    position: relative;
    margin: 20px 0px 16px 0px;
`;

const DropDownButton = styled.button`
    width: 112px;
    height: 36px;
    padding: 8px 8px 8px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    background: #f9f9f9;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    color: #767676;
    line-height: 16px;
    gap: 8px;
`;

const DropDownList = styled.div`
    width: 112px;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    border-radius: 8px;
    background: #f9f9f9;
    z-index: 1000;
    box-shadow: 0px 2px 4px 0px rgba(33, 33, 33, 0.15);
`;

const DropDownListItem = styled.div`
    text-align: center;
    padding: 8px 12px;
    cursor: pointer;
    color: #aaaaaa;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    &:hover {
        color: #767676;
    }
`;
