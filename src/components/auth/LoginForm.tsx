'use client';

import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Login } from '@/actions/auth2';

interface ILoginForm {}

const LoginForm: FC<ILoginForm> = () => {
  const [formState, formAction] = useFormState(Login, {});

  useEffect(() => {
    if (formState.credentials) {
      void signIn('credentials', formState.credentials);
    }
  }, [formState.credentials]);

  return (
    <div>
      <div className="p-6">
        <Link href="/signup">Signup</Link>
      </div>
      <form id="login-form" className="space-y-4" action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="pt-6">
        <button onClick={() => void signIn('google')}>Google Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
