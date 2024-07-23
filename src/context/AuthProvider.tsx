'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, createContext } from 'react';

interface ISessionProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext(null);

const AuthProvider: FC<ISessionProvider> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
