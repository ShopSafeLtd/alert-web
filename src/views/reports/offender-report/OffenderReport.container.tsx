import React from 'react';
import { Col, Row } from 'antd';
import View from './OffenderReport.view';
import useOffenderReport from './useOffenderReport';
import OffenderSideList from '../../../components/offenders/OffenderSideList';

const OffenderReport = () => {
  const {
    data,
    loading,
    setDateRange,
    dateRange,
    groups,
    groupsLoading,
    setSelectedGroups,
    selectedGroups,
    setSelectedBusiness,
    selectedBusiness,
    businesses,
    selectedOffender,
    componentRef,
    handlePrint,
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
