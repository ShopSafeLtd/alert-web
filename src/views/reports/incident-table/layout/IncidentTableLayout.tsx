import type { IncidentTableData } from 'components/reports/tableColumns';
import type RGL from 'react-grid-layout';

import IncidentTable from '#/components/reports/components/IncidentTable/IncidentTable.view';
import { Card } from 'antd';
import React, { useMemo } from 'react';

import type { AllowedValue, MetaData } from '../../types';
import type { IncidentTableReportQuery } from '../__generated__/incident-table-report-query.generated';
import type { Props as HookProps } from '../hooks/types';

type FilterProps = Pick<
  HookProps,
  | 'dateRange'
  | 'schemeId'
  | 'selectedBrands'
  | 'selectedGroups'
  | 'selectedIncidentTypes'
  | 'selectedIndustries'
  | 'selectedRoles'
>;

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  data: IncidentTableReportQuery | undefined;
  editMode: boolean;
  filters: FilterProps;
  incidentsTableData: [] | IncidentTableData[];
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const IncidentTableLayout = ({
  changeSize,
  data,
  editMode,
  filters,
  incidentsTableData,
  layout,
  loading,
  metadata,
  removeItem,
  setMetadata,
}: Props) => {
  interface GetComponentArgs {
    component: AllowedValue;
    key: AllowedValue;
  }

  const getComponent = ({ key }: GetComponentArgs) => (
    <Card
      bodyStyle={{ overflow: 'auto', padding: editMode ? '45px 0 0 0' : 0 }}
      className="no-break"
      key={key}
    >
      <IncidentTable
        changeSize={changeSize}
        data={data}
        defaultPageSize={20}
        editMode={editMode}
        incidentsTableData={incidentsTableData}
        loading={loading}
        metadata={metadata}
        removeItem={removeItem}
        setMetadata={setMetadata}
      />
    </Card>
  );

  return useMemo(
    () =>
      layout.map((component) =>
        getComponent({
          component: component.i.split('_')[0] as AllowedValue,
          key: component.i as AllowedValue,
        })
      ),
    [layout, data, loading, incidentsTableData, metadata, filters]
  );
};
export default IncidentTableLayout;
