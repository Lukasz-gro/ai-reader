import React, { ButtonHTMLAttributes } from 'react';

export const PrimaryButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...rest }) => {
    const baseClasses = 'px-4 py-2 bg-p-90 font-semibold shadow-md transition-all cursor-pointer';
    const hoverClasses = 'hover:bg-sd-50 hover:text-p-10 hover:shadow-lg hover:shadow-sd-50/30 hover:-translate-y-[3px]';

    return (
        <button
            className={`${baseClasses} ${hoverClasses} ${className}`}
            {...rest}
        >
            {rest.children}
        </button>
    );
};
