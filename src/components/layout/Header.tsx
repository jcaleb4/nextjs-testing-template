'use client';

import { FC, useEffect } from 'react';
import DropdownProfile from './DropdownProfile';
import { useSession } from 'next-auth/react';
import useAuth from '@/hooks/useAuth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

interface IHeader {}

const Header: FC<IHeader> = () => {
  const { data: session } = useSession();
  // const { setToken } = useAuth();

  console.log('session => ', session);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      void signIn('google'); // Force sign in to resolve error
    }

    // setToken({ token: session?.accessToken || null });
  }, [session]);

  return (
    <header className="bg-white border-b border-slate-200 p-4 flex flex-row justify-end items-center">
      {session ? (
        <DropdownProfile />
      ) : (
        <div className="space-x-4">
          <Link href="/login">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
