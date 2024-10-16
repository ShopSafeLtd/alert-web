import type { ImagePosition } from 'graphql/types';
import type { VehicleData } from 'types/DataType';

import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});
interface Props {
  deleteRights?: boolean;
  editRights?: boolean;
  hasNavigation?: boolean;
  onDeleteVehicle?: (id: string) => void;
  saving?: boolean;
  setEditVehicleData?: (value: VehicleData | null) => void;
  vehicles:
    | {
        colour?: null | string;
        id: string;
        images?:
          | {
              id: string;
              optimised?: null | string | undefined;
              position?: ImagePosition;
              rotation?: number;
            }[]
          | null
          | undefined;
        make?: null | string;
        model?: null | string;
        reference?: null | number;
        registration?: null | string;
      }[]
    | undefined;
}
//  wait to check
const VehicleTable = ({
  deleteRights,
  editRights,
  hasNavigation,
  onDeleteVehicle,
  saving,
  setEditVehicleData,
  vehicles,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Table
      columns={[
        {
          dataIndex: 'images',
          key: 'images',
          render: (
            item: {
              optimised?: null | string | undefined;
              position: ImagePosition | undefined;
              rotation: number | undefined;
            }[]
          ) => {
            if (item && item[0])
              return (
                <div style={{ height: 100, width: 80 }}>
                  <WatermarkImage
                    position={item[0]?.position}
                    rotation={item[0]?.rotation}
                    url={item[0]?.optimised}
                  />
                </div>
              );
            return null;
          },
          title: '',
        },
        {
          dataIndex: 'reference',
          key: 'reference',
          render: (
            _,
            record: { key: string; reference: null | number | undefined }
          ) => {
            if (hasNavigation) {
              return (
                <Link to={`/app/vehicles/view/${record.key}`}>
                  {record.reference}
                </Link>
              );
            }
            return <Typography.Text>{record.reference}</Typography.Text>;
          },
          title: intl.formatMessage({
            defaultMessage: 'Alert ID',
          }),
          width: 80,
        },
        {
          dataIndex: 'registration',
          key: 'registration',
          title: intl.formatMessage({
            defaultMessage: 'Registration',
          }),
        },
        {
          dataIndex: 'make',
          key: 'make',
          title: intl.formatMessage({
            defaultMessage: 'Make',
          }),
        },
        {
          dataIndex: 'colour',
          key: 'colour',
          title: intl.formatMessage({
            defaultMessage: 'Colour',
          }),
        },
        {
          dataIndex: 'model',
          key: 'model',
          title: intl.formatMessage({
            defaultMessage: 'Model',
          }),
        },
        {
          dataIndex: 'Options',
          key: 'Options',
          render: (_, record: { key: string; vehicle: VehicleData | null }) => (
            <Row gutter={8}>
              {hasNavigation && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Vehicle',
                    })}
                  >
                    <Link to={`/app/vehicles/view/${record.key}`}>
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>
              )}
              {editRights && setEditVehicleData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Vehicle',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setEditVehicleData(record.vehicle);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
              )}
              {deleteRights && onDeleteVehicle && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Vehicle',
                    })}
                  >
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => {
                        onDeleteVehicle(record.key);
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the vehicle?',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        size="small"
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              )}
            </Row>
          ),
          title: '',
          width: 100,
        },
      ].filter((item) => item?.key !== 'Options' || deleteRights || editRights)}
      dataSource={
        vehicles?.map((vehicle) => ({
          colour: vehicle.colour,
          images: vehicle.images,
          key: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          reference: vehicle.reference,
          registration: vehicle.registration,
          vehicle,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      size="small"
    />
  );
};
export default VehicleTable;
