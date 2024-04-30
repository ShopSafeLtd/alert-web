/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import {
  Avatar,
  Button,
  Card,
  // Checkbox,
  Col,
  // Collapse,
  Drawer,
  Empty,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from 'antd';
import type { CreateTodoMutation, ListTodosQuery } from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import { useStoreState } from 'state';
import { Link } from 'react-router-dom';
import getTodoUrl from 'utils/get-to-do-url';
// import useStyles from './TodoList.styles';
import ViewTodo from '../../../components/form-components/Todos/ViewTodo/Todo.container';
import type { ListData } from '../useActivities';

// const { Panel } = Collapse;

type TemplateData = ListData;

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
  selectedTodo: string | null;
  setSelectedTodo: (id: string | null) => void;
  templateData: ListData[];
  selectedTemplate: TemplateData | null;
  selectTemplate: (id: string | null) => void;
}

const getLinkedItemId = (todo: ListTodosQuery['listTodos']['todos'][0]) => {
  if (todo.incident) return todo.incident.reference;
  if (todo.offender) return todo.offender.reference;
  if (todo.crimeGroup) return todo.crimeGroup.reference;
  if (todo.vehicle) return todo.vehicle.reference;
  if (todo.investigation) return todo.investigation.reference;
  return undefined;
};

const getLinkedItemTo = (todo?: ListTodosQuery['listTodos']['todos'][0]) => {
  if (todo.incidentId) return `/app/incidents/view/${todo.incidentId}`;
  if (todo.offenderId) return `/app/offenders/view/${todo.offenderId}`;
  if (todo.crimeGroupId) return `/app/crime-groups/view/${todo.crimeGroupId}`;
  if (todo.vehicleId) return `/app/vehicles/view/${todo.vehicleId}`;
  if (todo.investigationId)
    return `/app/investigations/view/${todo.investigationId}`;
  return '#';
};

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
  selectedTodo,
  setSelectedTodo,
  templateData,
  selectTemplate,
  selectedTemplate,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();
  const shouldOpen = useStoreState((state) => state.scheme.taskTimeTracking);
  const typesFilter = [
    {
      text: intl.formatMessage({
        defaultMessage: 'Incident',
        id: 'zaYxwd',
      }),
      value: 'incident',
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'Offender',
        id: 'AN7Aru',
      }),
      value: 'offender',
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'Investigation',
        id: 'tNseQe',
      }),
      value: 'investigation',
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'Vehicle',
        id: '4T7son',
      }),
      value: 'vehicle',
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'Crime Group',
        id: 'FY/YfT',
      }),
      value: 'crime group',
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'Chat',
        id: 'WTrOy3',
      }),
      value: 'chat',
    },
  ];

  const userIds = new Set(
    data?.todos.flatMap((todo) => todo.assignedUsers.map(({ id }) => id))
  );
  const userData = data?.todos.flatMap(({ assignedUsers }) => assignedUsers);
  const userFilter = [...userIds]
    .map((id) => userData?.find((el) => el.id === id))
    .map((el) => ({ text: el?.fullName || '', value: el?.id || '' }));

  const completeTodo = (value: boolean, id?: string) => {
    if (value && id) {
      onCompletedTodo(id);
    }
  };

  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 15 }}>
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

        {templateData.length > 0 && (
          <Col span={5}>
            <Select
              style={{ width: '100%' }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Create Activity from Template',
                id: '1RRG2d',
              })}
              onSelect={(value) => selectTemplate(value)}
              value={null}
              options={templateData.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Col>
        )}
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
              defaultMessage: 'New Activity',
              id: '6kyt/v',
            })}
          </Button>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginBottom: 15 }}>
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
                defaultMessage: 'Your Activities',
                id: '401sYO',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Activities',
                id: 'CC/yEt',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Card loading={loading}>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))
        ) : data?.total ? (
          <Table
            dataSource={data?.todos?.map((todo) => ({
              key: todo.id,
              name: todo.name,
              description: todo?.description,
              dueDate: todo.dueDate,
              completed: todo.completed,
              assignedUsers: todo.assignedUsers,
              todo,
              linkedItem: getLinkedItemId(todo),
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
                key: 'name',
                dataIndex: 'name',
                title: intl.formatMessage({
                  defaultMessage: 'Name',
                  id: 'HAlOn1',
                }),
                render: (value, record) => (
                  <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
                ),
                filters: typesFilter,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onFilter: (value: string, record) =>
                  record.name?.includes(value),
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
                render: (value: Date) => FormatCalendar(value),
                sorter: (a, b) =>
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf(),
              },
              {
                key: 'assignedUsers',
                dataIndex: 'assignedUsers',
                title: intl.formatMessage({
                  defaultMessage: 'Assigned Users',
                  id: '8oku8d',
                }),
                ellipsis: true,
                filters: userFilter,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onFilter: (value: string, record) =>
                  record.assignedUsers.some((el) => el.id === value),
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
              {
                key: 'linkedItem',
                dataIndex: 'linkedItem',
                title: intl.formatMessage({
                  defaultMessage: 'Linked Item',
                  id: 'NkD6oV',
                }),
                render: (value, todo) => (
                  <Link
                    to={getLinkedItemTo(
                      data?.todos.find(({ id }) => id === todo.key)
                    )}
                  >
                    {value}
                  </Link>
                ),
              },
              {
                title: intl.formatMessage({
                  defaultMessage: 'Status',
                  id: 'tzMNF3',
                }),
                dataIndex: 'actions',
                key: 'actions',
                width: 130,
                filters: [
                  {
                    text: intl.formatMessage({
                      defaultMessage: 'Uncompleted',
                      id: 'vtoZdb',
                    }),
                    value: false,
                  },
                  {
                    text: intl.formatMessage({
                      defaultMessage: 'Completed',
                      id: '95stPq',
                    }),
                    value: true,
                  },
                ],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onFilter: (value: boolean, record) =>
                  record.completed === value,
                render: (_, record) =>
                  record.completed ? (
                    <Popconfirm
                      title={intl.formatMessage({
                        defaultMessage: 'Uncompleted this activity?',
                        id: 'AN8gwr',
                      })}
                      // description="Do you complete this activity?"
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
                      <Button size="small" style={{ width: 110, padding: 2 }}>
                        {intl.formatMessage({
                          defaultMessage: 'Completed',
                          id: '95stPq',
                        })}
                      </Button>
                    </Popconfirm>
                  ) : (
                    <Button
                      size="small"
                      type="ghost"
                      danger
                      style={{ width: 110, padding: 2 }}
                      onClick={() => {
                        if (shouldOpen) {
                          setSelectedTodo(record.todo.id);
                        } else {
                          onCompletedTodo(record.todo.id);
                        }
                      }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Uncompleted',
                        id: 'vtoZdb',
                      })}
                    </Button>
                  ),
                // <Popconfirm
                //   title={intl.formatMessage({
                //     defaultMessage: 'Complete this activity?',
                //     id: 'i2Qvui',
                //   })}
                //   // description="Do you complete this activity?"
                //   onConfirm={() => onCompletedTodo(record.key)}
                //   okText={intl.formatMessage({
                //     defaultMessage: 'Yes',
                //     id: 'a5msuh',
                //   })}
                //   cancelText={intl.formatMessage({
                //     defaultMessage: 'No',
                //     id: 'oUWADl',
                //   })}
                //   overlayInnerStyle={{ padding: 10 }}
                // >
                //   <Checkbox checked={!!record.completed} />
                // </Popconfirm>
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
                defaultMessage: 'No Activities',
                id: 'wndZeG',
              })}
            />
          </div>
        )}
      </Card>

      {/* <Collapse className={classes.title}>
        <Panel
          header={intl.formatMessage({
            defaultMessage: 'Completed Activities',
            id: 'igF7K8',
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
                          defaultMessage: 'Uncomplete this activity?',
                          id: 'R2orBo',
                        })}
                        // description="Do you complete this activity?"
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
                    render: (value) => FormatCalendar(value),
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
      </Collapse> */}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Create Activity',
          id: '8RIxKm',
        })}
        open={addTodo}
        width={800}
        onClose={toggleAddTodo}
      >
        {addTodo ? (
          <AddTodo
            update={updateTodoList}
            onClose={toggleAddTodo}
            initData={selectedTemplate ?? undefined}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
          id: '8fwjt4',
        })}
        open={!!selectedTodo}
        width={800}
        onClose={() => setSelectedTodo(null)}
      >
        {selectedTodo ? (
          <ViewTodo
            id={selectedTodo}
            onClose={() => setSelectedTodo(null)}
            updateTodo={completeTodo}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default AdminTodos;
