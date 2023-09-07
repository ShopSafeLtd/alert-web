import React from 'react';
import { Button, Col, Popconfirm, Row, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import { Role } from 'graphql/generated';
import { useStoreState } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});

interface Props {
  incidents:
    | {
        id: string;
        reference?: number | null;
        dayTime?: string | null;
        crimeTypes?: Array<{ id: string; name: string }>;
        createdBy?: {
          id: string;
          fullName?: string;
          businesses: Array<{ id: string; name: string }>;
        };
        location?: {
          id: string;
          full?: string | undefined | null;
        } | null;
      }[];

  hasNavigation: boolean;
  pageSize?: number;
  onDelete?: (id: string) => void;
  deleteRights?: boolean;
  saving?: boolean;
}

const IncidentTable = ({
  incidents,
  pageSize = 5,
  hasNavigation,
  onDelete,
  deleteRights,
  saving,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const restrictIncidentAccess =
    useStoreState((state) => state.scheme.restrictIncidentAccess) &&
    role === Role.User;

  return (
    <Table
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation && !restrictIncidentAccess
          ? {
              onClick: () => navigate(`/app/incidents/view/${record.key}`),
            }
          : {}
      }
      columns={[
        {
          key: 'reference',
          dataIndex: 'reference',
          title: intl.formatMessage({
            id: 'k8ZNgH',
            defaultMessage: 'Alert ID',
          }),
          width: 100,
        },
        {
          key: 'types',
          title: intl.formatMessage({ id: 'kxP9GJ', defaultMessage: 'Types' }),
          dataIndex: 'types',
        },
        {
          key: 'date',
          title: intl.formatMessage({ id: 'P7PLVj', defaultMessage: 'Date' }),
          dataIndex: 'date',
        },
        {
          key: 'location',
          title: intl.formatMessage({
            id: 'rvirM2',
            defaultMessage: 'Location',
          }),
          dataIndex: 'location',
          ellipsis: true,
          render: (value: string) => <Tooltip title={value}>{value}</Tooltip>,
        },
        {
          key: 'Options',
          title: '',
          dataIndex: 'Options',
          width: 100,
          render: (_, record) => (
            <Row gutter={8}>
              {deleteRights && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Offender',
                      id: 'cZH2Kj',
                    })}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the offender?',
                        id: 'ttuPSC',
                      })}
                      onConfirm={() => {
                        if (onDelete) onDelete(record.key);
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
      dataSource={incidents.map((incident) => ({
        reference: incident.reference,
        types: incident.crimeTypes?.map(
          (type, index) => `${index > 0 ? ' ' : ''}${type.name}`
        ),
        date: incident.dayTime,
        location: incident.location?.full,
        key: incident.id,
      }))}
      pagination={
        incidents && incidents.length > pageSize
          ? {
              pageSize,
            }
          : false
      }
    />
  );
};

export default IncidentTable;
