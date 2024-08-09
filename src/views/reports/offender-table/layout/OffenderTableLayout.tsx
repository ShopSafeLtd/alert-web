import type { OffenderTableReportQuery } from '#/views/reports/offender-table/__generated__/offender-table-report-query.generated';
import type { OffenderTableData } from 'components/reports/tableColumns';
import type RGL from 'react-grid-layout';

import OffenderTable from '#/components/reports/components/OffenderTable/OffenderTable.view';
import { Card } from 'antd';
import React, { useMemo } from 'react';

import type { AllowedValue, MetaData } from '../../types';
import type { Props as HookProps } from '../hooks/types';

type FilterProps = Pick<
  HookProps,
  | 'dateRange'
  | 'schemeId'
  | 'selectedBrands'
  | 'selectedGroups'
  | 'selectedIndustries'
  | 'selectedRoles'
>;

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  data: OffenderTableReportQuery | undefined;
  editMode: boolean;
  filters: FilterProps;
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  metadata: MetaData[];
  offendersTableData: [] | OffenderTableData[];
  removeItem: (arg0: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const OffenderTableLayout = ({
  changeSize,
  data,
  editMode,
  filters,
  layout,
  loading,
  metadata,
  offendersTableData,
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
      <OffenderTable
        changeSize={changeSize}
        data={data}
        defaultPageSize={20}
        editMode={editMode}
        loading={loading}
        metadata={metadata}
        offendersTableData={offendersTableData}
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
    [layout, data, loading, offendersTableData, metadata, filters]
  );
};
export default OffenderTableLayout;
