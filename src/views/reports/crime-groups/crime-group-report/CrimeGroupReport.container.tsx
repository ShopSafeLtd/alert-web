import React from 'react';
import View from './CrimeGroupReport.view';
import useCrimeGroupReport from './useCrimeGroupReport';

const CrimeGroupReport = () => {
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
    selectedCrimeGroup,
  } = useCrimeGroupReport();
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
      selectedCrimeGroup={selectedCrimeGroup}
    />
  );
};

export default CrimeGroupReport;
