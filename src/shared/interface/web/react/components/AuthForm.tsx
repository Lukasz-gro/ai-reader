import React from 'react';

const inputFieldClasses = 'block w-full px-3 py-2 border border-p-30 rounded-md shadow-sm placeholder-p-50 focus:outline-none focus:border-sd-70 focus:shadow-lg text-p-90';

export const AuthFormContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='max-w-lg w-full space-y-8 py-8 px-12 bg-p-10 border-4 border-p-90/25 rounded-lg shadow-xl shadow-p-80/30'>
            <h2 className='mt-6 text-center text-p-90 text-3xl font-extrabold'>{title}</h2>
            {children}
        </div>
    </div>
);

interface InputProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const AuthFormInputField: React.FC<InputProps> = ({ id, label, type, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium text-p-90 mb-2'>
            {label}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            required
            value={value}
            onChange={onChange}
            className={inputFieldClasses}
            placeholder={placeholder}
        />
    </div>
);
