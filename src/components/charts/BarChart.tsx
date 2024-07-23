import { FC } from 'react';
import { Tooltip } from '@nextui-org/react';

interface IBarChart {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  displayTitles?: boolean;
}

const BarChart: FC<IBarChart> = ({ data, displayTitles }) => {
  const total = data.reduce((total, current) => total + current.value, 0);
  const options = data.map((option) => ({
    name: option.name,
    value: (option.value / total) * 100,
    color: option.color,
  }));

  return (
    <div>
      <div className="w-full flex ">
        {options.map((option, index) => (
          <Tooltip
            color="foreground"
            showArrow
            key={`bar-tooltip-${index}`}
            content={`${option.name.toUpperCase()}: ${option.value.toFixed(2)}%`}
          >
            <div
              className="h-6"
              style={{
                width: `${option.value}%`,
                backgroundColor: option.color,
              }}
            />
          </Tooltip>
        ))}
      </div>
      {displayTitles && (
        <ul className="flex flex-row justify-between pt-4">
          {options.map((option, index) => (
            <li
              key={`bar-key-${index}`}
              className="flex capitalize justify-between"
            >
              <div className="flex items-center gap-1 pr-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: option.color }}
                />
                <h4>{option.name}</h4>
              </div>
              <p className="text-slate-400 font-semibold">
                {option.value.toFixed(2)}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarChart;
