import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';

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

const CrimeGroupTable = ({
  crimeGroups,
  hasNavigation,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Table
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation
          ? {
              onClick: () => navigate(`/app/crime-groups/view/${record.key}`),
            }
          : {}
      }
      columns={[
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
      ]}
      dataSource={crimeGroups?.map((crimeGroup) => ({
        key: crimeGroup.id,
        reference: crimeGroup.reference,
        alias: crimeGroup.alias,
        totalOffenders: crimeGroup.totalOffenders,
        totalIncidents: crimeGroup.totalIncidents,
        totalValue: crimeGroup.totalValue,
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
