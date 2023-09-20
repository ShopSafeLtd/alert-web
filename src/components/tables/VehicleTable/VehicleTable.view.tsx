import React from 'react';
import { Button, Col, Popconfirm, Row, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import type { VehicleData } from 'types/DataType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';

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
      }[]
    | undefined;
  hasNavigation?: boolean;
  saving?: boolean;
  setEditVehicleData?: (value: VehicleData | null) => void;
  onDeleteVehicle?: (id: string) => void;
  editRights?: boolean;
  deleteRights?: boolean;
}
//  wait to check
const VehicleTable = ({
  vehicles,
  hasNavigation,
  saving,
  setEditVehicleData,
  onDeleteVehicle,
  editRights,
  deleteRights,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

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
          title: intl.formatMessage({
            defaultMessage: 'Alert ID',
            id: 'k8ZNgH',
          }),
          // render: (_, record) => {
          //   hasNavigation ? (
          //     <Link to={`vehicles/view/${record.key}`} />
          //   ) : (
          //     <Typography.Text>{record.reference}</Typography.Text>
          //   );
          // },
          width: 100,
        },
        {
          key: 'registration',
          dataIndex: 'registration',
          title: intl.formatMessage({
            defaultMessage: 'Registration',
            id: 'qv7ied',
          }),
        },
        {
          key: 'make',
          dataIndex: 'make',
          title: intl.formatMessage({
            defaultMessage: 'Make',
            id: '6AAM0P',
          }),
        },
        {
          key: 'colour',
          dataIndex: 'colour',
          title: intl.formatMessage({
            defaultMessage: 'Colour',
            id: '+e8vAT',
          }),
        },
        {
          key: 'model',
          dataIndex: 'model',
          title: intl.formatMessage({
            defaultMessage: 'Model',
            id: 'rhSI1/',
          }),
        },
        {
          key: 'Options',
          title: '',
          dataIndex: 'Options',
          width: 100,
          render: (_, record) => (
            <Row gutter={8}>
              {editRights && setEditVehicleData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Vehicle',
                      id: 'X/6z9r',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setEditVehicleData(record.vehicle);
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
              )}
              {deleteRights && onDeleteVehicle && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Vehicle',
                      id: 'Mcn1/c',
                    })}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the vehicle?',
                        id: 'hHs0lD',
                      })}
                      onConfirm={() => {
                        onDeleteVehicle(record.key);
                      }}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              )}
            </Row>
          ),
        },
      ]}
      dataSource={
        vehicles?.map((vehicle) => ({
          key: vehicle.id,
          reference: vehicle.reference,
          make: vehicle.make,
          colour: vehicle.colour,
          model: vehicle.model,
          registration: vehicle.registration,
          vehicle,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
    />
  );
};
export default VehicleTable;
