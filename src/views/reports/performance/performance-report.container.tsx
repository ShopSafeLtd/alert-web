import React from 'react';
import View from './performance-report.view';
import usePerformanceReport from './hooks/use-performance-report';

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
    logo,
    removeItem,
    changeSize,
    isPrinting,
  } = usePerformanceReport();
  return (
    <View
      isPrinting={isPrinting}
      logo={logo}
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
    />
  );
};

export default PerformanceReport;
