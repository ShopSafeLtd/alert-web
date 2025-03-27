import type { InvestigationStatus } from 'graphql/types';

import { Table, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import GetInvestigationStatusValues from 'types/enums/investigation-status';

const useStyles = createUseStyles({
  row: {
    cursor: 'pointer',
  },
});
interface Props {
  investigations:
    | {
        closedAt?: Date | null;
        createdAt: Date;
        description?: null | string | undefined;
        id: string;
        name?: null | string | undefined;
        reference?: null | number | string | undefined;
        status?: InvestigationStatus;
      }[]
    | undefined;
}

const InvestigationTable = ({ investigations }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Table
      columns={[
        {
          dataIndex: 'name',
          key: 'name',
          title: intl.formatMessage({
            defaultMessage: 'Name',
          }),
        },
        {
          dataIndex: 'reference',
          key: 'reference',
          title: intl.formatMessage({
            defaultMessage: 'Alert ID',
          }),
        },
        {
          dataIndex: 'status',
          key: 'status',
          render: (value: InvestigationStatus) => (
            <Typography.Text>
              {GetInvestigationStatusValues[value]}
            </Typography.Text>
          ),
          title: intl.formatMessage({
            defaultMessage: 'Status',
          }),
        },
        {
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (value: string) => dayjs(value).format('DD/MM/YYYY'),
          title: intl.formatMessage({
            defaultMessage: 'Date Opened',
          }),
        },
        {
          dataIndex: 'closedAt',
          key: 'closedAt',
          render: (value: string) =>
            value ? dayjs(value).format('DD/MM/YYYY') : undefined,
          title: intl.formatMessage({
            defaultMessage: 'Date Closed',
          }),
        },
        {
          dataIndex: 'description',
          key: 'description',
          title: intl.formatMessage({
            defaultMessage: 'Description',
          }),
        },
      ]}
      dataSource={
        investigations?.map((investigation) => ({
          createdAt: investigation.createdAt,
          description: investigation.description,
          key: investigation.id,
          name: investigation.name || '',
          reference: investigation.reference,
          status: investigation.status,
        })) || []
      }
      onRow={(record) => ({
        onClick: () => navigate(`/app/investigations/view/${record.key}`),
      })}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      // loading={loading}
      rowClassName={classes.row}
      size="small"
    />
  );
};
export default InvestigationTable;
