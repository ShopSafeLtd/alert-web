import type { ActivityTableReportQuery } from '#/views/reports/activity-table/__generated__/activity-table-report-query.generated';
import type { ActivityTableData } from 'components/reports/tableColumns';
import type RGL from 'react-grid-layout';

import ActivityTable from '#/components/reports/components/ActivityTable/ActivityTable.view';
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
  activitiesTableData: [] | ActivityTableData[];
  changeSize: (arg0: string, arg1: number) => void;
  data: ActivityTableReportQuery | undefined;
  editMode: boolean;
  filters: FilterProps;
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const ActivityTableLayout = ({
  activitiesTableData,
  changeSize,
  data,
  editMode,
  filters,
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
      <ActivityTable
        activitiesTableData={activitiesTableData}
        changeSize={changeSize}
        data={data}
        defaultPageSize={20}
        editMode={editMode}
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
    [layout, data, loading, activitiesTableData, metadata, filters]
  );
};
export default ActivityTableLayout;
