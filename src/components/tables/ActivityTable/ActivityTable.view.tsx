import React from 'react';
import { Avatar, Button, Col, Row, Table, Tag, Tooltip } from 'antd';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFlagCheckered } from '@fortawesome/pro-light-svg-icons';

interface Props {
  todos:
    | {
        id: string;
        name?: string | null | undefined;
        createdAt?: Date | null | undefined;
        completedDate?: Date | null | undefined;
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

  return (
    <Table
      size="small"
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      columns={[
        {
          key: 'name',
          title: intl.formatMessage({
            defaultMessage: 'Name',
          }),
          dataIndex: 'name',
          ellipsis: true,
        },

        {
          key: 'createdAt',
          dataIndex: 'createdAt',
          title: intl.formatMessage({
            defaultMessage: 'Start Date',
          }),
          render: (value: Date) => FormatCalendar(new Date(value), true),
        },
        {
          key: 'completedDate',
          dataIndex: 'completedDate',
          title: intl.formatMessage({
            defaultMessage: 'Completed Date',
          }),
          ellipsis: true,
          // eslint-disable-next-line no-confusing-arrow
          render: (value: Date, record) =>
            record.completed
              ? FormatCalendar(new Date(value), true)
              : undefined,
        },
        {
          key: 'assignedUsers',
          dataIndex: 'assignedUsers',
          title: intl.formatMessage({
            defaultMessage: 'Assigned Users',
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
          key: 'completed',
          dataIndex: 'completed',
          title: intl.formatMessage({
            defaultMessage: 'Status',
          }),
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
        },
        {
          key: 'actions',
          dataIndex: 'completed',
          width: 50,
          render: (value: boolean, item) => (
            <Tooltip
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
                size="small"
                type={value ? 'text' : 'ghost'}
                disabled={saving}
                danger={!value}
                onClick={() => {
                  if (value) setViewTodoVisible(item.key);
                  if (!value) setCompleteTodoVisible(item.key);
                }}
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
        },
      ]}
      dataSource={
        todos?.map((todo) => ({
          key: todo.id,
          name: todo.name || '',
          createdAt: todo.createdAt,
          completedDate: todo.completedDate,
          completed: todo.completed || false,
          assignedUsers: todo.assignedUsers,
        })) || []
      }
    />
  );
};
export default ActivityTable;
