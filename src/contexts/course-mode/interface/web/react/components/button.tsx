import React from 'react';

export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const ButtonPrimary: React.FC<ButtonProps> = (props) => {
    return (
        <button className={'bg-p-90 border-1 border-p-70/80 rounded-md hover:bg-a-50 focus:bg-a-50 transition-colors shadow-lg'} onClick={props.onClick}>
            { props.children }
        </button>
    );
}
