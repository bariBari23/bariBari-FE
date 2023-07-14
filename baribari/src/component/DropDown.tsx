import { styled } from 'styled-components';
import { useState } from 'react';
import { DPointerIcon, UPointerIcon } from './IconFin';
import { ReactComponent as HorizontalLine } from '../assets/horizontalLine2.svg';

export default function DropDown() {
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('최신순');

    const onClickDropDownButton = () => {
        setViewOpen(!viewOpen);
    };

    const handleSelectValue = (option: string) => {
        setSelectedValue(option);
        setViewOpen(false);
    };

    return (
        <DropDownContainer>
            <DropDownButton type="button" onClick={onClickDropDownButton}>
                {selectedValue}
                {viewOpen ? <DPointerIcon /> : <UPointerIcon />}
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
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    background: #f9f9f9;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    color: #767676;
    line-height: normal;
    font-family: Pretendard-Regular;
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
    font-weight: 600;

    box-shadow: 0px 2px 4px 0px rgba(33, 33, 33, 0.15);
`;

const DropDownListItem = styled.div`
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    color: #aaaaaa;
    &:hover {
        color: #767676;
    }
`;
