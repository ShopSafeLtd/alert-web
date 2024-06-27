/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import type { TableProps } from 'antd';
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

import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from 'components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import { useStoreState } from 'state';
import { Link } from 'react-router-dom';
import getTodoUrl from 'utils/get-to-do-url';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import ViewTodo from '../../../components/form-components/Todos/ViewTodo/Todo.container';
import type { ListData } from '../useActivities';
import type { ListTodosQuery } from 'graphql/todos/queries/list_todos.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type { SchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/groups.generated';
import EditTodo from '#/components/form-components/Todos/EditTodo';
// const { Panel } = Collapse;

type TemplateData = ListData;
type ActivityData = Exclude<
  ListTodosQuery['listTodos'],
  undefined | null
>['todos'][0];
export interface TableItem {
  key: string;
  name?: string | null;
  description?: string | null;
  createdAt?: Date | null | undefined;
  completedDate?: Date | null | undefined;
  dueDate?: Date | null;
  completed: boolean;
  assignedUsers: { id: string; fullName: string }[];
  groups: { id: string; name: string }[];
  todo: ActivityData;
  linkedItem?: JSX.Element;
}

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
  groupsFilter: string[];
  setGroupsFilter: (groups: string[]) => void;
  onTableChange: TableProps<TableItem>['onChange'];
  groupsData: SchemeGroupsSelectQuery | undefined;
  editRights: boolean;
  deleteRights: boolean;
  editTodo: string | null;
  setEditTodo: (id: string | null) => void;
  onDeleteTodo: (id: string) => void;
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
  groupsFilter,
  setGroupsFilter,
  onTableChange,
  groupsData,
  editRights,
  deleteRights,
  editTodo,
  setEditTodo,
  onDeleteTodo,
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
            // value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a task...',
            })}
            allowClear
          />
        </Col>
        <Col span={5}>
          <GroupsSelect
            allowClear
            onChange={setGroupsFilter}
            value={groupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            style={{ width: '100%' }}
            mode="multiple"
            maxTagCount="responsive"
          />
        </Col>
        <Col flex={1} />

        {templateData.length > 0 && (
          <Col span={5}>
            <Select
              style={{ width: '100%' }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Create Activity from Template',
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
      <Card loading={loading} bodyStyle={{ padding: loading ? 20 : 0 }}>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))
        ) : (
          <Table<TableItem>
            dataSource={data?.todos?.map((todo) => ({
              key: todo.id,
              name: todo.name,
              description: todo?.description,
              dueDate: todo.dueDate,
              createdAt: todo.createdAt,
              completedDate: todo.completedDate,
              completed: todo.completed || false,
              assignedUsers: todo.assignedUsers,
              groups: todo.groups || [],
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
            onChange={onTableChange}
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
                }),
                render: (value, record: { todo: ActivityData }) => (
                  <Link to={`${getTodoUrl(record.todo)}`}>{value}</Link>
                ),
              },
              {
                key: 'description',
                dataIndex: 'description',
                title: intl.formatMessage({
                  defaultMessage: 'Description',
                }),
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
                render: (value: Date) =>
                  value ? FormatCalendar(new Date(value), true) : undefined,
              },
              {
                key: 'dueDate',
                dataIndex: 'dueDate',
                title: intl.formatMessage({
                  defaultMessage: 'Due Date',
                }),
                render: (value: Date) => FormatCalendar(value),
                // sorter: (a, b) =>
                //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //   // @ts-ignore
                //   new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf(),
              },
              {
                key: 'assignedUsers',
                dataIndex: 'assignedUsers',
                title: intl.formatMessage({
                  defaultMessage: 'Assigned Users',
                }),
                ellipsis: true,
                filters: userFilter,
                onFilter: (
                  value: string | number | boolean,
                  record: { assignedUsers: { id: string }[] }
                ) => record.assignedUsers.some((el) => el.id === value),
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
                key: 'groups',
                title: intl.formatMessage({
                  defaultMessage: 'Groups',
                }),
                dataIndex: 'groups',
                filters:
                  groupsData?.groups.map(({ id, name }) => ({
                    text: name,
                    value: id,
                  })) ?? [],
                filteredValue: groupsFilter,
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
              },
              {
                key: 'linkedItem',
                dataIndex: 'linkedItem',
                title: intl.formatMessage({
                  defaultMessage: 'Linked Item',
                }),
                // filters: typesFilter,
                // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // // @ts-ignore
                // onFilter: (value: string, record) =>
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
              },
              {
                title: intl.formatMessage({
                  defaultMessage: 'Status',
                }),
                dataIndex: 'actions',
                key: 'actions',
                width: 130,
                filters: [
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
                ],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onFilter: (
                  value: string | number | boolean,
                  record: { completed: boolean }
                ) => record.completed === value,
                // eslint-disable-next-line no-confusing-arrow
                render: (_, record: { key: string; completed: boolean }) =>
                  record.completed ? (
                    <Popconfirm
                      title={intl.formatMessage({
                        defaultMessage: 'Uncompleted this activity?',
                      })}
                      // description="Do you complete this activity?"
                      onConfirm={() => onUncompletedTodo(record.key)}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button size="small" style={{ width: 110, padding: 2 }}>
                        {intl.formatMessage({
                          defaultMessage: 'Completed',
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
                          setSelectedTodo(record.key);
                        } else {
                          onCompletedTodo(record.key);
                        }
                      }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Uncompleted',
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
              {
                key: 'Options',
                title: '',
                dataIndex: 'Options',
                width: 100,
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
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              setEditTodo(record?.key);
                            }}
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
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
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the Activity?',
                            })}
                            onConfirm={() => {
                              onDeleteTodo(record.key);
                            }}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            overlayInnerStyle={{ padding: 10 }}
                          >
                            <Button
                              size="small"
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                          </Popconfirm>
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
                ),
              },
            ].filter(
              (item) =>
                item?.dataIndex !== 'Options' || deleteRights || editRights
            )}
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
        title={intl.formatMessage({
          defaultMessage: 'Create Activity',
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
          defaultMessage: 'Edit Activity',
        })}
        open={!!editTodo}
        width={800}
        onClose={() => setEditTodo(null)}
      >
        {editTodo ? (
          <EditTodo
            todoId={editTodo}
            onClose={() => setEditTodo(null)}
            initData={selectedTemplate ?? undefined}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
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
