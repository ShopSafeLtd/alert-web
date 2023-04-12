import React from 'react';
import View from './performance-report.view';
import usePerformanceReport from './use-performance-report';

const PerformanceReport = (): JSX.Element => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    groupsLoading,
    setSelectedGroups,
    selectedGroups,
    componentRef,
    handlePrint,
  } = usePerformanceReport();
  return (
    <View
      componentRef={componentRef}
      handlePrint={handlePrint}
      setSelectedGroups={setSelectedGroups}
      selectedGroups={selectedGroups}
      loading={loading}
      data={data}
      setDateRange={setDateRange}
      dateRange={dateRange}
      groups={groups}
      groupsLoading={groupsLoading}
    />
  );
};

export default PerformanceReport;
