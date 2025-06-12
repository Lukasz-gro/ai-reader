import { getCurrentUser } from '@/shared/interface/middleware/auth-middleware';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';

export default async function DashboardPage() {
    const user = await getCurrentUser();
  
    if (!user) {
        redirect('/login');
    }

    return (
        <div className='min-h-screen bg-p-90'>
            <nav className='bg-p-90 border-b border-p-80'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center'>
                            <h1 className='text-xl font-semibold text-p-10'>Dashboard</h1>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <span className='text-p-50'>Welcome, {user.username}</span>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </nav>

            <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                <div className='px-4 py-6 sm:px-0'>
                    <div className='border border-p-80 rounded-lg p-8'>
                        <h2 className='text-2xl font-semibold text-p-10 mb-4'>User Profile</h2>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-p-50'>Username</label>
                                <p className='mt-1 text-p-10'>{user.username}</p>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-p-50'>Email</label>
                                <p className='mt-1 text-p-10'>{user.email}</p>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-p-50'>Role</label>
                                <p className='mt-1 text-p-10 capitalize'>{user.roles.join(', ').toLowerCase()}</p>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-p-50'>Member Since</label>
                                <p className='mt-1 text-p-10'>{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 
