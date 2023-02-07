import React from 'react';
import View from './performance-report.view';
import usePerformanceReport from './use-performance-report';

const PerformanceReport = () => {
  const { data } = usePerformanceReport();
  return <View data={data} />;
};

export default PerformanceReport;
