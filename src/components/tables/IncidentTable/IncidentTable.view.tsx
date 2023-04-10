import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});
interface Props {
  incidents:
    | {
        id: string;
        reference?: number | null;
        dayTime?: string | null;
        crimeTypes: Array<{ id: string; name: string }>;
        createdBy: {
          id: string;
          fullName?: string;
          businesses: Array<{ id: string; name: string }>;
        };
      }[];

  hasNavigation: boolean;
}

const IncidentTable = ({
  incidents,

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
              onClick: () => navigate(`/app/incidents/view/${record.key}`),
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
          key: 'types',
          title: 'Types',
          dataIndex: 'types',
        },
        {
          key: 'date',
          title: 'Date',
          dataIndex: 'date',
        },
        {
          key: 'location',
          title: 'Location',
          dataIndex: 'location',
        },
      ]}
      dataSource={incidents.map((incident) => ({
        reference: incident.reference,
        types: incident.crimeTypes.map(
          (type, index) => `${index > 0 ? ' ' : ''}${type.name}`
        ),
        date: incident.dayTime,
        location: incident?.createdBy.businesses[0]?.name,
        key: incident.id,
      }))}
      pagination={
        incidents && incidents.length > 5
          ? {
              pageSize: 5,
            }
          : false
      }
    />
  );
};
export default IncidentTable;
