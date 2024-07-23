'use client';

import SignUpForm from '@/components/auth/SignUpForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

interface ISignUpPage {}

const SignUpPage: FC<ISignUpPage> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
