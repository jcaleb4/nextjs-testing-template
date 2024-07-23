'use client';

import { FC, ReactNode } from 'react';

export interface IChartData {
  label: string;
  data: number[];
}

interface IChartCard {
  children: ReactNode;
  title: string;
}

const ChartCard2: FC<IChartCard> = ({ children, title }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-md border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 ">
        <h2 className="font-semibold text-slate-800 ">{title}</h2>
      </header>
      <div className="p-4 flex-1 flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default ChartCard2;
