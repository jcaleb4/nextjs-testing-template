import { FC } from 'react';
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(DoughnutController, ArcElement, TimeScale, Tooltip, Legend);

interface IDoughnutChart {
  options: ChartOptions<'doughnut'>;
  data: ChartData<'doughnut'>;
}

const DoughnutChart: FC<IDoughnutChart> = ({ data, options }) => {
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
