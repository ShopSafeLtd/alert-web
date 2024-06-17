import React, { useState } from 'react';
import { Col, Row } from 'antd';
import View from './OffenderReport.view';
import useOffenderReport from './hooks/useOffenderReport';
import OffenderSideList from '../../../components/offenders/OffenderSideList';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';

const OffenderReport = () => {
  const {
    loading,
    data,
    groups,
    dateRange,
    setDateRange,
    setSelectedGroups,
    groupsLoading,
    selectedGroups,
    selectedBusiness,
    setSelectedBusiness,
    businesses,
    selectedOffender,
    componentRef,
    handlePrint,
    isPrinting,
    layout,
    setLayout,
    minDrawer,
    setMinDrawer,
    logo,
    removeItem,
    changeSize,
    targetedBusinessData,
    targetedGoodsData,
    incidentsTableData,
    editMode,
    setEditMode,
    addLogo,
    addLogoDrawer,
    logos,
    metadata,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedTemplate,
    setMetadata,
    setAddLogoDrawer,
    setSaveAsDrawer,
    templates,
    setAsDefault,
  } = useOffenderReport();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      </Col>
      <Col>
        <OffenderSideList
          to="/app/reports/offender-profile/"
          current={selectedOffender || ''}
        />
      </Col>
      <Col flex={1}>
        <View
          setAsDefault={setAsDefault}
          editMode={editMode}
          setEditMode={setEditMode}
          targetedGoodsData={targetedGoodsData}
          incidentsTableData={incidentsTableData}
          targetedBusinessData={targetedBusinessData}
          layout={layout}
          setLayout={setLayout}
          minDrawer={minDrawer}
          setMinDrawer={setMinDrawer}
          logo={logo}
          removeItem={removeItem}
          changeSize={changeSize}
          isPrinting={isPrinting}
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
          addLogo={addLogo}
          addLogoDrawer={addLogoDrawer}
          logos={logos}
          metadata={metadata}
          removeLogo={removeLogo}
          saveAsDrawer={saveAsDrawer}
          saveTemplate={saveTemplate}
          selectTemplate={selectTemplate}
          selectedTemplate={selectedTemplate}
          setMetadata={setMetadata}
          setAddLogoDrawer={setAddLogoDrawer}
          setSaveAsDrawer={setSaveAsDrawer}
          templates={templates}
        />
      </Col>
    </Row>
  );
};

export default OffenderReport;
