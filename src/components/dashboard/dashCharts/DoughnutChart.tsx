'use client';

import { FC } from 'react';
import { ChartOptions, ChartData } from 'chart.js';
import DoughnutChartComp from '../../charts/DoughnutChart';
interface IDoughnutChart {
  data: ChartData<'doughnut'>;
}

const DoughnutChart: FC<IDoughnutChart> = ({ data }) => {
  const options = {
    cutout: '80%',
    // layout: {
    //   padding: 20,
    // },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        borderWidth: 1,
        displayColors: false,
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
        caretSize: 5,
        caretPadding: 20,
        cornerRadius: 4,
        padding: 8,
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    // animation: {
    //   duration: 500,
    // },
    // maintainAspectRatio: false,
    // resizeDelay: 200,
  };

  return (
    <DoughnutChartComp
      data={data}
      options={options as ChartOptions<'doughnut'>}
    />
  );
};

export default DoughnutChart;
