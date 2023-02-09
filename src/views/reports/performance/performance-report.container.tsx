import React from 'react';
import View from './performance-report.view';
import usePerformanceReport from './use-performance-report';

const PerformanceReport = () => {
  const { data, loading } = usePerformanceReport();
  return <View loading={loading} data={data} />;
};

export default PerformanceReport;
