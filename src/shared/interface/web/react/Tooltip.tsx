import React from 'react';

export const Tooltip: React.FC<{
    children: React.ReactNode;
    tooltip: string;
}> = ({ children, tooltip }) => {
    const animation = 'opacity-0 group-hover:opacity-100 scale-80 group-hover:scale-100 transition duration-150 delay-0 group-hover:delay-500';
    return (
        <div className='relative group flex items-center'>
            {children}
            <div className={`${animation} absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-p-70 text-s-10 text-xs rounded-md px-2 py-2 whitespace-nowrap z-10 pointer-events-none`}>
                <div className='absolute -top-[4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-p-70 z-[-1]' />
                {tooltip}
            </div>
        </div>
    );
};
