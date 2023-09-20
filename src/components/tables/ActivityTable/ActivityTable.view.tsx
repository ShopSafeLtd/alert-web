import React from 'react';
import { Avatar, Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

interface TableItem {
  key: string;
  name: string;
  description: string | null | undefined;
  dueDate?: Date | null;
  assignedUsers: { id: string; fullName: string }[];
  completed: boolean;
}
interface Props {
  todos:
    | {
        id: string;
        name?: string | null | undefined;
        description?: string | null | undefined;
        dueDate?: Date | null;
        assignedUsers: { id: string; fullName: string }[];
        completed?: boolean | null | undefined;
      }[]
    | undefined;
  saving?: boolean;
  setViewTodoVisible: (value: string | null) => void;
  setCompleteTodoVisible: (value: string | null) => void;
}

const ActivityTable = ({
  todos,
  saving,
  setViewTodoVisible,
  setCompleteTodoVisible,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();
  const expandedRowRender = (record: TableItem) => (
    <Typography.Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
      {intl.formatMessage(
        {
          defaultMessage: ' Description: {description}',
          id: 'b/Uf3s',
        },
        {
          description: record.description,
        }
      )}
    </Typography.Text>
  );
  return (
    <Table
      size="small"
      // loading={loading}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
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
          key: 'completed',
          dataIndex: 'completed',
          title: intl.formatMessage({
            defaultMessage: 'Status',
            id: 'tzMNF3',
          }),
          ellipsis: true,
          render: (value: boolean) => (
            <Typography.Text type={value ? 'success' : 'warning'}>
              {value
                ? intl.formatMessage({
                    defaultMessage: 'Completed',
                    id: '95stPq',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Open',
                    id: 'JfG49w',
                  })}
            </Typography.Text>
          ),
        },
        {
          key: 'description',
          dataIndex: 'description',
          title: intl.formatMessage({
            defaultMessage: 'Description',
            id: 'Q8Qw5B',
          }),
          ellipsis: true,
        },

        {
          key: 'dueDate',
          dataIndex: 'dueDate',
          title: intl.formatMessage({
            defaultMessage: 'Due Date',
            id: '8XUukm',
          }),
          render: (value: Date) => FormatCalendar(new Date(value), true),
        },
        {
          key: 'assignedUsers',
          dataIndex: 'assignedUsers',
          title: intl.formatMessage({
            defaultMessage: 'Assigned Users',
            id: '8oku8d',
          }),
          ellipsis: true,
          render: (value: { id: string; fullName: string }[]) => (
            <Row gutter={4}>
              {value.map((item) => (
                <Col key={item.id}>
                  <Tooltip title={item.fullName}>
                    <Avatar
                      style={{
                        cursor: 'pointer',
                        fontSize: 14,
                      }}
                      size={30}
                    >
                      {item.fullName
                        .split(' ')
                        .map((split) => split.slice(0, 1).toUpperCase())
                        .toString()
                        .replace(',', '')}
                    </Avatar>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          ),
        },
        {
          key: 'actions',
          dataIndex: 'completed',
          render: (value: boolean, item) => (
            <Button
              size="small"
              type={value ? 'text' : 'ghost'}
              disabled={saving}
              danger={!value}
              onClick={() => {
                if (value) setViewTodoVisible(item.key);
                if (!value) setCompleteTodoVisible(item.key);
              }}
            >
              {value
                ? intl.formatMessage({
                    defaultMessage: 'View',
                    id: 'FgydNe',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Complete',
                    id: 'U78NhE',
                  })}
            </Button>
          ),
        },
      ]}
      dataSource={
        todos?.map((todo) => ({
          key: todo.id,
          name: todo.name || '',
          description: todo?.description,
          dueDate: todo.dueDate,
          completed: todo.completed || false,
          assignedUsers: todo.assignedUsers,
          // todo,
        })) || []
      }
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => !!record.description,
      }}
    />
  );
};
export default ActivityTable;
