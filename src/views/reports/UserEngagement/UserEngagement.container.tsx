import React from 'react';
import View from './UserEngagement.view';
import useBusinessEngagement from './useUserEngagement';

const PerformanceReport = () => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    groupsLoading,
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
      groupsLoading={groupsLoading}
      handlePrint={handlePrint}
      componentRef={componentRef}
    />
  );
};

export default PerformanceReport;
