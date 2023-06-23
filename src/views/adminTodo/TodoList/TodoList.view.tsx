import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Drawer,
  Empty,
  Input,
  Popconfirm,
  Radio,
  Row,
  Skeleton,
  Table,
} from 'antd';
import type { CreateTodoMutation, ListTodosQuery } from 'graphql/generated';
import moment from 'moment';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import getTodoUrl from 'utils/get-to-do-url';
import useStyles from './TodoList.styles';

const { Panel } = Collapse;
interface Props {
  data:
    | Exclude<ListTodosQuery['listTodos'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  onCompletedTodo: (id: string) => void;
  onUncompletedTodo: (id: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  toggleAllUsers: () => void;
  toggleAllSchemes: () => void;
}

const AdminTodos = ({
  data,
  loading,
  saving,
  onCompletedTodo,
  onUncompletedTodo,
  addTodo,
  toggleAddTodo,
  updateTodoList,
  setSearch,
  onPaginationChange,
  currentPage,
  currentPageSize,
  toggleAllUsers,
  toggleAllSchemes,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            // value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a task..."
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Radio.Group defaultValue="CURRENT" onChange={toggleAllSchemes}>
            <Radio.Button value="CURRENT">Current Scheme</Radio.Button>
            <Radio.Button value="ALL">All Schemes</Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Radio.Group defaultValue="YOUR" onChange={toggleAllUsers}>
            <Radio.Button value="YOUR">Your Tasks</Radio.Button>
            <Radio.Button value="ALL">All Tasks</Radio.Button>
          </Radio.Group>
        </Col>
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
            New Task
          </Button>
        </Col>
      </Row>
      <Card loading={loading}>
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
              assignedUsers: todo.assignedUsers.map(({ fullName }, index) =>
                index === 0 ? `${fullName}` : `, ${fullName}`
              ),
              todo,
            }))}
            // onRow={(record) =>
            //   record.type !== undefined && record.type !== null
            //     ? { onClick: () => getTodoUrl(record.type, record.key) }
            //     : {}
            // }
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
                title: 'Completed',
                dataIndex: 'actions',
                key: 'actions',
                width: 100,
                render: (_, record) => (
                  <Popconfirm
                    title="Complete this task?"
                    // description="Do you complete this task?"
                    onConfirm={() => onCompletedTodo(record.key)}
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
                render: (value, record) => (
                  <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
                ),
              },
              {
                key: 'description',
                dataIndex: 'description',
                title: 'Description',
                ellipsis: true,
              },

              {
                key: 'dueDate',
                dataIndex: 'dueDate',
                title: 'Due Date',
                render: (value) => moment(value).calendar('dd/mm/yyyy'),
              },
              {
                key: 'assignedUsers',
                dataIndex: 'assignedUsers',
                title: 'Assigned Users',
                ellipsis: true,
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
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Nothing to complete"
            />
          </div>
        )}
      </Card>

      <Collapse className={classes.title}>
        <Panel header="Completed Tasks" key="1">
          <Card loading={loading}>
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
                  type: todo.type,
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
                    title: 'Completed',
                    dataIndex: 'actions',
                    key: 'actions',
                    width: 100,
                    render: (_, record) => (
                      <Popconfirm
                        title="Mark this task uncompleted?"
                        // description="Do you complete this task?"
                        onConfirm={() => onUncompletedTodo(record.key)}
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
                    ellipsis: true,
                  },

                  {
                    key: 'completedDate',
                    dataIndex: 'completedDate',
                    title: 'Completed Date',
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
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Nothing has been completed"
                />
              </div>
            )}
          </Card>
        </Panel>
      </Collapse>

      <Drawer
        title="New Task"
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
