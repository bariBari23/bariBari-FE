import React from 'react';

const CheckIcon = ({
    onClick,
    active,
    isAll,
}: {
    onClick: React.MouseEventHandler<SVGSVGElement>;
    active: boolean;
    isAll: boolean;
}) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform={isAll ? '' : 'scale(0.75) translate(4, 4)'}>
            <rect
                width="24"
                height="24"
                rx="2"
                fill={active ? '#ff7455' : 'white'}
                stroke={active ? '#ff7455' : '#767676'}
                strokeWidth="2"
            />
            <path
                d="M10.3733 16.8274C9.79894 17.4017 8.86773 17.4017 8.29338 16.8274L4.93333 13.4673C4.41787 12.9519 4.41787 12.1161 4.93333 11.6007C5.4488 11.0852 6.28453 11.0852 6.8 11.6007L8.65736 13.458C9.03069 13.8313 9.63597 13.8313 10.0093 13.458L17.2 6.26732C17.7155 5.75185 18.5512 5.75185 19.0667 6.26732C19.5821 6.78278 19.5821 7.61852 19.0667 8.13398L10.3733 16.8274Z"
                fill="white"
            />
        </g>
    </svg>
);

export default CheckIcon;
