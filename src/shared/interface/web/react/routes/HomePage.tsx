import { HomeView } from '@/contexts/home/HomeView';
import React from 'react';


export const HomePage: React.FC = () => {
    return (
        <div className={'flex flex-1'}>
            <HomeView />
        </div>
    );
};
