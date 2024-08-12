import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import { Role } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});

interface Props {
  deleteRights?: boolean;
  hasNavigation?: boolean;
  incidents:
    | {
        business?: {
          id: string;
          name?: null | string | undefined;
        } | null;
        dayTime?: null | string;
        id: string;
        // };
        location?: {
          full?: null | string | undefined;
          id: string;
        } | null;
        policeRef?: null | string;
        reference?: null | number;
        subject?: null | string;
        // crimeTypes?: Array<{ id: string; name: string }>;
        // createdBy?: {
        //   id: string;
        //   fullName?: string;
        //   businesses: Array<{ id: string; name: string }>;
        totalRecoveredValue?: null | number;
        totalValue?: null | number;
      }[]
    | undefined;
  onDelete?: (id: string) => void;
  pageSize?: number;
  saving?: boolean;
  setEditData?: (id: string) => void;
}

const IncidentTable = ({
  deleteRights,
  hasNavigation,
  incidents,
  onDelete,
  pageSize,
  saving,
  setEditData,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const restrictIncidentAccess =
    useStoreState((state) => state.scheme.restrictIncidentAccess) &&
    role === Role.User;

  return (
    <Table
      columns={[
        {
          dataIndex: 'reference',
          key: 'reference',
          render: (
            _,
            record: { key: string; reference: null | number | undefined }
          ) => {
            if (hasNavigation && !restrictIncidentAccess) {
              return (
                <Link to={`/app/incidents/view/${record.key}`}>
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
          dataIndex: 'policeRef',
          key: 'policeRef',
          title: intl.formatMessage({
            defaultMessage: 'Crime No.',
          }),
        },
        {
          dataIndex: 'subject',
          key: 'subject',
          title: intl.formatMessage({
            defaultMessage: 'Subject',
          }),
        },
        {
          dataIndex: 'date',
          key: 'date',
          title: intl.formatMessage({
            defaultMessage: 'Date',
          }),
        },
        {
          dataIndex: 'loss',
          key: 'loss',
          render: (value: number) => `£${value.toLocaleString()}`,
          title: intl.formatMessage({
            defaultMessage: 'Loss',
          }),
        },
        {
          dataIndex: 'location',
          key: 'location',
          title: intl.formatMessage({
            defaultMessage: 'Location',
          }),
        },
        {
          dataIndex: 'Options',
          key: 'Options',
          render: (_, record: { key: string }) => (
            <Row gutter={8}>
              {hasNavigation && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Incident',
                    })}
                  >
                    <Link to={`/app/incidents/view/${record.key}`}>
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>
              )}
              {setEditData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Incident',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setEditData(record.key);
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
                      defaultMessage: 'Remove Incident',
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
                        onDelete(record.key);
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the incident?',
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
      ].filter((item) => item?.key !== 'Options' || deleteRights)}
      dataSource={
        incidents?.map((incident) => ({
          date: incident?.dayTime,
          key: incident?.id,
          location: incident?.business?.name ?? incident?.location?.full,
          loss:
            (incident?.totalValue || 0) - (incident?.totalRecoveredValue || 0),
          policeRef: incident?.policeRef,
          reference: incident?.reference,
          subject: incident?.subject,
        })) || []
      }
      pagination={{
        defaultPageSize: 5 || pageSize,
        pageSizeOptions: [5, 10, 20, 50, 100],
        showSizeChanger: true,
      }}
      rowClassName={classes.row}
      size="small"
    />
  );
};

export default IncidentTable;
