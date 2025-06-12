'use client';

import { useFormStatus } from 'react-dom';
import { logoutAction } from '@/shared/interface/web/react/auth/server/auth-actions';

export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
        <button
            type='submit'
            disabled={pending}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pending
                    ? 'bg-p-70 text-p-50 cursor-not-allowed'
                    : 'bg-a-50 hover:bg-a-50/80 text-p-10'
            }`}
        >
            {pending ? 'Signing out...' : 'Sign Out'}
        </button>
    );
} 
