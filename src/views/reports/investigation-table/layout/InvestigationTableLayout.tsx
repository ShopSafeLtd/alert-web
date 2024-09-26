import type { InvestigationTableData } from 'components/reports/tableColumns';
import type RGL from 'react-grid-layout';

import InvestigationTable from '#/components/reports/components/InvestigationTable/InvestigationTable.view';
import { Card } from 'antd';
import React, { useMemo } from 'react';

import type { AllowedValue, MetaData } from '../../types';
import type { InvestigationTableReportQuery } from '../__generated__/investigation-table-report-query.generated';
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
  data: InvestigationTableReportQuery | undefined;
  editMode: boolean;
  filters: FilterProps;
  investigationsTableData: [] | InvestigationTableData[];
  isPrinting: boolean;
  layout: RGL.Layout[];
  loading: boolean;
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const InvestigationTableLayout = ({
  changeSize,
  data,
  editMode,
  filters,
  investigationsTableData,
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
      <InvestigationTable
        changeSize={changeSize}
        data={data}
        defaultPageSize={20}
        editMode={editMode}
        investigationsTableData={investigationsTableData}
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
    [layout, data, loading, investigationsTableData, metadata, filters]
  );
};
export default InvestigationTableLayout;
