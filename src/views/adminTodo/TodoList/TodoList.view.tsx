/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import {
  Avatar,
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
  Tooltip,
} from 'antd';
import type { CreateTodoMutation, ListTodosQuery } from 'graphql/generated';
import moment from 'moment';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import getTodoUrl from 'utils/get-to-do-url';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            // value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              id: 'jXZqfz',
              defaultMessage: 'Search for a task...',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Radio.Group defaultValue="CURRENT" onChange={toggleAllSchemes}>
            <Radio.Button value="CURRENT">
              {intl.formatMessage({
                id: 'qWFImB',
                defaultMessage: 'Current Scheme',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Schemes',
                id: '4zN3gE',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Radio.Group defaultValue="YOUR" onChange={toggleAllUsers}>
            <Radio.Button value="YOUR">
              {intl.formatMessage({
                defaultMessage: 'Your Tasks',
                id: 'nhiP3+',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Tasks',
                id: 'rY3Ca3',
              })}
            </Radio.Button>
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
            {intl.formatMessage({
              defaultMessage: 'New Task',
              id: 'jtxQPo',
            })}
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
              assignedUsers: todo.assignedUsers,
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
                title: intl.formatMessage({
                  defaultMessage: 'Completed',
                  id: '95stPq',
                }),
                dataIndex: 'actions',
                key: 'actions',
                width: 100,
                render: (_, record) => (
                  <Popconfirm
                    title={intl.formatMessage({
                      defaultMessage: 'Complete this task?',
                      id: 'i2Qvui',
                    })}
                    // description="Do you complete this task?"
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
                render: (value, record) => (
                  <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
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
                render: (value) => moment(value).calendar('dd/mm/yyyy'),
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
                            style={{ cursor: 'pointer', fontSize: 14 }}
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
              description={intl.formatMessage({
                defaultMessage: 'Nothing to do',
                id: 'TtyC9C',
              })}
            />
          </div>
        )}
      </Card>

      <Collapse className={classes.title}>
        <Panel
          header={intl.formatMessage({
            defaultMessage: 'Completed Tasks',
            id: 'fwW6PN',
          })}
          key="1"
        >
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
                    title: intl.formatMessage({
                      defaultMessage: 'Uncompleted',
                      id: 'vtoZdb',
                    }),

                    dataIndex: 'actions',
                    key: 'actions',
                    width: 100,
                    render: (_, record) => (
                      <Popconfirm
                        title={intl.formatMessage({
                          defaultMessage: 'Uncomplete this task?',
                          id: 'bTPleg',
                        })}
                        // description="Do you complete this task?"
                        onConfirm={() => onUncompletedTodo(record.key)}
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
                        <Checkbox checked={record.completed} />
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
                    key: 'completedDate',
                    dataIndex: 'completedDate',
                    title: intl.formatMessage({
                      defaultMessage: 'Completed Date',
                      id: 'DFG3iK',
                    }),
                    render: (value) => moment(value).calendar('dd/mm/yyyy'),
                  },
                  {
                    key: 'completedBy',
                    dataIndex: 'completedBy',
                    title: intl.formatMessage({
                      defaultMessage: 'Completed By',
                      id: 'pgRdna',
                    }),
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
                  description={intl.formatMessage({
                    defaultMessage: 'Nothing to do',
                    id: 'TtyC9C',
                  })}
                />
              </div>
            )}
          </Card>
        </Panel>
      </Collapse>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Todo',
          id: 'Cgnk3e',
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
    </div>
  );
};

export default AdminTodos;
