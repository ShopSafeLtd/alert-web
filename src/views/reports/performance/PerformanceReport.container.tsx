import React from 'react';
import View from './PerformanceReport.view';
import usePerformanceReport from './hooks/usePerformanceReport';

const PerformanceReport = (): JSX.Element => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    groupsLoading,
    setSelectedGroups,
    selectedGroups,
    componentRef,
    handlePrint,
    editMode,
    setEditMode,
    businessContributionTableData,
    userContributionTableData,
    offendersTableData,
    crimeGroupPerformanceTableData,
    targetedBusinessData,
    targetedGoodsData,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    removeItem,
    changeSize,
    isPrinting,
    metadata,
    setMetadata,
    removeLogo,
    setAddLogoDrawer,
    addLogoDrawer,
    logos,
    addLogo,
    selectTemplate,
    saveTemplate,
    templates,
    selectedTemplate,
    setSaveAsDrawer,
    saveAsDrawer,
    brandsLoading,
    brands,
    selectedBrands,
    setSelectedBrands,
  } = usePerformanceReport();
  return (
    <View
      selectedTemplate={selectedTemplate}
      selectTemplate={selectTemplate}
      saveTemplate={saveTemplate}
      saveAsDrawer={saveAsDrawer}
      setSaveAsDrawer={setSaveAsDrawer}
      templates={templates}
      addLogo={addLogo}
      logos={logos}
      setAddLogoDrawer={setAddLogoDrawer}
      addLogoDrawer={addLogoDrawer}
      removeLogo={removeLogo}
      metadata={metadata}
      setMetadata={setMetadata}
      isPrinting={isPrinting}
      removeItem={removeItem}
      changeSize={changeSize}
      layout={layout}
      setLayout={setLayout}
      minDrawer={minDrawer}
      setMinDrawer={setMinDrawer}
      targetedGoodsData={targetedGoodsData}
      targetedBusinessData={targetedBusinessData}
      crimeGroupPerformanceTableData={crimeGroupPerformanceTableData}
      offendersTableData={offendersTableData}
      userContributionTableData={userContributionTableData}
      businessContributionTableData={businessContributionTableData}
      editMode={editMode}
      setEditMode={setEditMode}
      componentRef={componentRef}
      handlePrint={handlePrint}
      setSelectedGroups={setSelectedGroups}
      selectedGroups={selectedGroups}
      loading={loading}
      data={data}
      setDateRange={setDateRange}
      dateRange={dateRange}
      groups={groups}
      groupsLoading={groupsLoading}
      brandsLoading={brandsLoading}
      brands={brands}
      selectedBrands={selectedBrands}
      setSelectedBrands={setSelectedBrands}
    />
  );
};

export default PerformanceReport;
