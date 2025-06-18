import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen bg-p-90 text-p-10">
            <Header />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}; 