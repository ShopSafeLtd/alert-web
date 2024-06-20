import React, { useState } from 'react';
import { Col, Row } from 'antd';
import View from './CrimeGroupReport.view';
import useCrimeGroupReport from './hooks/useCrimeGroupReport';
import CrimeGroupSideList from '../../../../components/crimeGroups/sidelist';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { useParams } from 'react-router-dom';

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
  } = useCrimeGroupReport();
  const [collapsed, setCollapsed] = useState(true);
  const { reportId } = useParams();

  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          selectedId={reportId ?? ''}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col>
        <CrimeGroupSideList
          to={`/app/reports/crime-groups/${reportId}/`}
          current={selectedCrimeGroup || ''}
        />
      </Col>
      <Col flex={1}>
        <View
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
