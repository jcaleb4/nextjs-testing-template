import { FC } from 'react';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/providers/SessionProvider';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import StoreProvider from '@/providers/StoreProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: FC<IRootLayout> = async ({ children }) => {
  const session = await getServerSession();
  const headersList = headers();
  const path = headersList.get('x-url') || '';

  // if (!session && !(path.includes('/login') || path.includes('/signup'))) {
  //   redirect('/login');
  // }

  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden`}
        style={{
          height: '100vh',
          width: '100vw',
          maxHeight: '100vh',
          maxWidth: '100vw',
        }}
      >
        <StoreProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
