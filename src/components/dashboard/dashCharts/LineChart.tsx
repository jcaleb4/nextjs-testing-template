'use client';

import React, { FC } from 'react';
import LineChart from '@/components/charts/LineChart';
import { ChartOptions, ChartData } from 'chart.js';
import { hexToRGB } from '@/utils/Utils';
import { IChartData } from '../chartCards/ChartCard';

export interface ILineChartData {
  labels: string[];
  data: {
    [key: string]: IChartData[];
  };
  dataKey?: string;
  height?: number;
}

export interface ILineChartDataInternal {
  labels: string[];
  data: IChartData[];
  height?: number;
}

export const defaultValueKey = 'likes';

const LineChart1: FC<ILineChartDataInternal> = ({ data, labels, height }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
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
    scales: {
      x: {
        display: false,
      },
      x1: {
        display: false,
      },
      y: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const defaultOptions = {
    fill: true,
    borderWidth: 2,
    tension: 0,
    pointRadius: 0,
    pointHoverRadius: 3,
    pointBorderWidth: 0,
    pointHoverBorderWidth: 0,
    clip: 20,
  };

  const chartData = {
    labels,
    datasets: data.map((d, i) => {
      if (i === 0) {
        return {
          pointBackgroundColor: '#6366F1',
          pointHoverBackgroundColor: '#6366F1',
          backgroundColor: `rgba(${hexToRGB('#6366F1')}, 0.08)`,
          borderColor: '#6366F1',
          yAxisID: 'y',
          xAxisID: 'x',
          ...defaultOptions,
          ...d,
        };
      }

      return {
        borderColor: `rgba(${hexToRGB('#B7BFCB')}, 0.25)`,
        pointBackgroundColor: `rgba(${hexToRGB('#B7BFCB')}, 0.25)`,
        pointHoverBackgroundColor: `rgba(${hexToRGB('#B7BFCB')}, 0.25)`,
        yAxisID: 'y1',
        xAxisID: 'x1',
        ...defaultOptions,
        ...d,
      };
    }),
  };

  if (!data || data.length < 2) {
    <p>No data</p>;
  }

  return (
    <LineChart
      height={height}
      data={chartData as ChartData<'line'>}
      options={options as ChartOptions<'line'>}
    />
  );
};

export default LineChart1;
