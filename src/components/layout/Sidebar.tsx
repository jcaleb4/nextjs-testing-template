'use client';

import { FC } from 'react';
import Image from 'next/image';
import Navigation from './Navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface ISidebar {}

const Sidebar: FC<ISidebar> = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="h-full bg-gray-800 w-52">
      <div className="pt-4 flex flex-col items-center space-y-4 h-full">
        <Link href="/">
          <Image
            src={'/images/quasar-logo.png'}
            width={70}
            height={70}
            alt="Quasar logo"
            priority
            className="h-auto"
          />
        </Link>
        <div className="overflow-y-auto w-full px-4 pb-6">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
