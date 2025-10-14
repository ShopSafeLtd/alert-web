import React from 'react';

import View from './TimeOfDay.view';
import useTimeOfDayGraph from './useTimeOfDayGraph';

const TimeOfDayContainer = () => {
  const { data, loading } = useTimeOfDayGraph();
  return <View data={data} loading={loading} />;
};

export default TimeOfDayContainer;
