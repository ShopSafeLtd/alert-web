import { faEye, faFlagCheckered } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Col, Row, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

interface Props {
  saving?: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setViewTodoVisible: (value: null | string) => void;
  todos:
    | {
        assignedUsers: { fullName: string; id: string }[];
        completed?: boolean | null | undefined;
        completedDate?: Date | null | undefined;
        createdAt?: Date | null | undefined;
        createdBy?: { fullName: string; id: string } | null | undefined;
        dueDate?: Date | null | undefined;
        id: string;
        name?: null | string | undefined;
        reference?: null | number | undefined;
      }[]
    | undefined;
}

const ActivityTable = ({
  saving,
  setCompleteTodoVisible,
  setViewTodoVisible,
  todos,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();

  return (
    <Table
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
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (value: Date) => FormatCalendar(new Date(value), intl, true),
          title: intl.formatMessage({
            defaultMessage: 'Created Date',
          }),
        },
        {
          dataIndex: 'dueDate',
          key: 'dueDate',
          render: (value: Date) =>
            value ? FormatCalendar(new Date(value), intl, true) : '-',
          title: intl.formatMessage({
            defaultMessage: 'Due Date',
          }),
        },
        {
          dataIndex: 'createdBy',
          key: 'createdBy',
          render: (value: { fullName: string; id: string } | null) =>
            value ? value.fullName : '-',
          title: intl.formatMessage({
            defaultMessage: 'Created By',
          }),
        },
        {
          dataIndex: 'reference',
          key: 'reference',
          render: (value: null | number) => (value ? `#${value}` : '-'),
          title: intl.formatMessage({
            defaultMessage: 'Reference',
          }),
        },
        {
          dataIndex: 'completedDate',
          ellipsis: true,
          key: 'completedDate',
          // eslint-disable-next-line no-confusing-arrow
          render: (value: Date, record) =>
            record.completed && value
              ? FormatCalendar(new Date(value), intl, true)
              : undefined,
          title: intl.formatMessage({
            defaultMessage: 'Completed Date',
          }),
        },
        {
          dataIndex: 'assignedUsers',
          ellipsis: true,
          key: 'assignedUsers',
          render: (value: { fullName: string; id: string }[]) => (
            <Row gutter={4}>
              {value.map((item) => (
                <Col key={item.id}>
                  <Tooltip title={item.fullName}>
                    <Avatar
                      size={30}
                      style={{
                        cursor: 'pointer',
                        fontSize: 14,
                      }}
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
          title: intl.formatMessage({
            defaultMessage: 'Assigned Users',
          }),
        },
        {
          dataIndex: 'completed',
          key: 'completed',
          // eslint-disable-next-line no-confusing-arrow
          render: (_, record) =>
            record.completed ? (
              <Tag color={'green'}>
                {intl.formatMessage({
                  defaultMessage: 'Completed',
                })}
              </Tag>
            ) : (
              <Tag color={'red'}>
                {intl.formatMessage({
                  defaultMessage: 'Uncompleted',
                })}
              </Tag>
            ),
          title: intl.formatMessage({
            defaultMessage: 'Status',
          }),
        },
        {
          dataIndex: 'completed',
          key: 'actions',
          render: (value: boolean, item) => (
            <Tooltip
              className="no-print"
              title={
                value
                  ? intl.formatMessage({
                      defaultMessage: 'View Activity',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Complete Activity',
                    })
              }
            >
              <Button
                danger={!value}
                disabled={saving}
                onClick={() => {
                  if (value) setViewTodoVisible(item.key);
                  if (!value) setCompleteTodoVisible(item.key);
                }}
                size="small"
                type={value ? 'text' : 'ghost'}
                // icon={<FontAwesomeIcon icon={faEye} />}
              >
                {value ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faFlagCheckered} />
                )}
              </Button>
            </Tooltip>
          ),
          width: 50,
        },
      ]}
      dataSource={
        todos?.map((todo) => ({
          assignedUsers: todo.assignedUsers,
          completed: todo.completed || false,
          completedDate: todo.completedDate,
          createdAt: todo.createdAt,
          createdBy: todo.createdBy,
          dueDate: todo.dueDate,
          key: todo.id,
          name: todo.name || '',
          reference: todo.reference,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      size="small"
    />
  );
};
export default ActivityTable;
