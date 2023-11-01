import React from 'react';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import { Role } from 'graphql/generated';
import { useStoreState } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});

interface Props {
  incidents:
    | {
        id: string;
        reference?: number | null;
        dayTime?: string | null;
        policeRef?: string | null;
        subject?: string | null;
        totalValue?: number | null;
        totalRecoveredValue?: number | null;
        // crimeTypes?: Array<{ id: string; name: string }>;
        // createdBy?: {
        //   id: string;
        //   fullName?: string;
        //   businesses: Array<{ id: string; name: string }>;
        // };
        location?: {
          id: string;
          full?: string | undefined | null;
        } | null;
      }[]
    | undefined;
  hasNavigation?: boolean;
  setEditData?: (id: string) => void;
  pageSize?: number;
  onDelete?: (id: string) => void;
  deleteRights?: boolean;
  saving?: boolean;
}

const IncidentTable = ({
  incidents,
  pageSize,
  hasNavigation,
  onDelete,
  deleteRights,
  setEditData,
  saving,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const restrictIncidentAccess =
    useStoreState((state) => state.scheme.restrictIncidentAccess) &&
    role === Role.User;

  return (
    <Table
      size="small"
      rowClassName={classes.row}
      columns={[
        {
          key: 'reference',
          dataIndex: 'reference',
          title: intl.formatMessage({
            id: 'k8ZNgH',
            defaultMessage: 'Alert ID',
          }),
          render: (
            _,
            record: { key: string; reference: number | null | undefined }
          ) => {
            if (hasNavigation && !restrictIncidentAccess) {
              return (
                <Link to={`/app/incidents/view/${record.key}`}>
                  <Typography.Text type="warning">
                    {record.reference}
                  </Typography.Text>
                </Link>
              );
            }
            return <Typography.Text>{record.reference}</Typography.Text>;
          },
          width: 80,
        },
        {
          key: 'policeRef',
          dataIndex: 'policeRef',
          title: intl.formatMessage({
            defaultMessage: 'Crime No.',
            id: 'B0ihHq',
          }),
        },
        {
          key: 'subject',
          dataIndex: 'subject',
          title: intl.formatMessage({
            defaultMessage: 'Subject',
            id: 'LLtKhp',
          }),
        },
        {
          key: 'date',
          dataIndex: 'date',
          title: intl.formatMessage({
            defaultMessage: 'Date',
            id: 'P7PLVj',
          }),
        },
        {
          key: 'loss',
          dataIndex: 'loss',
          title: intl.formatMessage({
            defaultMessage: 'Loss',
            id: 'mv038n',
          }),
          render: (value: number) => `£${value.toLocaleString()}`,
        },
        {
          key: 'location',
          dataIndex: 'location',
          title: intl.formatMessage({
            defaultMessage: 'Location',
            id: 'rvirM2',
          }),
        },
        {
          key: 'Options',
          title: '',
          dataIndex: 'Options',
          width: 100,
          render: (_, record: { key: string }) => (
            <Row gutter={8}>
              {setEditData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Incident',
                      id: 'E6VJFN',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setEditData(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
              )}
              {onDelete && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Incident',
                      id: 'NhpFO7',
                    })}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the incident?',
                        id: '+pfPgu',
                      })}
                      onConfirm={() => {
                        onDelete(record.key);
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
      ].filter((item) => item?.key !== 'Options' || deleteRights)}
      dataSource={
        incidents?.map((incident) => ({
          key: incident?.id,
          reference: incident?.reference,
          policeRef: incident?.policeRef,
          subject: incident?.subject,
          date: incident?.dayTime,
          location: incident?.location?.full,
          loss:
            (incident?.totalValue || 0) - (incident?.totalRecoveredValue || 0),
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: pageSize || 5,
      }}
    />
  );
};

export default IncidentTable;
