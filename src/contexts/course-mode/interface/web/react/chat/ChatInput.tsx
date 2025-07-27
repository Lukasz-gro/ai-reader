import React from 'react';

export const MessageInput: React.FC< React.TextareaHTMLAttributes<HTMLTextAreaElement> > = ({ onKeyDown, className = '', ...rest }) => {
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
            return;
        }
        onKeyDown?.(e);
    };

    return (
        <textarea
            {...rest}
            onKeyDown={handleKeyDown}
            rows={3}
            className={`
        flex-1 resize-none px-4 py-3 border border-p-70 rounded-[20px] text-base
        bg-p-90 text-p-10 outline-none transition-all duration-200
        focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30
        ${className}
      `}
        />
    );
};

export const MessageForm: React.FC<{
    onSubmitAction: (e: React.FormEvent) => void;
    children: React.ReactNode;
}> = ({ onSubmitAction, children }) => (
    <form
        onSubmit={onSubmitAction}
        className='flex w-full gap-4 p-4 py-10 max-w-[800px]'
    >
        {children}
    </form>
);
