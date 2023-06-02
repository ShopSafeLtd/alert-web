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
import { Link } from 'react-router-dom';
import type { TodoData } from '../../../utils/get-to-do-url';
import getTodoUrl from '../../../utils/get-to-do-url';
import useStyles from './AdminTodos.styles';

const { Title, Text } = Typography;
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
  onUncompletedTodo,
  addTodo,
  toggleAddTodo,
  updateTodoList,
  setSearch,
  onPaginationChange,
  currentPage,
  currentPageSize,
}: Props): JSX.Element => {
  const classes = useStyles();
  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
      {record.description}
    </Text>
  );

  return (
    <Card
      bodyStyle={{
        padding: 10,
        overflow: 'auto',
        height: 'calc(100vh - 300px)',
        width: '100%',
      }}
    >
      <Row align="middle" gutter={8} wrap={false} style={{ marginBottom: 10 }}>
        <Col>
          <Title className={classes.title} level={4}>
            To-Do
          </Title>
        </Col>
        <Col flex={1}>
          <Input
            placeholder="Search for a task..."
            // value={inputValue}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button
            type="text"
            // size="small"
            style={{ marginRight: -7 }}
            danger
            disabled={saving}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
            onClick={toggleAddTodo}
          >
            New Task
          </Button>
        </Col>
      </Row>

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
              ellipsis: true,
              render: (value, record) => (
                <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
              ),
            },
            {
              key: 'dueDate',
              dataIndex: 'dueDate',
              title: 'Due Date',
              width: 120,
              render: (value) => moment(value).calendar('dd/mm/yyyy'),
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
            description="Nothing to complete"
          />
        </div>
      )}

      <Collapse className={classes.title}>
        <Panel header="Completed Tasks" key="1">
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
                  title: '',
                  dataIndex: 'actions',
                  key: 'actions',
                  width: 40,
                  render: (_, record) => (
                    <Popconfirm
                      title="Uncompleted this task?"
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
                  ellipsis: true,
                },
                // {
                //   key: 'completedBy',
                //   dataIndex: 'completedBy',
                //   title: 'CompletedBy',
                // },
                {
                  key: 'completedDate',
                  dataIndex: 'completedDate',
                  title: 'Completed Date',
                  width: 120,
                  render: (value) => moment(value).calendar('dd/mm/yyyy'),
                },
              ]}
              // expandable={{
              //   expandedRowRender,
              //   rowExpandable: (record) => !!record.description,
              // }}
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
    </Card>
  );
};

export default AdminTodos;
