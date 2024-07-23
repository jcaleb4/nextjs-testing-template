'use client';

import { formatBigNumber } from '@/utils/Utils';
import { FC } from 'react';
import TableTreatments, {
  ETreatments,
  ITableTreatments,
} from './TableTreatments';

export enum EAlignments {
  left = 'left',
  center = 'center',
  right = 'right',
}

export interface ITableData {
  columns: string[];
  colors?: (string | null)[];
  values: ITableTreatments['value'][][];
  treatments?: (ETreatments | null)[];
  alignments?: (EAlignments | null)[];
}
interface ITable {
  data: ITableData;
  showIndex?: boolean;
}

const getAlignment = (
  alignments: (EAlignments | null)[] | undefined,
  index: number,
): { text: string; content: string } => {
  if (!alignments || !alignments?.[index]) {
    if (index === 0) {
      return { text: 'text-left', content: 'justify-start' };
    }
  }

  if (alignments?.[index] === EAlignments.right) {
    return { text: 'text-right', content: 'justify-end' };
  }

  if (alignments?.[index] === EAlignments.left) {
    return { text: 'text-left', content: 'justify-start' };
  }

  return { text: 'text-center', content: 'justify-center' };
};

const Table: FC<ITable> = ({ data, showIndex }) => {
  return (
    <table className="min-w-full divide-y divide-slate-100">
      <thead className="text-xs uppercase text-slate-400 bg-slate-50">
        <tr>
          {showIndex && <th>Index</th>}
          {data.columns.map((col, i) => (
            <th
              key={col}
              scope="col"
              className={`${getAlignment(data.alignments, i).text} px-2 py-4 font-semibold`}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 text-slate-800">
        {data.values.map((item, i) => (
          <tr key={`item-${i}`}>
            {showIndex && <td className="text-center">{i + 1}</td>}
            {item.map((val, ii) => {
              const textColor = data.colors?.[ii]
                ? `text-[${data.colors[ii]}]`
                : '';

              const treatment = data.treatments?.[ii] || null;
              const alignment = getAlignment(data.alignments, ii);
              const value =
                !treatment && typeof val === 'number'
                  ? formatBigNumber(val)
                  : val;

              return (
                <td key={ii} className={`${alignment.text} p-2 ${textColor}`}>
                  {treatment ? (
                    <TableTreatments
                      treatment={treatment}
                      value={value}
                      alignment={alignment.content}
                    />
                  ) : (
                    ((!treatment && typeof value === 'string') ||
                      typeof value === 'number') &&
                    value
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
