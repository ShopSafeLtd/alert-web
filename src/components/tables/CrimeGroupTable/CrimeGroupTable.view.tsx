import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import type { ColumnsType } from 'antd/es/table/interface';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});
interface Props {
  crimeGroups:
    | {
        id: string;
        reference?: number | null;
        alias?: string | null;
        totalOffenders?: number | null;
        totalIncidents?: number | null;
        totalValue?: number | null;
      }[];
  hasNavigation?: boolean;
}

interface CrimeGroupsTable {
  key: string;
  reference?: number | null;
  alias?: string | null;
  totalOffenders?: number | null;
  totalIncidents?: number | null;
  totalValue?: number | null;
}

const columns: ColumnsType<CrimeGroupsTable> = [
  {
    key: 'reference',
    dataIndex: 'reference',
    title: 'Alert ID',
    width: 100,
  },
  {
    key: 'alias',
    dataIndex: 'alias',
    title: 'Alias',
  },
  {
    key: 'totalOffenders',
    dataIndex: 'totalOffenders',
    title: 'Members',
  },
  {
    key: 'totalIncidents',
    dataIndex: 'totalIncidents',
    title: 'Incidents',
  },
  {
    key: 'totalValue',
    dataIndex: 'totalValue',
    title: 'Lost Value',
    render: (value) => `£${value.toLocaleString() || 0}`,
  },
  // {
  //   key: 'totalRecoveredValue',
  //   dataIndex: 'totalRecoveredValue',
  //   title: 'Recovered Value',
  //   render: (value) => `£${value || 0}`,
  // },
  // {
  //   key: 'totalTheftSuccess',
  //   dataIndex: 'totalTheftSuccess',
  //   title: 'Success Rate',
  //   render: (value) => `${value?.toFixed(0) || 0}%`,
  // },
];

const CrimeGroupTable = ({
  crimeGroups,
  hasNavigation,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Table<CrimeGroupsTable>
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation
          ? {
              onClick: () => navigate(`/app/crime-groups/view/${record.key}`),
            }
          : {}
      }
      columns={columns}
      dataSource={crimeGroups?.map((crimeGroup) => ({
        key: crimeGroup.id,
        reference: crimeGroup.reference,
        alias: crimeGroup.alias,
        totalOffenders: crimeGroup.totalOffenders || 0,
        totalIncidents: crimeGroup.totalIncidents || 0,
        totalValue: crimeGroup.totalValue || 0,
        // totalRecoveredValue:
        //   crimeGroup.totalRecoveredValue,
        // totalTheftSuccess: crimeGroup.totalTheftSuccess,
      }))}
      pagination={
        crimeGroups && crimeGroups.length > 5
          ? {
              pageSize: 5,
            }
          : false
      }
    />
  );
};
export default CrimeGroupTable;
