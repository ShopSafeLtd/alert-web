import React from 'react';
import View from './UserEngagement.view';
import useBusinessEngagement from './useUserEngagement';

const PerformanceReport = () => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    setSelectedGroups,
    selectedGroups,
    handlePrint,
    componentRef,
    filtersOpen,
    toggleFiltersOpen,
    setSelectedRoles,
    setSelectedBusinesses,
    selectedBusinesses,
    selectedRoles,
    search,
    setSearch,
  } = useBusinessEngagement();

  return (
    <View
      setSelectedGroups={setSelectedGroups}
      selectedGroups={selectedGroups}
      loading={loading}
      data={data}
      setDateRange={setDateRange}
      dateRange={dateRange}
      handlePrint={handlePrint}
      componentRef={componentRef}
      filtersOpen={filtersOpen}
      toggleFiltersOpen={toggleFiltersOpen}
      setSelectedRoles={setSelectedRoles}
      setSelectedBusinesses={setSelectedBusinesses}
      selectedBusinesses={selectedBusinesses}
      selectedRoles={selectedRoles}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default PerformanceReport;
