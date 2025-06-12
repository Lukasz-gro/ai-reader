'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from '@/shared/interface/web/react/auth/server/auth-actions';
import Link from 'next/link';

interface LoginFormProps {
  message: string | null;
}

export default function LoginForm({ message }: LoginFormProps) {
    const [formState, formAction] = useActionState(loginAction, null);

    return (
        <div className='min-h-screen bg-p-90 flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>
                <div className='bg-p-90 border border-p-80 rounded-lg shadow-lg p-8'>
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-semibold text-p-10 mb-2'>Welcome Back</h1>
                        <p className='text-p-50'>Sign in to your account</p>
                    </div>

                    {message === 'registration-success' && (
                        <Banner color='sd'>Registration successful! Please sign in with your new account.</Banner>
                    )}
                    {message === 'logged-out' && (
                        <Banner color='p'>You have been signed out successfully.</Banner>
                    )}
                    {message === 'auth-required' && (
                        <Banner color='a'>Please sign in to access that page.</Banner>
                    )}
                    {message === 'auth-error' && (
                        <Banner color='a'>Authentication error. Please sign in again.</Banner>
                    )}

                    <form action={formAction} className='space-y-6'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-p-10 mb-2'>
                Email
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                required
                                className='w-full px-4 py-3 border border-p-70 rounded-lg bg-p-90 text-p-10 focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30 transition-all duration-200 outline-none'
                                placeholder='Enter your email'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-p-10 mb-2'>
                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                className='w-full px-4 py-3 border border-p-70 rounded-lg bg-p-90 text-p-10 focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30 transition-all duration-200 outline-none'
                                placeholder='Enter your password'
                            />
                        </div>
                        {formState?.errors && (
                            <div className='space-y-2'>
                                {formState.errors.map((error: { field: string; message: string }, index: number) => (
                                    <div key={index} className='text-a-50 text-sm'>
                                        {error.message}
                                    </div>
                                ))}
                            </div>
                        )}
                        <SubmitButton />
                    </form>
                    <div className='mt-6 text-center'>
                        <p className='text-sm text-p-50'>
              Don&apos;t have an account?{' '}
                            <Link href='/register' className='text-sd-50 hover:text-sd-50/80 transition-colors font-medium'>
                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type='submit'
            disabled={pending}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                pending ? 'bg-p-70 text-p-50 cursor-not-allowed' : 'bg-sd-50 hover:bg-sd-50/80 text-p-10 hover:shadow-md hover:shadow-sd-50/30'
            }`}
        >
            {pending ? 'Signing in...' : 'Sign In'}
        </button>
    );
}

function Banner({ children, color }: { children: React.ReactNode; color: 'sd' | 'p' | 'a' }) {
    const palette = {
        sd: { bg: 'bg-sd-90/20', border: 'border-sd-50/30', text: 'text-sd-50' },
        p: { bg: 'bg-p-80/20', border: 'border-p-50/30', text: 'text-p-50' },
        a: { bg: 'bg-a-90/20', border: 'border-a-50/30', text: 'text-a-50' },
    }[color];
    return (
        <div className={`mb-6 p-4 ${palette.bg} border ${palette.border} rounded-lg`}>
            <p className={`${palette.text} text-sm text-center`}>{children}</p>
        </div>
    );
} 
