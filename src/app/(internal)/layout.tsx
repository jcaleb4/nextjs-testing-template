import { FC } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  return (
    <main className="flex flex-row flex-1 h-vh-full max-h-vh-full">
      <Sidebar />
      <div className="flex flex-col flex-1 h-vh-full max-h-vh-full">
        <Header />
        <section className="w-full h-full overflow-y-auto bg-gray-100 p-4">
          {children}
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
