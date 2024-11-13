import React from 'react';

import View from './BusinessEngagement.view';
import useBusinessEngagement from './useBusinessEngagement';

const PerformanceReport = () => {
  const {
    componentRef,
    data,
    dateRange,
    groups,
    handlePrint,
    isPrinting,
    loading,
    selectedGroups,
    setDateRange,
    setSelectedGroups,
  } = useBusinessEngagement();
  return (
    <View
      componentRef={componentRef}
      data={data}
      dateRange={dateRange}
      groups={groups}
      handlePrint={handlePrint}
      isPrinting={isPrinting}
      loading={loading}
      selectedGroups={selectedGroups}
      setDateRange={setDateRange}
      setSelectedGroups={setSelectedGroups}
    />
  );
};

export default PerformanceReport;
