import React from 'react';
import View from './BusinessEngagement.view';
import useBusinessEngagement from './useBusinessEngagement';

const PerformanceReport = () => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    setSelectedGroups,
    selectedGroups,
    handlePrint,
    componentRef,
  } = useBusinessEngagement();
  return (
    <View
      setSelectedGroups={setSelectedGroups}
      selectedGroups={selectedGroups}
      loading={loading}
      data={data}
      setDateRange={setDateRange}
      dateRange={dateRange}
      groups={groups}
      handlePrint={handlePrint}
      componentRef={componentRef}
    />
  );
};

export default PerformanceReport;
