import { styled } from 'styled-components';
import { useState } from 'react';
import { DPointerIcon, UPointerIcon } from './IconTest';

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
                    <DropDownListItem onClick={() => handleSelectValue('가격 낮은 순')}>가격 낮은 순</DropDownListItem>
                    <DropDownListItem onClick={() => handleSelectValue('가격 높은 순')}>가격 높은 순</DropDownListItem>
                </DropDownList>
            )}
        </DropDownContainer>
    );
}

const DropDownContainer = styled.div`
    position: relative;
    margin: 20px 0px;
`;

// css 나중에 수정하기..
const DropDownButton = styled.button`
    width: 112px;
    height: 20px;
    display: flex;
    padding: 8px 8px 8px 12px;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #767676;
    background: #f9f9f9;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    color: #767676;
    line-height: normal;
`;

const DropDownList = styled.div`
    width: 112px;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: #f9f9f9;
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
