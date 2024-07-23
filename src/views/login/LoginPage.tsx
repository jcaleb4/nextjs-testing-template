'use client';

import LoginForm from '@/components/auth/LoginForm';
import { useSession } from 'next-auth/react';
import { usePathname, redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

interface ILoginPage {}

const LoginPage: FC<ILoginPage> = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session && pathname.includes('/login')) {
      redirect('/');
    }
  }, [pathname, session]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
