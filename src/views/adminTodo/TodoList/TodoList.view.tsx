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

import type { CreateTodoMutation, ListTodosQuery } from 'graphql/generated';
import moment from 'moment';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import useStyles from './TodoList.styles';

const { Title } = Typography;

interface Props {
  data:
    | Exclude<ListTodosQuery['listTodos'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  onCompleteTodo: (id: string) => void;
  onUnCompleteTodo: (id: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
}

const AdminTodos = ({
  data,
  loading,
  saving,
  onCompleteTodo,
  onUnCompleteTodo,
  addTodo,
  toggleAddTodo,
  updateTodoList,
  setSearch,
  onPaginationChange,
  currentPage,
  currentPageSize,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            // value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="search for a to-do task..."
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type="primary"
            onClick={toggleAddTodo}
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            Todo
          </Button>
        </Col>
      </Row>
      <Card loading={loading}>
        <Title className={classes.title} level={4}>
          Admin To do
        </Title>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))
        ) : data?.uncompletedTotal ? (
          <Table
            dataSource={data?.uncompletedTodos?.map((todo) => ({
              key: todo.id,
              name: todo.name,
              description: todo?.description,
              dueDate: todo.dueDate,
              completed: todo.completed,
              createdBy: todo.createdBy?.fullName,
            }))}
            loading={loading}
            size="small"
            pagination={
              data?.uncompletedTotal > 20
                ? {
                    total: data?.uncompletedTotal,
                    onChange: onPaginationChange,
                    pageSize: currentPageSize,
                    current: currentPage,
                    showSizeChanger: false,
                    position: ['bottomCenter'],
                  }
                : false
            }
            columns={[
              {
                title: 'Completed',
                dataIndex: 'actions',
                key: 'actions',
                width: 30,
                render: (_, record) => (
                  <Popconfirm
                    title="Complete this task?"
                    // description="Do you complete this task?"
                    onConfirm={() => onCompleteTodo(record.key)}
                    okText="Yes"
                    cancelText="No"
                    overlayInnerStyle={{ padding: 10 }}
                  >
                    <Checkbox checked={!!record.completed} />
                  </Popconfirm>
                ),
              },
              {
                key: 'name',
                dataIndex: 'name',
                title: 'Name',
              },
              {
                key: 'description',
                dataIndex: 'description',
                title: 'Description',
              },

              {
                key: 'dueDate',
                dataIndex: 'dueDate',
                title: 'DueDate',
                render: (value) => moment(value).calendar('dd/mm/yyyy'),
              },
              {
                key: 'createdBy',
                dataIndex: 'createdBy',
                title: 'CreatedBy',
              },
            ]}
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
            <Empty description="Nothing to complete" />
          </div>
        )}
      </Card>
      <Card loading={loading}>
        <Title className={classes.title} level={4}>
          Completed Tasks
        </Title>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))
        ) : data?.completedTotal ? (
          <Table
            dataSource={data?.completedTodos?.map((todo) => ({
              key: todo.id,
              name: todo.name,
              description: todo?.description,
              completedDate: todo.completedDate,
              completedBy: todo.completedBy?.fullName,
              completed: !!todo.completed,
            }))}
            loading={loading}
            size="small"
            pagination={
              data?.uncompletedTotal > 20
                ? {
                    total: data?.uncompletedTotal,
                    onChange: onPaginationChange,
                    pageSize: currentPageSize,
                    current: currentPage,
                    showSizeChanger: false,
                    position: ['bottomCenter'],
                  }
                : false
            }
            columns={[
              {
                title: 'Completed',
                dataIndex: 'actions',
                key: 'actions',
                width: 30,
                render: (_, record) => (
                  <Popconfirm
                    title="Uncompleted this task?"
                    // description="Do you complete this task?"
                    onConfirm={() => onUnCompleteTodo(record.key)}
                    okText="Yes"
                    cancelText="No"
                    overlayInnerStyle={{ padding: 10 }}
                  >
                    <Checkbox checked={record.completed} />
                  </Popconfirm>
                ),
              },
              {
                key: 'name',
                dataIndex: 'name',
                title: 'Name',
              },
              {
                key: 'description',
                dataIndex: 'description',
                title: 'Description',
              },

              {
                key: 'completedDate',
                dataIndex: 'completedDate',
                title: 'CompletedDate',
                render: (value) => moment(value).calendar('dd/mm/yyyy'),
              },
              {
                key: 'completedBy',
                dataIndex: 'completedBy',
                title: 'CompletedBy',
              },
            ]}
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
            <Empty description="Nothing has been completed" />
          </div>
        )}
      </Card>

      <Drawer
        title="Add New Todo"
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
    </div>
  );
};

export default AdminTodos;
