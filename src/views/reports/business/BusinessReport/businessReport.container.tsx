import React from 'react';

import View from './BusinessReport.view';
import useBusinessReport from './hooks/useBusinessReport';

const BusinessReport = (): JSX.Element => {
  const {
    addLogo,
    addLogoDrawer,
    businessName,
    changeSize,
    componentRef,
    crimeGroups,
    data,
    dateRange,
    editMode,
    filterCount,
    filtersOpen,
    groups,
    groupsLoading,
    handlePrint,
    incidentsTableData,
    isPrinting,
    layout,
    loading,
    logos,
    metadata,
    minDrawer,
    offenders,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedCrimeGroups,
    selectedGroups,
    selectedOffenders,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedCrimeGroups,
    setSelectedGroups,
    setSelectedOffenders,
    targetedGoodsData,
    templates,
    toggleFiltersOpen,
  } = useBusinessReport();
  return (
    <View
      addLogo={addLogo}
      addLogoDrawer={addLogoDrawer}
      businessName={businessName}
      changeSize={changeSize}
      componentRef={componentRef}
      crimeGroups={crimeGroups}
      data={data}
      dateRange={dateRange}
      editMode={editMode}
      filterCount={filterCount}
      filtersOpen={filtersOpen}
      groups={groups}
      groupsLoading={groupsLoading}
      handlePrint={handlePrint}
      incidentsTableData={incidentsTableData}
      isPrinting={isPrinting}
      layout={layout}
      loading={loading}
      logos={logos}
      metadata={metadata}
      minDrawer={minDrawer}
      offenders={offenders}
      removeItem={removeItem}
      removeLogo={removeLogo}
      saveAsDrawer={saveAsDrawer}
      saveTemplate={saveTemplate}
      selectTemplate={selectTemplate}
      selectedCrimeGroups={selectedCrimeGroups}
      selectedGroups={selectedGroups}
      selectedOffenders={selectedOffenders}
      selectedTemplate={selectedTemplate}
      setAddLogoDrawer={setAddLogoDrawer}
      setDateRange={setDateRange}
      setEditMode={setEditMode}
      setLayout={setLayout}
      setMetadata={setMetadata}
      setMinDrawer={setMinDrawer}
      setSaveAsDrawer={setSaveAsDrawer}
      setSelectedCrimeGroups={setSelectedCrimeGroups}
      setSelectedGroups={setSelectedGroups}
      setSelectedOffenders={setSelectedOffenders}
      targetedGoodsData={targetedGoodsData}
      templates={templates}
      toggleFiltersOpen={toggleFiltersOpen}
    />
  );
};

export default BusinessReport;
