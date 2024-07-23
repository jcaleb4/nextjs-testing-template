import { FC } from 'react';
import type { Metadata } from 'next';
import SignUpPage from '@/views/signUp/SignUpPage';

export const metadata: Metadata = {
  title: 'SignUp',
  description: 'SignUp page',
};

interface ISignUp {}

const SignUp: FC<ISignUp> = () => {
  return <SignUpPage />;
};

export default SignUp;
