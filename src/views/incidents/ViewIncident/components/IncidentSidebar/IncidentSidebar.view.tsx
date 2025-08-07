import type { SidebarSection } from '#/components/CollapsibleSidebar';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { Reference } from '@apollo/client';

import CollapsibleSidebar from '#/components/CollapsibleSidebar';
import UpdateBar from '#/components/MessageInput/UpdateBar';
import HistoryTimeline from '#/components/ViewPage/HistoryTimeline';
import AddTodo from '#/components/form-components/Todos/AddTodo';
import EditTodo from '#/components/form-components/Todos/EditTodo';
import ViewTodo from '#/components/form-components/Todos/ViewTodo/Todo.container';
import { useDeleteTodoMutation } from '#/graphql/todos/mutations/__generated__/delete-todo.generated';
import hasRolePermission from '#/utils/has-role-permission';
import {
  faCheck,
  faCompass,
  faHistory,
  faListAlt,
  faMessages,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Modal,
  Row,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import useStyles from './IncidentSidebar.styles';
import IntelMessage from './IntelMessage.view';

interface Props {
  confirmDeleteUpdate: (updateId: string) => void;
  data: ViewIncidentQuery | undefined;
  editRights: boolean;
  incidentId: string;
  loadMore: boolean;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  setEditUpdate: (update: { id: string; text: string } | null) => void;
  setOptionRowShow: (show: boolean) => void;
  setReplyTo: (
    reply: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  userId: string;
}

const IncidentSidebar: React.FC<Props> = ({
  confirmDeleteUpdate,
  data,
  editRights,
  incidentId,
  loadMore,
  optionRowShow,
  replyTo,
  saving,
  scrolledToTop,
  setEditUpdate,
  setOptionRowShow,
  setReplyTo,
  userId,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<null | string>(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [editingActivity, setEditingActivity] = useState<null | string>(null);
  const [defaultSection, setDefaultSection] = useState<string>('intel');
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  const hasActivityReadPermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.Tasks,
    },
  });
  const hasActivityWritePermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Tasks,
    },
  });
  const hasActivityEditPermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Tasks,
    },
  });
  const hasActivityDeletePermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Tasks,
    },
  });

  const [deleteTodo] = useDeleteTodoMutation({
    onCompleted: () => {
      void message.success(
        intl.formatMessage({ defaultMessage: 'Activity deleted successfully' })
      );
    },
    onError: () => {
      void message.error(
        intl.formatMessage({ defaultMessage: 'Failed to delete activity' })
      );
    },
  });

  const handleDeleteActivity = (activityId: string) => {
    Modal.confirm({
      cancelText: intl.formatMessage({ defaultMessage: 'Cancel' }),
      content: intl.formatMessage({
        defaultMessage: 'Are you sure you want to delete this activity?',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete' }),
      okType: 'danger',
      onOk: () => {
        void deleteTodo({
          update: (cache) => {
            cache.modify({
              fields: {
                todos(existingTodos = [], { readField }) {
                  return (existingTodos as Reference[]).filter(
                    (todoRef: Reference) =>
                      activityId !== readField('id', todoRef)
                  );
                },
              },
              id: cache.identify({ __typename: 'Incident', id: incidentId }),
            });
          },
          variables: {
            where: { id: activityId },
          },
        });
      },
    });
  };

  // Set sidebar defaults based on data when it loads
  useEffect(() => {
    if (data) {
      const hasRecentUpdates = data.incident?.updates?.some((update) => {
        const updateDate = dayjs(update.createdAt);
        const thirtyDaysAgo = dayjs().subtract(30, 'days');
        return updateDate.isAfter(thirtyDaysAgo);
      });

      const hasActiveActivities =
        hasActivityReadPermission &&
        data.incident?.todos?.some((todo) => !todo.completed);

      // Priority: 1. Active activities, 2. Recent updates (last 30 days), 3. Closed
      if (hasActiveActivities) {
        setDefaultSection('activities');
        setDefaultExpanded(true);
      } else if (hasRecentUpdates) {
        setDefaultSection('intel');
        setDefaultExpanded(true);
      } else {
        setDefaultExpanded(false);
      }
    }
  }, [data, hasActivityReadPermission]);

  const activeTodos = useMemo(
    () => data?.incident?.todos?.filter((todo) => !todo.completed) || [],
    [data]
  );
  const completedTodos = useMemo(
    () => data?.incident?.todos?.filter((todo) => todo.completed) || [],
    [data]
  );

  const sections: SidebarSection[] = useMemo(() => {
    const baseSections: SidebarSection[] = [
      {
        badge: data?.incident?.updates?.length || undefined,
        content: (
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div
              style={{
                alignItems: 'center',
                borderBottom: `1px solid ${classes.borderColor}`,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 20px',
              }}
            >
              <Typography.Title level={4} style={{ margin: 0 }}>
                {intl.formatMessage({ defaultMessage: 'Intel' })}
              </Typography.Title>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
              {data?.incident?.updates && data.incident.updates.length > 0 ? (
                <div style={{ paddingBottom: 8, paddingTop: 8 }}>
                  {[...data.incident.updates].reverse().map((update) => (
                    <IntelMessage
                      confirmDeleteUpdate={confirmDeleteUpdate}
                      editRights={editRights}
                      key={update.id}
                      loadMore={loadMore}
                      onOpenLightbox={(_elements, _index) => {
                        // Handle lightbox if needed
                      }}
                      optionRowShow={optionRowShow}
                      saving={saving}
                      scrolledToTop={scrolledToTop}
                      setEditUpdate={setEditUpdate}
                      setReplyTo={setReplyTo}
                      update={update}
                      userId={userId}
                    />
                  ))}
                </div>
              ) : (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage: 'No updates yet',
                  })}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ marginTop: 48 }}
                />
              )}
            </div>
            <div className={classes.sidebarFooter}>
              <UpdateBar
                incidentId={incidentId}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
                subscribed={data?.incident?.subscribed ?? false}
              />
            </div>
          </div>
        ),
        icon: <FontAwesomeIcon icon={faMessages} />,
        id: 'intel',
        label: intl.formatMessage({ defaultMessage: 'Intel' }),
      },
      {
        content: (
          <div style={{ padding: '16px' }}>
            <Typography.Title level={4}>
              {intl.formatMessage({ defaultMessage: 'Compass' })}
            </Typography.Title>
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'Coming soon',
              })}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ),
        icon: <FontAwesomeIcon icon={faCompass} />,
        id: 'compass',
        label: intl.formatMessage({ defaultMessage: 'Compass' }),
      },
    ];

    baseSections.push({
      content: (
        <HistoryTimeline
          actions={data?.incident?.actions}
          onEntityClick={(entityType, entityId) => {
            switch (entityType) {
              case 'Todo': {
                setSelectedActivity(entityId);
                break;
              }
              case 'Incident': {
                navigate(`/app/incidents/view/${entityId}`);
                break;
              }
              case 'Offender': {
                navigate(`/app/offenders/view/${entityId}`);
                break;
              }
              case 'Vehicle': {
                navigate(`/app/vehicles/view/${entityId}`);
                break;
              }
              case 'CrimeGroup': {
                navigate(`/app/crime-groups/view/${entityId}`);
                break;
              }
              case 'Article': {
                navigate(`/app/articles/view/${entityId}`);
                break;
              }
              case 'User': {
                // Users typically don't have a view page
                break;
              }
              default: {
                break;
              }
            }
          }}
        />
      ),
      icon: <FontAwesomeIcon icon={faHistory} />,
      id: 'history',
      label: intl.formatMessage({ defaultMessage: 'History' }),
    });

    if (hasActivityReadPermission) {
      baseSections.push({
        badge: activeTodos.length > 0 ? activeTodos.length : undefined,
        content: (
          <div style={{ padding: '16px' }}>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <Typography.Title level={4} style={{ margin: 0 }}>
                {intl.formatMessage({ defaultMessage: 'Activities' })}
              </Typography.Title>
              {hasActivityWritePermission && (
                <Button
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />
                  }
                  onClick={() => setShowAddActivity(true)}
                  size="small"
                >
                  {intl.formatMessage({ defaultMessage: 'New Activity' })}
                </Button>
              )}
            </div>
            {activeTodos.length > 0 || completedTodos.length > 0 ? (
              <div className={classes.activitiesList}>
                {activeTodos.length > 0 && (
                  <>
                    <Typography.Title level={5}>
                      {intl.formatMessage({
                        defaultMessage: 'Active Tasks',
                      })}
                    </Typography.Title>
                    {activeTodos.map((activity) => {
                      const menuItems: {
                        danger?: boolean;
                        key: string;
                        label: string;
                        onClick: () => void;
                      }[] = [];

                      if (hasActivityEditPermission) {
                        menuItems.push({
                          key: 'edit',
                          label: intl.formatMessage({ defaultMessage: 'Edit' }),
                          onClick: () => setEditingActivity(activity.id),
                        });
                      }

                      if (hasActivityDeletePermission) {
                        menuItems.push({
                          danger: true,
                          key: 'delete',
                          label: intl.formatMessage({
                            defaultMessage: 'Delete',
                          }),
                          onClick: () => handleDeleteActivity(activity.id),
                        });
                      }

                      const cardContent = (
                        <Card
                          className={classes.activityCard}
                          key={activity.id}
                          onClick={() => setSelectedActivity(activity.id)}
                          size="small"
                        >
                          <Row gutter={[12, 12]}>
                            <Col span={24}>
                              <Row align="middle" gutter={8}>
                                <Col flex="1">
                                  <div>
                                    <Typography.Text
                                      className={classes.activityName}
                                    >
                                      {activity.name}
                                      {activity.reference && (
                                        <span
                                          className={classes.activityReference}
                                        >
                                          {intl.formatMessage(
                                            { defaultMessage: ' #{reference}' },
                                            { reference: activity.reference }
                                          )}
                                        </span>
                                      )}
                                    </Typography.Text>
                                  </div>
                                </Col>
                                <Col>
                                  <Tag
                                    className={classes.activityStatus}
                                    color="blue"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Active',
                                    })}
                                  </Tag>
                                </Col>
                              </Row>
                            </Col>
                            {activity.assignedUsers &&
                              activity.assignedUsers.length > 0 && (
                                <Col span={24}>
                                  <div className={classes.activityAssignees}>
                                    <span className={classes.activityLabel}>
                                      {intl.formatMessage({
                                        defaultMessage: 'Assigned to:',
                                      })}
                                    </span>
                                    <Avatar.Group maxCount={3}>
                                      {activity.assignedUsers.map(
                                        (user: {
                                          fullName?: null | string;
                                          id: string;
                                        }) => (
                                          <Tooltip
                                            key={user.id}
                                            title={user.fullName}
                                          >
                                            <Avatar
                                              size="small"
                                              style={{
                                                backgroundColor: '#1890ff',
                                              }}
                                            >
                                              {user.fullName
                                                ?.split(' ')
                                                .map((n: string) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                            </Avatar>
                                          </Tooltip>
                                        )
                                      )}
                                    </Avatar.Group>
                                  </div>
                                </Col>
                              )}
                            <Col span={12}>
                              <span className={classes.activityDetailLabel}>
                                {intl.formatMessage({
                                  defaultMessage: 'Created',
                                })}
                              </span>
                              <span className={classes.activityDetailValue}>
                                {dayjs(activity.createdAt).format('DD/MM/YYYY')}
                              </span>
                            </Col>
                            {activity.dueDate && (
                              <Col span={12}>
                                <span className={classes.activityDetailLabel}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Due',
                                  })}
                                </span>
                                <span className={classes.activityDetailValue}>
                                  {dayjs(activity.dueDate).format('DD/MM/YYYY')}
                                </span>
                              </Col>
                            )}
                          </Row>
                        </Card>
                      );

                      if (menuItems.length > 0) {
                        return (
                          <Dropdown
                            key={activity.id}
                            menu={{ items: menuItems }}
                            overlayClassName="activity-context-menu"
                            trigger={['contextMenu']}
                          >
                            {cardContent}
                          </Dropdown>
                        );
                      }

                      return cardContent;
                    })}
                  </>
                )}

                {completedTodos.length > 0 && (
                  <>
                    <Typography.Title level={5} style={{ marginTop: 16 }}>
                      {intl.formatMessage({
                        defaultMessage: 'Completed Tasks',
                      })}
                    </Typography.Title>
                    {completedTodos.map((activity) => {
                      const menuItems: {
                        danger?: boolean;
                        key: string;
                        label: string;
                        onClick: () => void;
                      }[] = [];

                      if (hasActivityEditPermission) {
                        menuItems.push({
                          key: 'edit',
                          label: intl.formatMessage({ defaultMessage: 'Edit' }),
                          onClick: () => setEditingActivity(activity.id),
                        });
                      }

                      if (hasActivityDeletePermission) {
                        menuItems.push({
                          danger: true,
                          key: 'delete',
                          label: intl.formatMessage({
                            defaultMessage: 'Delete',
                          }),
                          onClick: () => handleDeleteActivity(activity.id),
                        });
                      }

                      const cardContent = (
                        <Card
                          className={classes.activityCard}
                          key={activity.id}
                          onClick={() => setSelectedActivity(activity.id)}
                          size="small"
                          style={{ cursor: 'pointer', opacity: 0.7 }}
                        >
                          <Row gutter={[12, 12]}>
                            <Col span={24}>
                              <Row align="middle" gutter={8}>
                                <Col flex="1">
                                  <div>
                                    <Typography.Text
                                      className={classes.activityName}
                                      style={{ textDecoration: 'line-through' }}
                                    >
                                      {activity.name}
                                      {activity.reference && (
                                        <span
                                          className={classes.activityReference}
                                        >
                                          {intl.formatMessage(
                                            { defaultMessage: ' #{reference}' },
                                            { reference: activity.reference }
                                          )}
                                        </span>
                                      )}
                                    </Typography.Text>
                                  </div>
                                </Col>
                                <Col>
                                  <Tag
                                    className={classes.activityStatus}
                                    color="success"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Completed',
                                    })}
                                  </Tag>
                                </Col>
                              </Row>
                            </Col>
                            {activity.completedBy && activity.completedDate && (
                              <Col span={24}>
                                <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    style={{ color: '#52c41a', marginRight: 6 }}
                                  />
                                  {intl.formatMessage(
                                    {
                                      defaultMessage:
                                        'Completed by {name} on {date}',
                                    },
                                    {
                                      date: dayjs(
                                        activity.completedDate
                                      ).format('DD/MM/YYYY'),
                                      name: activity.completedBy.fullName,
                                    }
                                  )}
                                </div>
                              </Col>
                            )}
                            {activity.assignedUsers &&
                              activity.assignedUsers.length > 0 && (
                                <Col span={24}>
                                  <div className={classes.activityAssignees}>
                                    <span className={classes.activityLabel}>
                                      {intl.formatMessage({
                                        defaultMessage: 'Assigned to:',
                                      })}
                                    </span>
                                    <Avatar.Group maxCount={3}>
                                      {activity.assignedUsers.map(
                                        (user: {
                                          fullName?: null | string;
                                          id: string;
                                        }) => (
                                          <Tooltip
                                            key={user.id}
                                            title={user.fullName}
                                          >
                                            <Avatar
                                              size="small"
                                              style={{
                                                backgroundColor: '#1890ff',
                                              }}
                                            >
                                              {user.fullName
                                                ?.split(' ')
                                                .map((n: string) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                            </Avatar>
                                          </Tooltip>
                                        )
                                      )}
                                    </Avatar.Group>
                                  </div>
                                </Col>
                              )}
                          </Row>
                        </Card>
                      );

                      if (menuItems.length > 0) {
                        return (
                          <Dropdown
                            key={activity.id}
                            menu={{ items: menuItems }}
                            overlayClassName="activity-context-menu"
                            trigger={['contextMenu']}
                          >
                            {cardContent}
                          </Dropdown>
                        );
                      }

                      return cardContent;
                    })}
                  </>
                )}
              </div>
            ) : (
              <Empty
                description={intl.formatMessage({
                  defaultMessage: 'No activities found',
                })}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        ),
        icon: <FontAwesomeIcon icon={faListAlt} />,
        id: 'activities',
        label: intl.formatMessage({ defaultMessage: 'Activities' }),
      });
    }

    return baseSections;
  }, [
    intl,
    data,
    classes,
    editRights,
    confirmDeleteUpdate,
    loadMore,
    optionRowShow,
    replyTo,
    scrolledToTop,
    setEditUpdate,
    setOptionRowShow,
    setReplyTo,
    userId,
    incidentId,
    saving,
    activeTodos,
    completedTodos,
    hasActivityReadPermission,
    hasActivityWritePermission,
    hasActivityEditPermission,
    hasActivityDeletePermission,
    handleDeleteActivity,
  ]);

  return (
    <>
      <CollapsibleSidebar
        defaultExpanded={defaultExpanded}
        defaultSection={defaultSection}
        sections={sections}
      />

      {/* View Activity Drawer */}
      <Drawer
        onClose={() => setSelectedActivity(null)}
        open={!!selectedActivity}
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        width="800"
      >
        {selectedActivity && (
          <ViewTodo
            id={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            updateQuery={() => {
              setSelectedActivity(null);
            }}
            updateTodo={() => {}}
          />
        )}
      </Drawer>

      {/* Add Activity Drawer */}
      <Drawer
        onClose={() => setShowAddActivity(false)}
        open={showAddActivity}
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        width="600"
      >
        {showAddActivity && (
          <AddTodo
            incidentId={incidentId}
            onClose={() => setShowAddActivity(false)}
          />
        )}
      </Drawer>

      {/* Edit Activity Drawer */}
      <Drawer
        onClose={() => setEditingActivity(null)}
        open={!!editingActivity}
        title={intl.formatMessage({
          defaultMessage: 'Edit Activity',
        })}
        width="600"
      >
        {editingActivity && (
          <EditTodo
            onClose={() => setEditingActivity(null)}
            todoId={editingActivity}
          />
        )}
      </Drawer>
    </>
  );
};

export default IncidentSidebar;
