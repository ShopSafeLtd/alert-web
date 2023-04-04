import React from 'react';
import View from './OffenderReport.view';
import useOffenderReport from './useOffenderReport';

const OffenderReport = () => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    groupsLoading,
    setSelectedGroups,
    selectedGroups,
  } = useOffenderReport();
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
    />
  );
};

export default OffenderReport;
