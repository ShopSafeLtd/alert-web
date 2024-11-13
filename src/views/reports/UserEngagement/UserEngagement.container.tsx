import React from 'react';

import View from './UserEngagement.view';
import useBusinessEngagement from './useUserEngagement';

const PerformanceReport = () => {
  const {
    componentRef,
    data,
    dateRange,
    filtersOpen,
    handlePrint,
    isPrinting,
    loading,
    search,
    selectedBusinessGroups,
    selectedBusinesses,
    selectedDataBrands,
    selectedGroups,
    selectedRoles,
    setDateRange,
    setSearch,
    setSelectedBusinessGroups,
    setSelectedBusinesses,
    setSelectedDataBrands,
    setSelectedGroups,
    setSelectedRoles,
    toggleFiltersOpen,
  } = useBusinessEngagement();

  return (
    <View
      componentRef={componentRef}
      data={data}
      dateRange={dateRange}
      filtersOpen={filtersOpen}
      handlePrint={handlePrint}
      isPrinting={isPrinting}
      loading={loading}
      search={search}
      selectedBusinessGroups={selectedBusinessGroups}
      selectedBusinesses={selectedBusinesses}
      selectedDataBrands={selectedDataBrands}
      selectedGroups={selectedGroups}
      selectedRoles={selectedRoles}
      setDateRange={setDateRange}
      setSearch={setSearch}
      setSelectedBusinessGroups={setSelectedBusinessGroups}
      setSelectedBusinesses={setSelectedBusinesses}
      setSelectedDataBrands={setSelectedDataBrands}
      setSelectedGroups={setSelectedGroups}
      setSelectedRoles={setSelectedRoles}
      toggleFiltersOpen={toggleFiltersOpen}
    />
  );
};

export default PerformanceReport;
