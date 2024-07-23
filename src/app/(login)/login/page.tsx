import { FC } from 'react';
import type { Metadata } from 'next';
import LoginPage from '@/views/login/LoginPage';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
};

interface ILogin {}

const Login: FC<ILogin> = () => {
  return <LoginPage />;
};

export default Login;
