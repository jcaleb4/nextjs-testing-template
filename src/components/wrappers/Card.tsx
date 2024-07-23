'use client';

import { FC, ReactNode } from 'react';

interface ICard {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const Card: FC<ICard> = ({ children, title, subtitle }) => {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md border border-slate-200 p-4 flex-1">
      {(title || subtitle) && (
        <header>
          {title && (
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          )}
          {subtitle && (
            <h3 className="text-xs font-semibold text-slate-400 uppercase">
              {subtitle}
            </h3>
          )}
        </header>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Card;
