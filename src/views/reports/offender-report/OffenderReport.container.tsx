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
    setSelectedBusiness,
    selectedBusiness,
    businesses,
    selectedOffender,
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
      setSelectedBusiness={setSelectedBusiness}
      selectedBusiness={selectedBusiness}
      businesses={businesses}
      selectedOffender={selectedOffender}
    />
  );
};

export default OffenderReport;
