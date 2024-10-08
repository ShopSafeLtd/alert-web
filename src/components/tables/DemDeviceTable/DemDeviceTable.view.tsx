import type { DemDeviceData } from '#/types/DataType';
import type { DeleteDemDeviceMutation } from '#/views/settings/Dem/demDevices/graphql/mutations/__generated__/delete-dem-device.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import errorNotification from '#/types/mutation_notifications/error_notification';
import { useDeleteDemDeviceMutation } from '#/views/settings/Dem/demDevices/graphql/mutations/__generated__/delete-dem-device.generated';
import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

interface Props {
  demDevices: DemDeviceData[] | undefined;
  saving?: boolean;
  setEditData?: (value: DemDeviceData) => void;
  update: MutationUpdaterFn<DeleteDemDeviceMutation>;
}

const DemDeviceTable = ({
  demDevices,
  saving: inputSaving,
  setEditData,
  update,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [saving, setSaving] = useState(inputSaving);

  useEffect(() => {
    if (inputSaving) setSaving(inputSaving);
  }, [inputSaving]);
  const [deleteDemDevice] = useDeleteDemDeviceMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The device has been Removed!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });
  const onDelete = (value: string) => {
    setSaving(true);
    void deleteDemDevice({
      variables: {
        id: value || '',
      },
    }).finally(() => setSaving(false));
  };
  return (
    <Table<DemDeviceData>
      columns={[
        {
          dataIndex: 'name',
          ellipsis: true,
          key: 'name',
          title: intl.formatMessage({
            defaultMessage: 'Name',
          }),
        },
        {
          dataIndex: 'serialNumber',
          key: 'serialNumber',
          title: intl.formatMessage({
            defaultMessage: 'Serial Number',
          }),
        },
        {
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (value: Date) => FormatCalendar(new Date(value), true),
          title: intl.formatMessage({
            defaultMessage: 'Created Date',
          }),
        },
        {
          dataIndex: 'Options',
          key: 'Options',
          render: (_, record) => (
            <Row gutter={8}>
              {
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Dem Device',
                    })}
                  >
                    <Link
                      to={`/app/scheme-settings/dem/dem-devices/view/${record.id}`}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>
              }
              {setEditData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Dem Device',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setEditData(record);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
              )}
              {onDelete && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Device',
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
                        onDelete(record.id || '');
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the device?',
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
        },
      ]}
      dataSource={demDevices}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      size="small"
    />
  );
};
export default DemDeviceTable;
