import React from 'react';
import { Table, Typography } from 'antd';
import { useIntl } from 'react-intl';
import type { InvestigationStatus } from 'graphql/generated';
import GetInvestigationStatusValues from 'types/enums/investigation-status';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import moment from 'moment';

const useStyles = createUseStyles({
  row: {
    cursor: 'pointer',
  },
});
interface Props {
  investigations:
    | {
        id: string;
        name?: string | null | undefined;
        description?: string | null | undefined;
        status?: InvestigationStatus;
        createdAt: Date;
        reference?: string | null | undefined;
      }[]
    | undefined;
}

const InvestigationTable = ({ investigations }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Table
      size="small"
      // loading={loading}
      rowClassName={classes.row}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      onRow={(record) => ({
        onClick: () => navigate(`/app/investigations/view/${record.key}`),
      })}
      columns={[
        {
          key: 'name',
          title: intl.formatMessage({
            defaultMessage: 'Name',
            id: 'HAlOn1',
          }),
          dataIndex: 'name',
        },
        {
          key: 'reference',
          dataIndex: 'reference',
          title: intl.formatMessage({
            defaultMessage: 'Alert ID',
            id: 'k8ZNgH',
          }),
        },
        {
          key: 'status',
          dataIndex: 'status',
          title: intl.formatMessage({
            defaultMessage: 'Status',
            id: 'tzMNF3',
          }),
          render: (value: InvestigationStatus) => (
            <Typography.Text>
              {GetInvestigationStatusValues[value]}
            </Typography.Text>
          ),
        },
        {
          key: 'createdAt',
          dataIndex: 'createdAt',
          title: intl.formatMessage({
            defaultMessage: 'Date Opened',
            id: 'zQ9i1N',
          }),
          render: (value: string) => moment(value).format('DD/MM/YYYY'),
        },
        {
          key: 'description',
          dataIndex: 'description',
          title: intl.formatMessage({
            defaultMessage: 'Description',
            id: 'Q8Qw5B',
          }),
        },
      ]}
      dataSource={
        investigations?.map((investigation) => ({
          key: investigation.id,
          name: investigation.name || '',
          description: investigation.description,
          status: investigation.status,
          createdAt: investigation.createdAt,
          reference: investigation.reference,
        })) || []
      }
    />
  );
};
export default InvestigationTable;
