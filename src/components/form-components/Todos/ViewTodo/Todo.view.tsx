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
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Skeleton,
  Table,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from './useTodo';

import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import LinkProfile from '../LinkProfile';
interface Props {
  actionsOpen: boolean;
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
  todo: TodoQuery | undefined;
  toggleActionsOpen: () => void;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
}

const TodoView = ({
  actionsOpen,
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
  todo,
  toggleActionsOpen,
  updateChecklistsList,
  updateCrimeGroupsList,
  updateIncidentList,
  updateInvestigationList,
  updateOffendersList,
  users,
}: Props) => {
  const intl = useIntl();
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

  return (
    <div>
      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Details',
        })}
      </Typography.Title>
      <Descriptions>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Name',
          })}
        >
          {loading ? (
            <Skeleton.Input style={{ height: 24 }} />
          ) : (
            todo?.todo?.name || ''
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Alert ID',
          })}
        >
          {loading ? (
            <Skeleton.Input style={{ height: 24 }} />
          ) : (
            todo?.todo?.reference || ''
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Created At',
          })}
        >
          {todo?.todo ? dayjs(todo.todo.createdAt).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Due Date',
          })}
        >
          {todo?.todo ? dayjs(todo.todo.dueDate).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Description',
          })}
        >
          {todo?.todo?.description}
        </Descriptions.Item>
      </Descriptions>
      {minimal && (
        <>
          <Divider style={{ marginTop: 10 }} />
          <Typography.Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'Completed User Details',
            })}
          </Typography.Title>
          <Descriptions>
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'User Name',
              })}
            >
              {loading ? (
                <Skeleton.Input style={{ height: 24 }} />
              ) : (
                todo?.todo?.completedBy?.fullName || ''
              )}
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Completed Date',
              })}
            >
              {todo?.todo.completedDate
                ? dayjs(todo.todo.completedDate).format('DD/MM/YY')
                : null}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
            >
              {todo?.todo?.description}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
      <Divider style={{ marginTop: 10 }} />

      <Row>
        {todo?.todo.business ? (
          <Typography.Text
            style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}
          >
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <FormattedMessage defaultMessage="Business" /> -{' '}
            {todo.todo.business.name}
          </Typography.Text>
        ) : null}
      </Row>
      {todo?.todo.business?.locations[0].geoLat &&
        todo?.todo.business?.locations[0].geoLng && (
          <>
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              {intl.formatMessage({ defaultMessage: 'Location' })}
            </Typography.Text>
            <MapCard
              height={194}
              viewport={{
                latitude: todo?.todo.business?.locations[0].geoLat,
                longitude: todo?.todo.business?.locations[0].geoLng,
              }}
              width="100%"
            />
            <Divider style={{ marginTop: 10 }} />
          </>
        )}

      <Form
        form={form}
        hidden={minimal}
        initialValues={{ questions: [] }}
        layout="vertical"
        onFinish={onSubmit}
      >
        {questions && questions.length > 0 ? (
          <Typography.Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'Questions',
            })}
          </Typography.Title>
        ) : null}
        {questions && questions.length > 0 ? (
          <CustomQuestions disabled={saving} questions={questions} />
        ) : null}
        {questions && questions.length > 0 ? (
          <Divider style={{ marginTop: 10 }} />
        ) : null}
        <Row style={{ marginBottom: 15 }}>
          <Col span={24}>
            <Typography.Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Time Tracking',
              })}
            </Typography.Title>
            <Row>
              <Col flex={1}>
                {users.map((user) => (
                  <Form.Item
                    colon
                    label={user.name}
                    name={user.id}
                    rules={[
                      { message: 'Add time for this user', required: true },
                    ]}
                  >
                    <InputNumber
                      addonAfter={intl.formatMessage({
                        defaultMessage: 'mins',
                      })}
                      min={0}
                    />
                  </Form.Item>
                ))}
              </Col>
              <Col>
                <Typography.Paragraph
                  style={{ fontWeight: 600, marginBottom: 5 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Another User',
                  })}
                </Typography.Paragraph>
                <Select
                  onSelect={(value) => {
                    const user = availableUsers.find((u) => u.id === value);
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
                  style={{ width: 200 }}
                  value={null}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <LinkProfile
          checklistsData={checklistsData}
          crimeGroupsData={crimeGroupsData}
          incidentsData={incidentsData}
          investigationsData={investigationsData}
          offendersData={offendersData}
          saving={saving}
          updateChecklistsList={updateChecklistsList}
          updateCrimeGroupsList={updateCrimeGroupsList}
          updateIncidentList={updateIncidentList}
          updateInvestigationList={updateInvestigationList}
          updateOffendersList={updateOffendersList}
        />
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Evidence',
          })}
          name="documents"
        >
          <Upload
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...documentUploadProps}
            fileList={documentList}
            listType="picture"
            style={{ display: 'flex' }}
          >
            <Button icon={<UploadOutlined />}>
              {intl.formatMessage({
                defaultMessage: 'Upload Document',
              })}
            </Button>
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 10 }}>
            {todo?.todo?.actions && todo.todo.actions.length > 0 && (
              <Col>
                <Button onClick={toggleActionsOpen}>
                  {intl.formatMessage({
                    defaultMessage: 'Show Activity Log',
                  })}
                </Button>
              </Col>
            )}
            <Col>
              <Button
                disabled={saving}
                onClick={() => {
                  onClose();
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {confirmText ||
                  intl.formatMessage({
                    defaultMessage: 'Complete Activity',
                  })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      {needAuthorised && (
        <>
          <Row gutter={20} style={{ marginTop: 10 }}>
            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Incidents,
              },
            }) && incidentsData ? (
              <Col span={12}>
                <Divider>
                  {intl.formatMessage({
                    defaultMessage: 'Incident',
                  })}
                </Divider>
                <IncidentDetailCard incident={incidentsData} />
              </Col>
            ) : null}

            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Offenders,
              },
            }) && offendersData ? (
              <Col span={12}>
                <Divider>
                  {intl.formatMessage({
                    defaultMessage: 'Offender',
                  })}
                </Divider>
                <OffenderDetailCard offender={offendersData} />
              </Col>
            ) : null}
            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Investigations,
              },
            }) && investigationsData ? (
              <Col span={12}>
                <Divider>
                  {intl.formatMessage({
                    defaultMessage: 'Investigation',
                  })}
                </Divider>
                <InvestigationDetailCard investigation={investigationsData} />
              </Col>
            ) : null}
            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.CrimeGroups,
              },
            }) && crimeGroupsData ? (
              <Col span={12}>
                <Divider>
                  {intl.formatMessage({
                    defaultMessage: 'Crime Group',
                  })}
                </Divider>
                <CrimeGroupDetailCard crimeGroup={crimeGroupsData} />
              </Col>
            ) : null}
            {hasRolePermission({
              permission: {
                method: PermissionMethod.Read,
                model: PermissionModel.Checklist,
              },
            }) && checklistsData ? (
              <Col span={12}>
                <Divider>
                  {intl.formatMessage({
                    defaultMessage: 'CheckList',
                  })}
                </Divider>
                <ChecklistDetailCard checklist={checklistsData} />
              </Col>
            ) : null}
          </Row>
          <Row gutter={16} justify="end" style={{ marginTop: 10 }}>
            <Col>
              <Button
                disabled={saving}
                onClick={() => {
                  onClose();
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={onAuthorisedTodo}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Authorise Activity',
                })}
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Modal
        onCancel={toggleActionsOpen}
        open={actionsOpen}
        title={<FormattedMessage defaultMessage="Activity Log" />}
        width="80%"
      >
        <Table
          columns={[
            {
              dataIndex: 'createdAt',
              key: 'createdAt',
              render: (date: string) => dayjs(date).format('DD/MM/YY'),
              title: 'Date',
            },
            {
              dataIndex: 'description',
              key: 'description',
              title: 'Action Description',
            },
          ]}
          dataSource={
            todo?.todo.actions?.map((a) => ({
              createdAt: a.createdAt,
              description: a.description,
            })) ?? []
          }
        />
      </Modal>
    </div>
  );
};

export default TodoView;
