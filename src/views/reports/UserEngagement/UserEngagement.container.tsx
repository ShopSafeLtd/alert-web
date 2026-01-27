import React from 'react';

import View from './UserEngagement.view';
import useBusinessEngagement from './useUserEngagement';

const PerformanceReport = () => {
  const {
    componentRef,
    currentPage,
    data,
    dateRange,
    filtersOpen,
    handlePageChange,
    handlePrint,
    handleSort,
    isPrinting,
    loading,
    pageSize,
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
    sortDirection,
    sortField,
    toggleFiltersOpen,
  } = useBusinessEngagement();

  return (
    <View
      componentRef={componentRef}
      currentPage={currentPage}
      data={data}
      dateRange={dateRange}
      filtersOpen={filtersOpen}
      handlePageChange={handlePageChange}
      handlePrint={handlePrint}
      handleSort={handleSort}
      isPrinting={isPrinting}
      loading={loading}
      pageSize={pageSize}
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
      sortDirection={sortDirection}
      sortField={sortField}
      toggleFiltersOpen={toggleFiltersOpen}
    />
  );
};

export default PerformanceReport;
