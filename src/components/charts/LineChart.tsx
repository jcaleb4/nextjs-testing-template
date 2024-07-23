import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  ChartData,
  LineController,
  Filler,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
);

interface ILineChart {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
  height?: number;
}

const LineChart: FC<ILineChart> = ({ data, options, height }) => {
  return <Line height={height} options={options} data={data} />;
};

export default LineChart;
