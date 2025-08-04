import type { TodoQuery } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/view-task.generated';
import type {
  ChecklistData,
  CrimeGroupData,
  CustomQuestion,
  IncidentCardData,
  InvestigationData,
  OffenderData,
} from '#/types/DataType';
import type { FormInstance, UploadFile, UploadProps } from 'antd';

import ChecklistDetailCard from '#/components/MessageInput/MessageCard/ChecklistDetailCard';
import CrimeGroupDetailCard from '#/components/MessageInput/MessageCard/CrimeGroupDetailCard';
import IncidentDetailCard from '#/components/MessageInput/MessageCard/IncidentDetailCard';
import InvestigationDetailCard from '#/components/MessageInput/MessageCard/InvestigationDetailCard';
import OffenderDetailCard from '#/components/MessageInput/MessageCard/OffenderDetailCard';
import MapCard from '#/components/map/LocatingCard/MapCard.view';
import { PermissionMethod, PermissionModel } from '#/graphql/types';
import hasRolePermission from '#/utils/has-role-permission';
import {
  ClockCircleOutlined,
  FileTextOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Grid,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from './useTodo';

import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import LinkProfile from '../LinkProfile';
import useStyles from './Todo.styles';

interface TodoWithGroups extends NonNullable<TodoQuery['todo']> {
  groups: { id: string; name: string }[];
}

const { useBreakpoint } = Grid;

interface Props {
  availableUsers: { id: string; name: string; timeTaken: number }[];
  checklistsData: ChecklistData | undefined;
  confirmText?: string;
  crimeGroupsData: CrimeGroupData | undefined;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  loading: boolean;
  minimal?: boolean;
  needAuthorised: boolean;
  offendersData: OffenderData | undefined;
  onAuthorisedTodo: () => void;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  taskTimeTracking: boolean | undefined;
  todo: TodoQuery | undefined;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
}

const TodoView = ({
  availableUsers,
  checklistsData,
  confirmText,
  crimeGroupsData,
  documentList,
  documentUploadProps,
  form,
  incidentsData,
  investigationsData,
  loading,
  minimal = false,
  needAuthorised,
  offendersData,
  onAuthorisedTodo,
  onClose,
  onSubmit,
  saving,
  setAvailableUsers,
  setUsers,
  taskTimeTracking,
  todo,
  updateChecklistsList,
  updateCrimeGroupsList,
  updateIncidentList,
  updateInvestigationList,
  updateOffendersList,
  users,
}: Props) => {
  const intl = useIntl();
  const screens = useBreakpoint();
  const classes = useStyles();

  const questions = todo?.todo?.questions.map(({ id, question }) => {
    form.setFieldValue(
      question.id,
      todo?.todo?.answers?.find((answer) => answer?.taskQuestion?.id === id)
        ?.answer
    );

    return {
      answerType: question?.type,
      label: question.questionFormatted,
      options: question.optionsFormFormatted || [],
      questionId: question.id,
      required: false,
      tagQuestionId: id,
      value: todo?.todo?.answers?.find(
        (answer) => answer?.taskQuestion?.id === id
      )?.answer,
    };
  }) as CustomQuestion[];

  // Loading state with better skeleton
  if (loading) {
    return (
      <Card>
        <Skeleton active paragraph={{ rows: 8 }} />
        <Divider />
        <Skeleton active paragraph={{ rows: 6 }} />
      </Card>
    );
  }

  return (
    <div>
      {/* Status Alert for Completed Tasks */}
      {minimal && todo?.todo?.completedBy && (
        <Alert
          description={
            <Space direction="vertical" size="small">
              <span>
                <strong>
                  <FormattedMessage defaultMessage="Completed by:" />
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                </strong>{' '}
                {todo.todo.completedBy.fullName}
              </span>
              {todo.todo.completedDate && (
                <span>
                  <strong>
                    <FormattedMessage defaultMessage="Completed on:" />
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  </strong>{' '}
                  {dayjs(todo.todo.completedDate).format('DD/MM/YY HH:mm')}
                </span>
              )}
            </Space>
          }
          message={intl.formatMessage({
            defaultMessage: 'This activity has been completed',
          })}
          showIcon
          style={{ marginBottom: 16 }}
          type="success"
        />
      )}

      {/* Task Overview */}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          {todo?.todo?.name ||
            intl.formatMessage({ defaultMessage: 'Task Overview' })}
        </Typography.Title>
        {!minimal && (
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ marginRight: 8 }}
              />
            }
            loading={saving}
            onClick={() => form.submit()}
            style={{ borderColor: '#52c41a', color: '#52c41a' }}
          >
            {confirmText ||
              intl.formatMessage({
                defaultMessage: 'Complete Activity',
              })}
          </Button>
        )}
      </div>

      <Descriptions
        bordered={!screens.xs}
        column={{ md: 2, sm: 2, xs: 1 }}
        style={{
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Alert ID' })}
        >
          {todo?.todo?.reference || <FormattedMessage defaultMessage="-" />}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Business' })}
        >
          {todo?.todo?.business?.name || (
            <FormattedMessage defaultMessage="-" />
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Created At' })}
        >
          {todo?.todo ? (
            dayjs(todo.todo.createdAt).format('DD/MM/YY')
          ) : (
            <FormattedMessage defaultMessage="-" />
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Due Date' })}
        >
          {todo?.todo ? (
            <Space>
              {dayjs(todo.todo.dueDate).format('DD/MM/YY')}
              {dayjs().isAfter(dayjs(todo.todo.dueDate)) && !minimal && (
                <Tag color="error">
                  <FormattedMessage defaultMessage="Overdue" />
                </Tag>
              )}
            </Space>
          ) : (
            <FormattedMessage defaultMessage="-" />
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Groups' })}
          span={2}
        >
          {(() => {
            const todoData = todo?.todo as TodoWithGroups | undefined;
            return todoData?.groups && todoData.groups.length > 0 ? (
              <Space wrap>
                {todoData.groups.map((group) => (
                  <Tag key={group.id}>{group.name}</Tag>
                ))}
              </Space>
            ) : (
              <FormattedMessage defaultMessage="-" />
            );
          })()}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Assigned Users' })}
          span={2}
        >
          {todo?.todo?.assignedUsers && todo.todo.assignedUsers.length > 0 ? (
            <Avatar.Group maxCount={5}>
              {todo.todo.assignedUsers.map((user) => (
                <Tooltip key={user.id} title={user.fullName}>
                  <Avatar style={{ backgroundColor: '#1890ff' }}>
                    {user.fullName
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          ) : (
            <FormattedMessage defaultMessage="-" />
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Description' })}
          span={2}
        >
          {todo?.todo?.description || <FormattedMessage defaultMessage="-" />}
        </Descriptions.Item>
        {todo?.todo?.completedBy && (
          <>
            <Descriptions.Item
              label={intl.formatMessage({ defaultMessage: 'Completed By' })}
            >
              <Space>
                <Avatar size="small" style={{ backgroundColor: '#52c41a' }}>
                  {todo.todo.completedBy.fullName
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </Avatar>
                <span>{todo.todo.completedBy.fullName}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({ defaultMessage: 'Completed On' })}
            >
              {todo.todo.completedDate ? (
                dayjs(todo.todo.completedDate).format('DD/MM/YY HH:mm')
              ) : (
                <FormattedMessage defaultMessage="-" />
              )}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>

      {/* Business Location Map */}
      {todo?.todo?.business?.locations?.[0]?.geoLat &&
        todo?.todo?.business?.locations?.[0]?.geoLng &&
        todo.todo.business.locations[0].geoLat !== 0 &&
        todo.todo.business.locations[0].geoLng !== 0 && (
          <div
            style={{
              border: '1px solid var(--ant-color-border)',
              borderRadius: 8,
              marginBottom: 16,
              overflow: 'hidden',
            }}
          >
            <MapCard
              height={screens.xs ? 200 : 300}
              viewport={{
                latitude: todo.todo.business.locations[0].geoLat,
                longitude: todo.todo.business.locations[0].geoLng,
              }}
              width="100%"
            />
          </div>
        )}

      {/* Form Section */}
      <Form
        form={form}
        initialValues={{ questions: [] }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {/* Questions Section */}
          {questions && questions.length > 0 && (
            <Card
              className={classes.todoSectionCard}
              title={
                <Space>
                  <QuestionCircleOutlined style={{ fontSize: 18 }} />
                  {intl.formatMessage({ defaultMessage: 'Questions' })}
                  <Tag>{questions.length}</Tag>
                </Space>
              }
            >
              <CustomQuestions
                disabled={minimal || saving}
                questions={questions}
              />
            </Card>
          )}

          {/* Time Tracking Section */}
          {taskTimeTracking && (
            <Card
              className={`${classes.todoSectionCard} todo-time-tracking`}
              title={
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Space>
                    <ClockCircleOutlined style={{ fontSize: 18 }} />
                    {intl.formatMessage({ defaultMessage: 'Time Tracking' })}
                    {users.length > 0 && (
                      <Tag color="red">
                        {intl.formatMessage({ defaultMessage: 'Required' })}
                      </Tag>
                    )}
                  </Space>
                  {!minimal && (
                    <Space align="center">
                      <Typography.Text
                        style={{ fontSize: 14, fontWeight: 'normal' }}
                      >
                        {intl.formatMessage({ defaultMessage: 'Add user:' })}
                      </Typography.Text>
                      <Select
                        disabled={minimal || availableUsers.length === 0}
                        onSelect={(value) => {
                          const user = availableUsers.find(
                            (u) => u.id === value
                          );
                          if (user) {
                            setUsers([...users, user]);
                            setAvailableUsers(
                              availableUsers.filter((u) => u.id !== value)
                            );
                          }
                        }}
                        options={availableUsers.map((user) => ({
                          label: user.name,
                          value: user.id,
                        }))}
                        placeholder={
                          availableUsers.length === 0
                            ? intl.formatMessage({
                                defaultMessage: 'No users available',
                              })
                            : intl.formatMessage({
                                defaultMessage: 'Select user',
                              })
                        }
                        style={{ width: 200 }}
                        value={null}
                      />
                    </Space>
                  )}
                </div>
              }
            >
              {users.length === 0 ? (
                <Empty
                  description={intl.formatMessage({
                    defaultMessage: 'No users assigned for time tracking',
                  })}
                />
              ) : (
                <Row gutter={[16, 16]}>
                  {users.map((user) => (
                    <Col key={user.id} md={8} sm={12} xs={24}>
                      <Form.Item
                        colon
                        label={user.name}
                        name={user.id}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Add time for this user',
                            }),
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber
                          addonAfter={intl.formatMessage({
                            defaultMessage: 'mins',
                          })}
                          disabled={minimal}
                          min={0}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              )}
            </Card>
          )}

          {/* Linked Profiles Section */}
          <LinkProfile
            checklistsData={checklistsData}
            crimeGroupsData={crimeGroupsData}
            incidentsData={incidentsData}
            investigationsData={investigationsData}
            minimal={minimal}
            offendersData={offendersData}
            saving={minimal || saving}
            updateChecklistsList={updateChecklistsList}
            updateCrimeGroupsList={updateCrimeGroupsList}
            updateIncidentList={updateIncidentList}
            updateInvestigationList={updateInvestigationList}
            updateOffendersList={updateOffendersList}
          />

          {/* Evidence Section */}
          <Card
            className={`${classes.todoSectionCard} todo-evidence`}
            title={
              <Space>
                <FileTextOutlined style={{ fontSize: 18 }} />
                {intl.formatMessage({ defaultMessage: 'Evidence' })}
                {documentList.length > 0 && (
                  <Tag color="success">
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    {documentList.length}{' '}
                    <FormattedMessage defaultMessage="files" />
                  </Tag>
                )}
              </Space>
            }
          >
            <Form.Item name="documents">
              {documentList.length === 0 ? (
                <Upload.Dragger
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...documentUploadProps}
                  disabled={minimal}
                  fileList={documentList}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined
                      style={{ color: '#1890ff', fontSize: 48 }}
                    />
                  </p>
                  <p className="ant-upload-text">
                    {intl.formatMessage({
                      defaultMessage: 'Click or drag files to upload evidence',
                    })}
                  </p>
                  <p className="ant-upload-hint">
                    {intl.formatMessage({
                      defaultMessage:
                        'Support for single or bulk upload. Max 8 files.',
                    })}
                  </p>
                </Upload.Dragger>
              ) : (
                <Upload
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...documentUploadProps}
                  disabled={minimal}
                  fileList={documentList}
                  listType="picture-card"
                >
                  {!minimal && documentList.length < 8 && (
                    <div>
                      <UploadOutlined style={{ fontSize: 20 }} />
                      <div style={{ marginTop: 8 }}>
                        {intl.formatMessage({ defaultMessage: 'Upload' })}
                      </div>
                    </div>
                  )}
                </Upload>
              )}
            </Form.Item>
          </Card>
        </Space>

        {/* Activity Log Section - Inline Timeline */}
        {todo?.todo?.actions && todo.todo.actions.length > 0 && (
          <Card
            className={classes.todoSectionCard}
            style={{ marginTop: 16 }}
            title={
              <Space>
                <HistoryOutlined style={{ fontSize: 18 }} />
                {intl.formatMessage({ defaultMessage: 'Activity History' })}
                <Badge
                  count={todo.todo.actions.length}
                  style={{ backgroundColor: '#52c41a' }}
                />
              </Space>
            }
          >
            <Timeline mode="left">
              {todo.todo.actions.map((action, index) => (
                <Timeline.Item
                  color={index === 0 ? 'green' : 'gray'}
                  key={index}
                  label={
                    <Typography.Text style={{ fontSize: 12 }} type="secondary">
                      {dayjs(action.createdAt).format('DD/MM/YY HH:mm')}
                    </Typography.Text>
                  }
                >
                  <Typography.Text>{action.description}</Typography.Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        )}
      </Form>

      {/* Authorization Section */}
      {needAuthorised && (
        <Card
          className={classes.todoSectionCard}
          style={{ marginTop: 16 }}
          title={intl.formatMessage({
            defaultMessage: 'Authorization Required',
          })}
        >
          <Alert
            message={intl.formatMessage({
              defaultMessage: 'This activity requires authorization',
            })}
            showIcon
            style={{ marginBottom: 16 }}
            type="warning"
          />

          <Row gutter={[16, 16]}>
            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Incidents,
              },
            }) &&
              incidentsData && (
                <Col lg={8} md={12} xs={24}>
                  <Card
                    size="small"
                    title={intl.formatMessage({ defaultMessage: 'Incident' })}
                  >
                    <IncidentDetailCard incident={incidentsData} />
                  </Card>
                </Col>
              )}

            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Offenders,
              },
            }) &&
              offendersData && (
                <Col lg={8} md={12} xs={24}>
                  <Card
                    size="small"
                    title={intl.formatMessage({ defaultMessage: 'Offender' })}
                  >
                    <OffenderDetailCard offender={offendersData} />
                  </Card>
                </Col>
              )}

            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Investigations,
              },
            }) &&
              investigationsData && (
                <Col lg={8} md={12} xs={24}>
                  <Card
                    size="small"
                    title={intl.formatMessage({
                      defaultMessage: 'Investigation',
                    })}
                  >
                    <InvestigationDetailCard
                      investigation={investigationsData}
                    />
                  </Card>
                </Col>
              )}

            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.CrimeGroups,
              },
            }) &&
              crimeGroupsData && (
                <Col lg={8} md={12} xs={24}>
                  <Card
                    size="small"
                    title={intl.formatMessage({
                      defaultMessage: 'Crime Group',
                    })}
                  >
                    <CrimeGroupDetailCard crimeGroup={crimeGroupsData} />
                  </Card>
                </Col>
              )}

            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Checklist,
              },
            }) &&
              checklistsData && (
                <Col lg={8} md={12} xs={24}>
                  <Card
                    size="small"
                    title={intl.formatMessage({ defaultMessage: 'Checklist' })}
                  >
                    <ChecklistDetailCard checklist={checklistsData} />
                  </Card>
                </Col>
              )}
          </Row>

          <Divider />

          <Row gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={onAuthorisedTodo}
                type="primary"
              >
                {intl.formatMessage({ defaultMessage: 'Authorise Activity' })}
              </Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default TodoView;
