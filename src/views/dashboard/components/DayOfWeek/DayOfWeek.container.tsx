import useDayOfWeekGraph from '#/views/dashboard/components/DayOfWeek/useDayOfWeekGraph';
import React from 'react';

import View from './DayOfWeekGraph';

const DayOfWeekContainer = () => {
  const { data, loading } = useDayOfWeekGraph();
  return <View data={data} loading={loading} />;
};

export default DayOfWeekContainer;
