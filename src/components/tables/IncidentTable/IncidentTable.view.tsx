import React from 'react';
import { Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import { Role } from 'graphql/generated';
import { useStoreState } from 'state';

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
        location?: {
          id: string;
          full?: string | undefined | null;
        } | null;
      }[];

  hasNavigation: boolean;
  pageSize?: number;
}

const IncidentTable = ({
  incidents,
  pageSize = 5,
  hasNavigation,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();
  const restrictIncidentAccess = useStoreState(
    (state) => state.scheme.restrictIncidentAccess
  );
  const role = useStoreState((state) => state.user.role);

  return (
    <Table
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation && role === Role.User && restrictIncidentAccess
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
      ]}
      dataSource={incidents.map((incident) => ({
        reference: incident.reference,
        types: incident.crimeTypes.map(
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
