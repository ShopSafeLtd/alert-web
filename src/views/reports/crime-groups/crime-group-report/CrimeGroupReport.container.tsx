import React from 'react';
import { Col, Row } from 'antd';
import View from './CrimeGroupReport.view';
import useCrimeGroupReport from './useCrimeGroupReport';
import CrimeGroupSideList from '../../../../components/crimeGroups/sidelist';

const CrimeGroupReport = () => {
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
    selectedCrimeGroup,
    componentRef,
    handlePrint,
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
