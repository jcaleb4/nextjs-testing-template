'use client';

import { FC, ReactNode } from 'react';

interface IWrapper {
  children: ReactNode;
  headerRight?: ReactNode;
  footer?: ReactNode;
  title?: string;
}

const Wrapper1: FC<IWrapper> = ({ children, title, footer }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-md border border-slate-200">
      {title && (
        <header className="px-5 py-4 border-b border-slate-200 ">
          <h2 className="font-semibold text-slate-800 ">{title}</h2>
        </header>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="border-t border-slate-200">{footer || null}</div>
      )}
    </div>
  );
};

export default Wrapper1;
