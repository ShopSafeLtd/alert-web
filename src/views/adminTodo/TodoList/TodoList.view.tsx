/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { SchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { TableProps } from 'antd';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type { ListTodosQuery } from 'graphql/todos/queries/list_todos.generated';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import EditTodo from '#/components/form-components/Todos/EditTodo';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Skeleton,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import AddTodo from 'components/form-components/Todos/AddTodo';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';
import FormatCalendar from 'utils/format-calendar-24h';
import getTodoUrl from 'utils/get-to-do-url';

import type { ListData } from '../useActivities';

import ViewTodo from '../../../components/form-components/Todos/ViewTodo/Todo.container';
// const { Panel } = Collapse;

type TemplateData = ListData;
type ActivityData = Exclude<
  ListTodosQuery['listTodos'],
  null | undefined
>['todos'][0];
export interface TableItem {
  assignedUsers: { fullName: string; id: string }[];
  completed: boolean;
  completedDate?: Date | null | undefined;
  createdAt?: Date | null | undefined;
  description?: null | string;
  dueDate?: Date | null;
  groups: { id: string; name: string }[];
  key: string;
  linkedItem?: JSX.Element;
  name?: null | string;
  todo: ActivityData;
}

interface Props {
  addTodo: boolean;
  currentPage: number;
  currentPageSize: number;
  data:
    | Exclude<ListTodosQuery['listTodos'], null | undefined>
    | null
    | undefined;
  deleteRights: boolean;
  editRights: boolean;
  editTodo: null | string;
  groupsData: SchemeGroupsSelectQuery | undefined;
  groupsFilter: string[];
  loading: boolean;
  onCompletedTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onTableChange: TableProps<TableItem>['onChange'];
  onUncompletedTodo: (id: string) => void;
  saving: boolean;
  selectTemplate: (id: null | string) => void;
  selectedTemplate: TemplateData | null;
  selectedTodo: null | string;
  setEditTodo: (id: null | string) => void;
  setGroupsFilter: (groups: string[]) => void;
  setSearch: (value: string) => void;
  setSelectedTodo: (id: null | string) => void;
  templateData: ListData[];
  toggleAddTodo: () => void;
  toggleAllSchemes: () => void;
  toggleAllUsers: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
}

const getLinkedItemId = (todo: ListTodosQuery['listTodos']['todos'][0]) => {
  if (todo.incident)
    return (
      <FormattedMessage
        defaultMessage="Incident: {var1}"
        values={{ var1: todo.incident.reference }}
      />
    );
  if (todo.offender)
    return (
      <FormattedMessage
        defaultMessage="Offender: {var1}"
        values={{ var1: todo.offender.reference }}
      />
    );
  if (todo.crimeGroup)
    return (
      <FormattedMessage
        defaultMessage="Crime Group: {var1}"
        values={{ var1: todo.crimeGroup.reference }}
      />
    );
  if (todo.vehicle)
    return (
      <FormattedMessage
        defaultMessage="Vehicle: {var1}"
        values={{ var1: todo.vehicle.reference }}
      />
    );
  if (todo.investigation)
    return (
      <FormattedMessage
        defaultMessage="Investigation: {var1}"
        values={{ var1: todo.investigation.reference }}
      />
    );
  return undefined;
};

const getLinkedItemTo = (todo?: ListTodosQuery['listTodos']['todos'][0]) => {
  if (!todo) return '#';
  if (todo.incidentId) return `/app/incidents/view/${todo.incidentId}`;
  if (todo.offenderId) return `/app/offenders/view/${todo.offenderId}`;
  if (todo.crimeGroupId) return `/app/crime-groups/view/${todo.crimeGroupId}`;
  if (todo.vehicleId) return `/app/vehicles/view/${todo.vehicleId}`;
  if (todo.investigationId)
    return `/app/investigations/view/${todo.investigationId}`;
  return '#';
};

const AdminTodos = ({
  addTodo,
  currentPage,
  currentPageSize,
  data,
  deleteRights,
  editRights,
  editTodo,
  groupsData,
  groupsFilter,
  loading,
  onCompletedTodo,
  onDeleteTodo,
  onPaginationChange,
  onTableChange,
  onUncompletedTodo,
  saving,
  selectTemplate,
  selectedTemplate,
  selectedTodo,
  setEditTodo,
  setGroupsFilter,
  setSearch,
  setSelectedTodo,
  templateData,
  toggleAddTodo,
  toggleAllSchemes,
  toggleAllUsers,
  updateTodoList,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();
  const shouldOpen = useStoreState((state) => state.scheme.taskTimeTracking);
  // const typesFilter = [
  //   {
  //     text: intl.formatMessage({
  //       defaultMessage: 'Incident',
  //     }),
  //     value: 'incident',
  //   },
  //   {
  //     text: intl.formatMessage({
  //       defaultMessage: 'Offender',
  //     }),
  //     value: 'offender',
  //   },
  //   {
  //     text: intl.formatMessage({
  //       defaultMessage: 'Investigation',
  //     }),
  //     value: 'investigation',
  //   },
  //   {
  //     text: intl.formatMessage({
  //       defaultMessage: 'Vehicle',
  //     }),
  //     value: 'vehicle',
  //   },
  //   {
  //     text: intl.formatMessage({
  //       defaultMessage: 'Crime Group',
  //     }),
  //     value: 'crime group',
  //   },
  //   {
  //     text: intl.formatMessage({
  //       defaultMessage: 'Chat',
  //     }),
  //     value: 'chat',
  //   },
  // ];
  const statusFilter = [
    {
      text: intl.formatMessage({
        defaultMessage: 'Uncompleted',
      }),
      value: false,
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'Completed',
      }),
      value: true,
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
        <Col span={6}>
          <Input
            allowClear
            // value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a task...',
            })}
          />
        </Col>
        <Col span={5}>
          <GroupsSelect
            allowClear
            maxTagCount="responsive"
            mode="multiple"
            onChange={setGroupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            style={{ width: '100%' }}
            value={groupsFilter}
          />
        </Col>
        <Col flex={1} />

        {templateData.length > 0 && (
          <Col span={5}>
            <Select
              onSelect={(value) => selectTemplate(value)}
              options={templateData.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              placeholder={intl.formatMessage({
                defaultMessage: 'Create Activity from Template',
              })}
              style={{ width: '100%' }}
              value={null}
            />
          </Col>
        )}
        <Col>
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddTodo}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'New Activity',
            })}
          </Button>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginBottom: 15 }}>
        <Col>
          <Radio.Group defaultValue="CURRENT" onChange={toggleAllSchemes}>
            <Radio.Button value="CURRENT">
              {intl.formatMessage({
                defaultMessage: 'Current Scheme',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Schemes',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Radio.Group defaultValue="YOUR" onChange={toggleAllUsers}>
            <Radio.Button value="YOUR">
              {intl.formatMessage({
                defaultMessage: 'Your Activities',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Activities',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Card bodyStyle={{ padding: loading ? 20 : 0 }} loading={loading}>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))
        ) : (
          <Table<TableItem>
            columns={[
              {
                dataIndex: 'name',
                key: 'name',
                render: (value, record: { todo: ActivityData }) => (
                  <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Name',
                }),
              },
              {
                dataIndex: 'description',
                ellipsis: true,
                key: 'description',
                title: intl.formatMessage({
                  defaultMessage: 'Description',
                }),
              },
              {
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (value: Date) => FormatCalendar(new Date(value), true),
                title: intl.formatMessage({
                  defaultMessage: 'Start Date',
                }),
              },
              {
                dataIndex: 'completedDate',
                ellipsis: true,
                key: 'completedDate',
                // eslint-disable-next-line no-confusing-arrow
                render: (value: Date) =>
                  value ? FormatCalendar(new Date(value), true) : undefined,
                title: intl.formatMessage({
                  defaultMessage: 'Completed Date',
                }),
              },
              {
                dataIndex: 'dueDate',
                key: 'dueDate',
                render: (value: Date) => FormatCalendar(value),
                title: intl.formatMessage({
                  defaultMessage: 'Due Date',
                }),
                // sorter: (a, b) =>
                //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //   // @ts-ignore
                //   new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf(),
              },
              {
                dataIndex: 'assignedUsers',
                ellipsis: true,
                filters: userFilter,
                key: 'assignedUsers',
                onFilter: (
                  value: boolean | number | string,
                  record: { assignedUsers: { id: string }[] }
                ) => record.assignedUsers.some((el) => el.id === value),
                render: (value: { fullName: string; id: string }[]) => (
                  <Row gutter={4}>
                    {value.map((item) => (
                      <Col key={item.id}>
                        <Tooltip title={item.fullName}>
                          <Avatar
                            size={30}
                            style={{ cursor: 'pointer', fontSize: 14 }}
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
                dataIndex: 'groups',
                filteredValue: groupsFilter,
                filters:
                  groupsData?.groups.map(({ id, name }) => ({
                    text: name,
                    value: id,
                  })) ?? [],
                key: 'groups',
                render: (value: { id: string; name: string }[]) => (
                  <Typography.Text>
                    {value
                      // eslint-disable-next-line no-confusing-arrow
                      .map(({ name }, index) =>
                        index === 0 ? name : ` ${name}`
                      )
                      .toString()}
                  </Typography.Text>
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Groups',
                }),
              },
              {
                dataIndex: 'linkedItem',
                key: 'linkedItem',
                //   record.linkedItem?.includes(value),
                render: (value, record: { key: string }) => (
                  <Link
                    to={getLinkedItemTo(
                      data?.todos.find(({ id }) => id === record.key)
                    )}
                  >
                    {value}
                  </Link>
                ),
                // filters: typesFilter,
                // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // // @ts-ignore
                // onFilter: (value: string, record) =>
                title: intl.formatMessage({
                  defaultMessage: 'Linked Item',
                }),
              },
              {
                dataIndex: 'actions',
                filters: statusFilter,
                key: 'actions',
                onFilter: (
                  value: boolean | number | string,
                  record: { completed: boolean }
                ) => record.completed === value,
                // eslint-disable-next-line no-confusing-arrow
                render: (_, record: { completed: boolean; key: string }) =>
                  record.completed ? (
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      // description="Do you complete this activity?"
                      onConfirm={() => onUncompletedTodo(record.key)}
                      overlayInnerStyle={{ padding: 10 }}
                      title={intl.formatMessage({
                        defaultMessage: 'Uncompleted this activity?',
                      })}
                    >
                      <Button size="small" style={{ padding: 2, width: 110 }}>
                        {intl.formatMessage({
                          defaultMessage: 'Completed',
                        })}
                      </Button>
                    </Popconfirm>
                  ) : (
                    <Button
                      danger
                      onClick={() => {
                        if (shouldOpen) {
                          setSelectedTodo(record.key);
                        } else {
                          onCompletedTodo(record.key);
                        }
                      }}
                      size="small"
                      style={{ padding: 2, width: 110 }}
                      type="ghost"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Uncompleted',
                      })}
                    </Button>
                  ),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                title: intl.formatMessage({
                  defaultMessage: 'Status',
                }),
                width: 130,
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
              {
                dataIndex: 'Options',
                key: 'Options',
                render: (_, record: { key: string }) => (
                  <Row gutter={8}>
                    {editRights && (
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Edit Activity',
                          })}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => {
                              setEditTodo(record?.key);
                            }}
                            size="small"
                          />
                        </Tooltip>
                      </Col>
                    )}
                    {deleteRights && (
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove Activity',
                          })}
                        >
                          <Popconfirm
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            onConfirm={() => {
                              onDeleteTodo(record.key);
                            }}
                            overlayInnerStyle={{ padding: 10 }}
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the Activity?',
                            })}
                          >
                            <Button
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                              size="small"
                            />
                          </Popconfirm>
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
                ),
                title: '',
                width: 100,
              },
            ].filter(
              (item) =>
                item?.dataIndex !== 'Options' || deleteRights || editRights
            )}
            // onRow={(record) =>
            //   record.type !== undefined && record.type !== null
            //     ? { onClick: () => getTodoUrl(record.type, record.key) }
            //     : {}
            dataSource={data?.todos?.map((todo) => ({
              assignedUsers: todo.assignedUsers,
              completed: todo.completed || false,
              completedDate: todo.completedDate,
              createdAt: todo.createdAt,
              description: todo?.description,
              dueDate: todo.dueDate,
              groups: todo.groups || [],
              key: todo.id,
              linkedItem: getLinkedItemId(todo),
              name: todo.name,
              todo,
            }))}
            // }
            loading={loading}
            onChange={onTableChange}
            pagination={{
              current: currentPage,
              hideOnSinglePage: true,
              onChange: onPaginationChange,
              pageSize: currentPageSize,
              position: ['bottomCenter'],
              showSizeChanger: false,
              total: data?.uncompletedTotal,
            }}
            size="small"
          />
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
        onClose={toggleAddTodo}
        open={addTodo}
        title={intl.formatMessage({
          defaultMessage: 'Create Activity',
        })}
        width={800}
      >
        {addTodo ? (
          <AddTodo
            initData={selectedTemplate ?? undefined}
            onClose={toggleAddTodo}
            update={updateTodoList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditTodo(null)}
        open={!!editTodo}
        title={intl.formatMessage({
          defaultMessage: 'Edit Activity',
        })}
        width={800}
      >
        {editTodo ? (
          <EditTodo
            initData={selectedTemplate ?? undefined}
            onClose={() => setEditTodo(null)}
            todoId={editTodo}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setSelectedTodo(null)}
        open={!!selectedTodo}
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        width={800}
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
