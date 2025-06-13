'use client';

import React from 'react';
import { User } from '@/shared/entities/user';

interface AuthProtectedProps {
    user: User | null;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    redirectTo?: string;
}

const DefaultFallback: React.FC<{ redirectTo: string }> = ({ redirectTo }) => (
    <div className='flex justify-center items-center h-64'>
        <div className='text-center'>
            <p className='text-p-50 mb-4'>Please sign in to access this content</p>
            <a 
                href={redirectTo}
                className='px-6 py-2 bg-sd-50 hover:bg-sd-50/80 text-p-10 rounded-lg transition-colors'
            >
                Sign In
            </a>
        </div>
    </div>
);

export const AuthProtected: React.FC<AuthProtectedProps> = ({
    user,
    children,
    fallback,
    redirectTo = '/login'
}) => {
    if (!user) {
        if (fallback) {
            return <>{fallback}</>;
        }
        return <DefaultFallback redirectTo={redirectTo} />;
    }

    return <>{children}</>;
};

export const AuthRequired: React.FC<{
    user: User | null;
    children: (user: User) => React.ReactNode;
    fallback?: React.ReactNode;
    redirectTo?: string;
}> = ({ user, children, fallback, redirectTo = '/login' }) => {
    if (!user) {
        if (fallback) {
            return <>{fallback}</>;
        }
        return <DefaultFallback redirectTo={redirectTo} />;
    }

    return <>{children(user)}</>;
}; 
