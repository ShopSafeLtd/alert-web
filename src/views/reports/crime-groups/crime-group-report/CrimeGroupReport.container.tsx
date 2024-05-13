import React from 'react';
import { Col, Row } from 'antd';
import View from './CrimeGroupReport.view';
import useCrimeGroupReport from './hooks/useCrimeGroupReport';
import CrimeGroupSideList from '../../../../components/crimeGroups/sidelist';

const CrimeGroupReport = () => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    businesses,
    selectedBusiness,
    setSelectedBusiness,
    selectedCrimeGroup,
    componentRef,
    handlePrint,
    addLogo,
    addLogoDrawer,
    changeSize,
    editMode,
    isPrinting,
    layout,
    logo,
    logos,
    metadata,
    minDrawer,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedTemplate,
    setAddLogoDrawer,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    templates,
    targetedBusinessData,
    targetedGoodsData,
    offendersTableData,
    incidentsTableData,
    setAsDefault,
  } = useCrimeGroupReport();
  return (
    <Row wrap={false}>
      <Col>
        <CrimeGroupSideList
          to="/app/reports/crime-groups/"
          current={selectedCrimeGroup || ''}
        />
      </Col>
      <Col flex={1}>
        <View
          setAsDefault={setAsDefault}
          targetedBusinessData={targetedBusinessData}
          targetedGoodsData={targetedGoodsData}
          offendersTableData={offendersTableData}
          incidentsTableData={incidentsTableData}
          isPrinting={isPrinting}
          removeItem={removeItem}
          changeSize={changeSize}
          layout={layout}
          setLayout={setLayout}
          minDrawer={minDrawer}
          setMinDrawer={setMinDrawer}
          addLogo={addLogo}
          addLogoDrawer={addLogoDrawer}
          logo={logo}
          logos={logos}
          metadata={metadata}
          removeLogo={removeLogo}
          saveAsDrawer={saveAsDrawer}
          saveTemplate={saveTemplate}
          selectTemplate={selectTemplate}
          selectedTemplate={selectedTemplate}
          setAddLogoDrawer={setAddLogoDrawer}
          setEditMode={setEditMode}
          setMetadata={setMetadata}
          setSaveAsDrawer={setSaveAsDrawer}
          templates={templates}
          editMode={editMode}
          selectedCrimeGroup={selectedCrimeGroup}
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
          setSelectedBusiness={setSelectedBusiness}
          selectedBusiness={selectedBusiness}
          businesses={businesses}
        />
      </Col>
    </Row>
  );
};

export default CrimeGroupReport;
