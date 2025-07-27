import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className='flex flex-col h-screen'>
        <Header className='sticky top-0 z-10' />

        <main className='flex flex-1 min-h-0 overflow-hidden'>
            {children}
        </main>
    </div>
);
