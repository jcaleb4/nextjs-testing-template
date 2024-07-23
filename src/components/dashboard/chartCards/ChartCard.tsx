'use client';

import Select, { ISelectOption } from '@/components/select/Select';
import { formatBigNumber } from '@/utils/Utils';
import { FC, ReactNode, useEffect, useState } from 'react';

export interface IChartData {
  label: string;
  data: number[];
}

interface IChartCard {
  children?: ReactNode;
  title: string;
  activityKey: string;
  data: IChartData[];
  keyOptions?: string[];
  onKeyChange?: (option: ISelectOption) => void;
  displayKeySelection: boolean;
}

const getColorFromPercentage = (value: number): string => {
  if (value > 0) {
    return 'bg-emerald-500';
  }

  if (value < 0 && value > -50) {
    return 'bg-amber-500';
  }

  return 'bg-red-500';
};

const ChartCard: FC<IChartCard> = ({
  children,
  title,
  activityKey,
  data,
  keyOptions,
  onKeyChange,
  displayKeySelection,
}) => {
  const [mainValue, setMainValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [selectOptions, setSelectOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (keyOptions) {
      setSelectOptions(
        keyOptions.map((key) => ({
          id: key,
          name: key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'), // split CamelCase into separate words
        })),
      );
    }
  }, [keyOptions]);

  useEffect(() => {
    const week1 = data[0].data.reduce((total, current) => total + current, 0);
    const week2 = data[1].data.reduce((total, current) => total + current, 0);
    setMainValue(week1);

    if (week1 !== 0) {
      setPercentage(((week1 - week2) / week1) * 100);
    }
  }, [data, activityKey]);

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md border border-slate-200 p-4 flex-1">
      <header className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {title}
          </h2>
          <h3 className="text-xs font-semibold text-slate-400 uppercase">
            {activityKey} activity
          </h3>
        </div>
        {displayKeySelection && keyOptions && onKeyChange && (
          <div className="flex-1">
            <Select
              options={selectOptions}
              onChange={onKeyChange}
              selected={
                selectOptions.find(
                  (option) => option.id === activityKey,
                ) as ISelectOption
              }
            />
          </div>
        )}
      </header>
      <div className="flex items-center space-x-2">
        <p className="text-3xl font-bold text-slate-800">
          {formatBigNumber(mainValue)}
        </p>
        <p
          className={`text-sm font-semibold text-white rounded-full px-1 ${getColorFromPercentage(percentage)}`}
        >
          {percentage > 0 ? '+' : ''}
          {percentage.toFixed(0)}%
        </p>
      </div>
      {children && <div className="flex-1 pt-2">{children}</div>}
    </div>
  );
};

export default ChartCard;
