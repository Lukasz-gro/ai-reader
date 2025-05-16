import React, { ButtonHTMLAttributes } from 'react';

export const PrimaryButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...rest }) => {
    const baseClasses = 'px-4 py-2 bg-p-90 border-1 border-p-70 rounded-md font-semibold shadow-md transition-all cursor-pointer';
    const hoverClasses = 'hover:bg-s-50 hover:text-p-10 hover:shadow-lg hover:shadow-s-50/30 hover:-translate-y-[3px]';

    return (
        <button
            className={`${baseClasses} ${hoverClasses} ${className}`}
            {...rest}
        >
            {rest.children}
        </button>
    );
};
