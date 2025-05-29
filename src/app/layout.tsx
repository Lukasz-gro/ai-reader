import '../styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'AI Reader - Interactive Learning Platform',
    description: 'An interactive platform for learning and testing with AI assistance',
    keywords: ['AI', 'learning', 'tests', 'education', 'interactive'],
    icons: {
        icon: '/favicon.svg',
        apple: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang='en' className={'dark'}>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
