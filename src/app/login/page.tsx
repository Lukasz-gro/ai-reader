export const dynamic = 'force-dynamic';

import LoginForm from './LoginForm';

interface PageProps {
  // In Next.js app router, `searchParams` is provided as a promise
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: PageProps) {
    const params = await searchParams; // `searchParams` is a Promise per generated types
    const messageRaw = params?.message;
    const message = Array.isArray(messageRaw) ? messageRaw[0] : messageRaw ?? null;

    return <LoginForm message={message} />;
} 
