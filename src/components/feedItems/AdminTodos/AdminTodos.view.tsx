/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Empty,
  Input,
  Popconfirm,
  Row,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import type { CreateTodoMutation, FeedTodosQuery } from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import type { TodoData } from '../../../utils/get-to-do-url';
import getTodoUrl from '../../../utils/get-to-do-url';
import useStyles from './AdminTodos.styles';

const { Title, Text } = Typography;

interface Props {
  data:
    | Exclude<FeedTodosQuery['listTodos'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  onCompletedTodo: (id: string) => void;
  // onUncompletedTodo: (id: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
}

interface TableItem {
  key: string;
  name: string | null | undefined;
  description: string | null | undefined;
  completedDate?: Date | null | undefined;
  completedBy?: string | undefined;
  completed?: boolean | null | undefined;
  todo: TodoData;
}

const AdminTodos = ({
  data,
  loading,
  saving,
  onCompletedTodo,
  // onUncompletedTodo,
  addTodo,
  toggleAddTodo,
  updateTodoList,
  setSearch,
  onPaginationChange,
  currentPage,
  currentPageSize,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
      {intl.formatMessage(
        { defaultMessage: 'Description: {description}', id: 'US7L2J' },
        {
          description: record.description,
        }
      )}
    </Text>
  );

  return (
    <Card
      bodyStyle={{
        padding: 10,
        overflow: 'auto',
        height: 'calc(100vh - 300px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Row align="middle" gutter={5} wrap={false} style={{ marginBottom: 10 }}>
        <Col span={4}>
          <Title className={classes.title} level={4}>
            {intl.formatMessage({ defaultMessage: 'Activities', id: 'UmEsZF' })}
          </Title>
        </Col>
        <Col flex={1} style={{ marginRight: -10 }}>
          <Input
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a activity...',
              id: '8KsNIu',
            })}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button
            type="text"
            style={{ marginRight: -5 }}
            danger
            disabled={saving}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
            onClick={toggleAddTodo}
          >
            {intl.formatMessage({
              defaultMessage: 'New Activity',
              id: '6kyt/v',
            })}
          </Button>
        </Col>
      </Row>

      {loading ? (
        // eslint-disable-next-line react/no-array-index-key
        Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)
      ) : data?.uncompletedTotal ? (
        <Table
          dataSource={data?.uncompletedTodos?.map((todo) => ({
            key: todo.id,
            name: todo.name,
            description: todo?.description,
            dueDate: todo.dueDate,
            completed: todo.completed,
            todo,
          }))}
          loading={loading}
          size="small"
          pagination={{
            hideOnSinglePage: true,
            total: data?.uncompletedTotal,
            onChange: onPaginationChange,
            pageSize: currentPageSize,
            current: currentPage,
            showSizeChanger: false,
            position: ['bottomCenter'],
          }}
          columns={[
            {
              dataIndex: 'actions',
              key: 'actions',
              width: 40,
              render: (_, record) => (
                <Popconfirm
                  title={intl.formatMessage({
                    defaultMessage: 'Complete this activity?',
                    id: 'UCqqOk',
                  })}
                  onConfirm={() => onCompletedTodo(record.key)}
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
                  <Checkbox checked={!!record.completed} />
                </Popconfirm>
              ),
            },
            {
              key: 'name',
              dataIndex: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              }),
              ellipsis: true,
              render: (value, record) => (
                <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
              ),
            },
            {
              key: 'dueDate',
              dataIndex: 'dueDate',
              title: intl.formatMessage({
                defaultMessage: 'Due Date',
                id: '8XUukm',
              }),
              width: 120,
              render: (value) => FormatCalendar(value),
            },
          ]}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => !!record.description,
          }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={intl.formatMessage({
              defaultMessage: 'You have no open activities',
              id: '/grXWE',
            })}
          />
        </div>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'New Activity',
          id: '6kyt/v',
        })}
        open={addTodo}
        width="400"
        onClose={toggleAddTodo}
      >
        {addTodo ? (
          <AddTodo update={updateTodoList} onClose={toggleAddTodo} />
        ) : (
          <div />
        )}
      </Drawer>
    </Card>
  );
};

export default AdminTodos;
