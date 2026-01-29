import React from 'react';

import View from './BusinessEngagement.view';
import useBusinessEngagement from './useBusinessEngagement';

const PerformanceReport = () => {
  const {
    componentRef,
    currentPage,
    data,
    dateRange,
    groups,
    handlePageChange,
    handlePrint,
    isPrinting,
    loading,
    pageSize,
    selectedGroups,
    setDateRange,
    setSelectedGroups,
  } = useBusinessEngagement();
  return (
    <View
      componentRef={componentRef}
      currentPage={currentPage}
      data={data}
      dateRange={dateRange}
      groups={groups}
      handlePageChange={handlePageChange}
      handlePrint={handlePrint}
      isPrinting={isPrinting}
      loading={loading}
      pageSize={pageSize}
      selectedGroups={selectedGroups}
      setDateRange={setDateRange}
      setSelectedGroups={setSelectedGroups}
    />
  );
};

export default PerformanceReport;
