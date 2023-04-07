import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});
interface Props {
  vehicles:
    | {
        id: string;
        reference?: number | null;
        registration?: string | null;
        make?: string | null;
        colour?: string | null;
        model?: string | null;
      }[];
  hasNavigation: boolean;
}

const VehicleTable = ({ vehicles, hasNavigation }: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Table
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation
          ? {
              onClick: () => navigate(`/app/vehicles/view/${record.key}`),
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
          key: 'registration',
          dataIndex: 'registration',
          title: 'Registration',
        },
        {
          key: 'make',
          dataIndex: 'make',
          title: 'Make',
        },
        {
          key: 'colour',
          dataIndex: 'colour',
          title: 'Colour',
        },
        {
          key: 'model',
          dataIndex: 'model',
          title: 'Model',
        },
      ]}
      dataSource={vehicles.map((vehicle) => ({
        key: vehicle.id,
        reference: vehicle.reference,
        make: vehicle.make,
        colour: vehicle.colour,
        model: vehicle.model,
        registration: vehicle.registration,
      }))}
      pagination={
        vehicles && vehicles.length > 5
          ? {
              pageSize: 5,
            }
          : false
      }
    />
  );
};
export default VehicleTable;
