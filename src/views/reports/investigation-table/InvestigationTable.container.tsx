import React from 'react';

import View from './InvestigationTable.view';
import useOffenderTable from './hooks/useInvestigationTable';

const PerformanceReport = (): JSX.Element => {
  const {
    addLogo,
    addLogoDrawer,
    businessesIds,
    changeSize,
    componentRef,
    crimeGroupIds,
    data,
    dateRange,
    dateRangeMode,
    editMode,
    filterCount,
    filtersOpen,
    groups,
    handlePrint,

    investigationsTableData,
    isPrinting,
    layout,
    loading,
    logoMetaData,
    logos,
    metadata,
    minDrawer,
    redactOnPrint,
    removeItem,
    removeLogo,
    reportData,
    saveAsDrawer,
    saveTemplate,
    saving,
    schemeId,
    search,
    selectTemplate,
    selectedBrands,
    selectedGroups,
    selectedIndustries,
    selectedRoles,
    selectedTemplate,
    setAddLogoDrawer,
    setBusinessesIds,
    setCrimeGroupIds,
    setDateRange,
    setEditMode,

    setLayout,
    setMetadata,
    setMinDrawer,
    setRedactOnPrint,
    setSaveAsDrawer,
    setSearch,
    setSelectedBrands,
    setSelectedGroups,
    setSelectedIndustries,
    setSelectedRoles,
    setStatus,
    setTotalValue,
    status,
    tableReportLoading,
    templates,
    toggleFiltersOpen,
    totalValue,
  } = useOffenderTable();
  return (
    <View
      addLogo={addLogo}
      addLogoDrawer={addLogoDrawer}
      businessesIds={businessesIds}
      changeSize={changeSize}
      componentRef={componentRef}
      crimeGroupIds={crimeGroupIds}
      data={data}
      dateRange={dateRange}
      dateRangeMode={dateRangeMode}
      editMode={editMode}
      filterCount={filterCount}
      filtersOpen={filtersOpen}
      groups={groups}
      handlePrint={handlePrint}
      investigationsTableData={investigationsTableData}
      isPrinting={isPrinting}
      layout={layout}
      loading={loading}
      logoMetaData={logoMetaData}
      logos={logos}
      metadata={metadata}
      minDrawer={minDrawer}
      redactOnPrint={redactOnPrint}
      removeItem={removeItem}
      removeLogo={removeLogo}
      reportData={reportData}
      saveAsDrawer={saveAsDrawer}
      saveTemplate={saveTemplate}
      saving={saving}
      schemeId={schemeId}
      search={search}
      selectTemplate={selectTemplate}
      selectedBrands={selectedBrands}
      selectedGroups={selectedGroups}
      selectedIndustries={selectedIndustries}
      selectedRoles={selectedRoles}
      selectedTemplate={selectedTemplate}
      setAddLogoDrawer={setAddLogoDrawer}
      setBusinessesIds={setBusinessesIds}
      setCrimeGroupIds={setCrimeGroupIds}
      setDateRange={setDateRange}
      setEditMode={setEditMode}
      setLayout={setLayout}
      setMetadata={setMetadata}
      setMinDrawer={setMinDrawer}
      setRedactOnPrint={setRedactOnPrint}
      setSaveAsDrawer={setSaveAsDrawer}
      setSearch={setSearch}
      setSelectedBrands={setSelectedBrands}
      setSelectedGroups={setSelectedGroups}
      setSelectedIndustries={setSelectedIndustries}
      setSelectedRoles={setSelectedRoles}
      setStatus={setStatus}
      setTotalValue={setTotalValue}
      status={status}
      tableReportLoading={tableReportLoading}
      templates={templates}
      toggleFiltersOpen={toggleFiltersOpen}
      totalValue={totalValue}
    />
  );
};

export default PerformanceReport;
