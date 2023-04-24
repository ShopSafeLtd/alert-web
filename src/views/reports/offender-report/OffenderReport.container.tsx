import React from 'react';
import { Col, Row } from 'antd';
import View from './OffenderReport.view';
import useOffenderReport from './hooks/useOffenderReport';
import OffenderSideList from '../../../components/offenders/OffenderSideList';

const OffenderReport = () => {
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
    targetedGoodsData,
    incidentsTableData,
    targetedBusinessData,
    editMode,
    setEditMode,
    selectedOffender,
  } = useOffenderReport();
  return (
    <Row wrap={false}>
      <Col>
        <OffenderSideList
          to="/app/reports/offender-profile/"
          current={selectedOffender || ''}
        />
      </Col>
      <Col flex={1}>
        <View
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
        />
      </Col>
    </Row>
  );
};

export default OffenderReport;
