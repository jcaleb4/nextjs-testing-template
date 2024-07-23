'use client';

import { FC } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
// import { signUp } from '@/actions/auth';
import { signUp } from '@/actions/auth2';

interface ISignUpForm {}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: FC<ISignUpForm> = () => {
  const [formState, formAction] = useFormState(signUp, {});

  // const [formState, formAction] = useFormState<
  //   (
  //     action: (
  //       prevState: Awaited<IAuthState>,
  //     ) => IAuthState | Promise<IAuthState>,
  //     initialState: Awaited<ISignUpData>,
  //     permalink?: string,
  //   ) => Promise<IAuthState>,
  //   ISignUpData
  //     >(signUp, { name: '', email: '', password: '' });

  return (
    <div>
      <div className="p-6">
        <Link href="/login">Login</Link>
      </div>
      <form id="signUp-form" className="space-y-4" action={formAction}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="name" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {formState.error && <div className="text-red-500">{formState.error}</div>}
      {formState.message && (
        <div className="text-green-500">{formState.message}</div>
      )}
      <div className="pt-6">
        <button onClick={() => void signIn('google')}>Google Login</button>
      </div>
    </div>
  );
};

export default SignUpForm;
