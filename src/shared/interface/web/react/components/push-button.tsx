import React, { ButtonHTMLAttributes } from 'react';

export const PushButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...rest }) => {
    const baseClasses = 'bg-p-90 border-1 border-p-70 shadow-md transition-all cursor-pointer';
    const hoverClasses = 'hover:bg-a-70 hover:text-p-10 hover:shadow-lg hover:shadow-a-50/30';

    return (
        <button
            className={`${baseClasses} ${hoverClasses} ${className}`}
            {...rest}
        >
            {rest.children}
        </button>
    );
};
