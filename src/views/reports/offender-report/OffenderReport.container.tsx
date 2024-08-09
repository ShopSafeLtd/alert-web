import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import OffenderSideList from '../../../components/offenders/OffenderSideList';
import View from './OffenderReport.view';
import useOffenderReport from './hooks/useOffenderReport';

const OffenderReport = () => {
  const {
    addLogo,
    addLogoDrawer,
    businesses,
    changeSize,
    componentRef,
    data,
    dateRange,
    editMode,
    groups,
    groupsLoading,
    handlePrint,
    incidentsTableData,
    isPrinting,
    layout,
    loading,
    logo,
    logos,
    metadata,
    minDrawer,
    removeItem,
    removeLogo,
    saveAsDrawer,
    saveTemplate,
    selectTemplate,
    selectedBusiness,
    selectedGroups,
    selectedOffender,
    selectedTemplate,
    setAddLogoDrawer,
    setDateRange,
    setEditMode,
    setLayout,
    setMetadata,
    setMinDrawer,
    setSaveAsDrawer,
    setSelectedBusiness,
    setSelectedGroups,
    setSelectedSchemes,
    targetedBusinessData,
    targetedGoodsData,
    templates,
  } = useOffenderReport();
  const [collapsed, setCollapsed] = useState(true);
  const { reportId } = useParams();
  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId={reportId ?? ''}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col>
        <OffenderSideList
          current={selectedOffender || ''}
          to={`/app/reports/offender-profile/${reportId}/`}
        />
      </Col>
      <Col flex={1}>
        <View
          addLogo={addLogo}
          addLogoDrawer={addLogoDrawer}
          businesses={businesses}
          changeSize={changeSize}
          componentRef={componentRef}
          data={data}
          dateRange={dateRange}
          editMode={editMode}
          groups={groups}
          groupsLoading={groupsLoading}
          handlePrint={handlePrint}
          incidentsTableData={incidentsTableData}
          isPrinting={isPrinting}
          layout={layout}
          loading={loading}
          logo={logo}
          logos={logos}
          metadata={metadata}
          minDrawer={minDrawer}
          removeItem={removeItem}
          removeLogo={removeLogo}
          saveAsDrawer={saveAsDrawer}
          saveTemplate={saveTemplate}
          selectTemplate={selectTemplate}
          selectedBusiness={selectedBusiness}
          selectedGroups={selectedGroups}
          selectedTemplate={selectedTemplate}
          setAddLogoDrawer={setAddLogoDrawer}
          setDateRange={setDateRange}
          setEditMode={setEditMode}
          setLayout={setLayout}
          setMetadata={setMetadata}
          setMinDrawer={setMinDrawer}
          setSaveAsDrawer={setSaveAsDrawer}
          setSelectedBusiness={setSelectedBusiness}
          setSelectedGroups={setSelectedGroups}
          setSelectedSchemes={setSelectedSchemes}
          targetedBusinessData={targetedBusinessData}
          targetedGoodsData={targetedGoodsData}
          templates={templates}
        />
      </Col>
    </Row>
  );
};

export default OffenderReport;
