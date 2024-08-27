/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { TodoListQuery } from '#/views/adminTodo/TodoList/__generated__/TodoListQuery.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { TableProps } from 'antd';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type { TodoStatusInput } from 'graphql/types';

import {
  faCheckCircle,
  faEllipsisH,
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
  Dropdown,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
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

export interface TableItem {
  assignedUsers: { fullName: string; id: string }[];
  completed?: boolean | null;
  description?: null | string;
  dueDate?: Date | null;
  groups: { id: string; name: string }[];
  key: string;
  linkedItem?: JSX.Element;
  name?: null | string;
  todo: TodoListQuery['todoRelay']['edges'][0];
}

interface Props {
  addTodo: boolean;
  canDelete: boolean;
  currentPage: number;
  currentPageSize: number;
  data: TodoListQuery | null | undefined;
  groupsData: { label: string; value: string }[];
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
  setGroupsFilter: (groups: string[]) => void;
  setSearch: (value: string) => void;
  setSelectedTodo: (id: null | string) => void;
  setStatusMode: (value: TodoStatusInput) => void;
  templateData: ListData[];
  toggleAddTodo: () => void;
  toggleAllSchemes: () => void;
  toggleAllUsers: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  userData: { label: string; value: string }[];
}

const getLinkedItemId = (todo: TodoListQuery['todoRelay']['edges'][0]) => {
  if (todo.node.incident)
    return (
      <FormattedMessage
        defaultMessage="Incident: {var1}"
        values={{ var1: todo.node.incident.reference }}
      />
    );
  if (todo.node.offender)
    return (
      <FormattedMessage
        defaultMessage="Offender: {var1}"
        values={{ var1: todo.node.offender.reference }}
      />
    );
  if (todo.node.crimeGroup)
    return (
      <FormattedMessage
        defaultMessage="Crime Group: {var1}"
        values={{ var1: todo.node.crimeGroup.reference }}
      />
    );
  if (todo.node.vehicle)
    return (
      <FormattedMessage
        defaultMessage="Vehicle: {var1}"
        values={{ var1: todo.node.vehicle.reference }}
      />
    );
  if (todo.node.investigation)
    return (
      <FormattedMessage
        defaultMessage="Investigation: {var1}"
        values={{ var1: todo.node.investigation.reference }}
      />
    );
  return undefined;
};

const getLinkedItemTo = (todo?: TodoListQuery['todoRelay']['edges'][0]) => {
  if (!todo) return '#';
  if (todo.node.incidentId)
    return `/app/incidents/view/${todo.node.incidentId}`;
  if (todo.node.offenderId)
    return `/app/offenders/view/${todo.node.offenderId}`;
  if (todo.node.crimeGroupId)
    return `/app/crime-groups/view/${todo.node.crimeGroupId}`;
  if (todo.node.vehicleId) return `/app/vehicles/view/${todo.node.vehicleId}`;
  if (todo.node.investigationId)
    return `/app/investigations/view/${todo.node.investigationId}`;
  return '#';
};

const AdminTodos = ({
  addTodo,
  canDelete,
  currentPage,
  currentPageSize,
  data,
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
  setSearch,
  setSelectedTodo,
  setStatusMode,
  templateData,
  toggleAddTodo,
  toggleAllSchemes,
  toggleAllUsers,
  updateTodoList,
  userData,
}: Props): JSX.Element => {
  // const classes = useStyles();
  const intl = useIntl();
  const shouldOpen = useStoreState((state) => state.scheme.taskTimeTracking);

  const completeTodo = (value: boolean, id?: string) => {
    if (value && id) {
      onCompletedTodo(id);
    }
  };

  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 15 }}>
        <Col>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a task...',
            })}
            style={{ width: 350 }}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Radio.Group
            defaultValue="UNCOMPLETED"
            onChange={(e) => setStatusMode(e.target.value)}
          >
            <Radio.Button value="UNCOMPLETED">
              {intl.formatMessage({
                defaultMessage: 'Open',
              })}
            </Radio.Button>
            <Radio.Button value="COMPLETED">
              {intl.formatMessage({
                defaultMessage: 'Completed',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All',
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
      <Card bodyStyle={{ padding: loading ? 20 : 0 }}>
        <Table<TableItem>
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              render: (value, record) => (
                <Link to={`${getTodoUrl(record.todo.node)}`}>{value}</Link>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              render: (value: string) => (
                <Tooltip title={value}>{value}</Tooltip>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'status',
              key: 'status',
              render: (value) => (
                <Typography.Text>
                  {value ? (
                    <FormattedMessage defaultMessage="Completed" />
                  ) : (
                    <FormattedMessage defaultMessage="Open" />
                  )}
                </Typography.Text>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Status',
              }),
            },
            {
              dataIndex: 'createdAt',
              key: 'createdAt',
              render: (value: Date) => FormatCalendar(value),
              title: intl.formatMessage({
                defaultMessage: 'Created On',
              }),
            },
            {
              dataIndex: 'dueDate',
              key: 'dueDate',
              render: (value: Date) => FormatCalendar(value),
              title: intl.formatMessage({
                defaultMessage: 'Due Date',
              }),
            },
            {
              dataIndex: 'completedDate',
              key: 'completedDate',
              render: (value?: Date) => (value ? FormatCalendar(value) : null),
              title: intl.formatMessage({
                defaultMessage: 'Completion Date',
              }),
            },
            {
              dataIndex: 'assignedUsers',
              ellipsis: true,
              filterSearch: true,
              filters: userData.map((item) => ({
                text: item.label,
                value: item.value,
              })),
              key: 'assignedUsers',
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
              filterSearch: true,
              filteredValue: groupsFilter,
              filters: groupsData.map((item) => ({
                text: item.label,
                value: item.value,
              })),
              key: 'groups',
              render: (value: { id: string; name: string }[]) => (
                <Typography.Text>
                  {value
                    // eslint-disable-next-line no-confusing-arrow
                    .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
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
              render: (value, todo) => (
                <Link
                  to={getLinkedItemTo(
                    data?.todoRelay.edges.find(
                      ({ node }) => node.id === todo.key
                    )
                  )}
                >
                  {value}
                </Link>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Linked Item',
              }),
            },
            {
              dataIndex: 'actions',
              key: 'actions',
              render: (_, record) => (
                <Row wrap={false}>
                  <Col>
                    {record.completed ? (
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
                          defaultMessage: 'Are you sure?',
                        })}
                      >
                        <Button
                          size="small"
                          style={{
                            borderBottomRightRadius: canDelete ? 0 : 10,
                            borderTopRightRadius: canDelete ? 0 : 10,
                            padding: 2,
                            width: 110,
                          }}
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Reopen',
                          })}
                        </Button>
                      </Popconfirm>
                    ) : (
                      <Button
                        onClick={() => {
                          if (shouldOpen) {
                            setSelectedTodo(record.todo.node.id);
                          } else {
                            onCompletedTodo(record.todo.node.id);
                          }
                        }}
                        size="small"
                        style={{
                          borderBottomRightRadius: canDelete ? 0 : 10,
                          borderTopRightRadius: canDelete ? 0 : 10,
                          padding: 2,
                          width: 110,
                        }}
                        type="ghost"
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          size="lg"
                          style={{ marginRight: 8 }}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Complete',
                        })}
                      </Button>
                    )}
                  </Col>
                  {canDelete && (
                    <Col>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              icon: <FontAwesomeIcon icon={faTrash} />,
                              key: '1',
                              label: intl.formatMessage({
                                defaultMessage: 'Delete',
                              }),
                              onClick: () =>
                                Modal.confirm({
                                  content: intl.formatMessage({
                                    defaultMessage:
                                      'This action cannot be undone',
                                  }),
                                  onOk: () => onDeleteTodo(record.key),
                                  title: intl.formatMessage({
                                    defaultMessage: 'Are you sure?',
                                  }),
                                }),
                            },
                          ],
                        }}
                      >
                        <Button
                          size="small"
                          style={{
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                            paddingLeft: 8,
                            paddingRight: 10,
                          }}
                        >
                          <FontAwesomeIcon icon={faEllipsisH} size="lg" />
                        </Button>
                      </Dropdown>
                    </Col>
                  )}
                </Row>
              ),
              width: 170,
            },
            {
              dataIndex: 'view',
              key: 'view',
              render: (_, record) => (
                <Typography.Link
                  onClick={() => setSelectedTodo(record.todo.node.id)}
                >
                  {intl.formatMessage({
                    defaultMessage: 'View',
                  })}
                </Typography.Link>
              ),
              width: 100,
            },
          ]}
          dataSource={data?.todoRelay.edges?.map((todo) => ({
            assignedUsers: todo.node.assignedUsers,
            completed: todo.node.completed,
            completedDate: todo.node.completedDate,
            createdAt: todo.node.createdAt,
            description: todo.node.description,
            dueDate: todo.node.dueDate,
            groups: todo.node.groups || [],
            key: todo.node.id,
            linkedItem: getLinkedItemId(todo),
            name: todo.node.name,
            status: todo.node.completed,
            todo,
          }))}
          loading={loading}
          onChange={onTableChange}
          pagination={{
            current: currentPage,
            hideOnSinglePage: true,
            onChange: onPaginationChange,
            pageSize: currentPageSize,
            position: ['bottomCenter'],
            showSizeChanger: false,
            total: data?.todoRelay.totalCount,
          }}
          size="small"
        />
      </Card>

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
            minimal={
              !!data?.todoRelay.edges.find(
                ({ node }) => node.id === selectedTodo
              )?.node.completed
            }
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
