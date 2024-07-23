import { FC, useState } from 'react';
import LineChart, {
  defaultValueKey,
} from '@/components/dashboard/dashCharts/LineChart';
import ChartCard, {
  IChartData,
} from '@/components/dashboard/chartCards/ChartCard';

interface IMultiSelectionLineChart {
  title: string;
  activity: {
    labels: string[];
    data: {
      [key: string]: IChartData[];
    };
  };
  displayKeySelection?: boolean;
  metricKey?: string;
}

const excludeOptions = ['date', 'totalActivity'];

const MultiSelectionLineChart: FC<IMultiSelectionLineChart> = ({
  title,
  activity,
  metricKey = defaultValueKey,
  displayKeySelection = true,
}) => {
  const [activityKey, setActivityKey] = useState(metricKey);
  const keyOptions = Object.keys(activity.data).filter(
    (option) => !excludeOptions.includes(option),
  );

  if (!activity?.data) {
    return null;
  }

  return (
    <ChartCard
      title={title}
      activityKey={activityKey}
      data={activity.data[activityKey]}
      displayKeySelection={displayKeySelection}
      onKeyChange={(option) => setActivityKey(option.id)}
      keyOptions={keyOptions}
    >
      <LineChart data={activity.data[activityKey]} labels={activity.labels} />
    </ChartCard>
  );
};

export default MultiSelectionLineChart;
