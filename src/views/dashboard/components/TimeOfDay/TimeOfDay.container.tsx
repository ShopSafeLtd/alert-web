import React from 'react';
import useTimeOfDayGraph from './useTimeOfDayGraph';
import View from './TimeOfDay.view';

const TimeOfDayContainer = () => {
  const { data, loading } = useTimeOfDayGraph();
  return <View data={data} loading={loading} />;
};

export default TimeOfDayContainer;
