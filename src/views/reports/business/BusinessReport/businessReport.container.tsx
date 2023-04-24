import React from 'react';
import View from './BusinessReport.view';
import useBusinessReport from './hooks/useBusinessReport';

const BusinessReport = (): JSX.Element => {
  const {
    removeItem,
    changeSize,
    minDrawer,
    setMinDrawer,
    layout,
    setLayout,
    logo,
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    componentRef,
    handlePrint,
    isPrinting,
    editMode,
    setEditMode,
    incidentsTableData,
    targetedGoodsData,
    crimeGroups,
    setSelectedCrimeGroups,
    selectedCrimeGroups,
    offenders,
    setSelectedOffenders,
    selectedOffenders,
    businessName,
  } = useBusinessReport();
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
      businessName={businessName}
      crimeGroups={crimeGroups}
      offenders={offenders}
      selectedCrimeGroups={selectedCrimeGroups}
      selectedOffenders={selectedOffenders}
      setSelectedCrimeGroups={setSelectedCrimeGroups}
      setSelectedOffenders={setSelectedOffenders}
      incidentsTableData={incidentsTableData}
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

export default BusinessReport;
