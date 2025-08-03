import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type {
  ChecklistData,
  CrimeGroupData,
  CustomQuestion,
  IncidentCardData,
  InvestigationData,
  OffenderData,
  SelectOptions,
} from 'types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
// import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import { useGroupsContext } from '#/context/groups-context';
import CustomQuestions from '#/views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditTodo';

import BusinessesSelect from '../../BusinessesSelect/BusinessesSelect.view';
import CreateQuestionContainer from '../../createQuestion/CreateQuestion.container';
import LinkProfile from '../LinkProfile';
interface Props {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  // todoData: EditTodoQuery | undefined;
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  // setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  form: FormInstance<FormData>;
  incidentsData: IncidentCardData | undefined;
  // setSelectedIds: (value: string[]) => void;
  investigationsData: InvestigationData | undefined;
  loading: boolean;
  offendersData: OffenderData | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  // selectedQuestions: { id: string; question: string }[];
  questions: CustomQuestion[];
  saving: boolean;
  selectedIds?: string[];
  setAddQuestion: (value: boolean) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  taskTimeTracking: boolean | undefined;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  update: (id: string, question: string) => void;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
  usersLoading: boolean;
}

const EditTodo = ({
  addQuestion,
  adminUsersData,
  availableUsers,
  checklistsData,
  crimeGroupsData,
  documentList,
  documentUploadProps,
  // setSelectedQuestions,
  form,
  incidentsData,
  // setSelectedIds,
  investigationsData,
  loading,
  offendersData,
  onClose,
  onSubmit,
  // selectedQuestions,
  questions,
  saving,
  selectedIds,
  setAddQuestion,
  setAvailableUsers,
  setUsers,
  taskTimeTracking,
  templatesData,
  templatesLoading,
  update,
  updateChecklistsList,
  updateCrimeGroupsList,
  updateIncidentList,
  updateInvestigationList,
  updateOffendersList,
  users,
  usersLoading,
}: // todoData,
Props): JSX.Element => {
  const intl = useIntl();
  const { groups, groupsLoading } = useGroupsContext();
  const completed = Form.useWatch('completed', form);

  return (
    <>
      <Form
        form={form}
        initialValues={{ assignedUsers: [] }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={9}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a name for the new to-do.',
                  }),
                  required: true,
                },
              ]}
            >
              {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Activity Template',
              })}
              name="questionGroup"
            >
              <Select
                allowClear
                disabled={saving}
                loading={templatesLoading}
                options={templatesData?.scheme?.questionGroups.map(
                  (template) => ({
                    label: template.name,
                    value: template.id,
                  })
                )}
                placeholder={intl.formatMessage({
                  defaultMessage: 'No template selected',
                })}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Due Date',
              })}
              name="dueDate"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a due date for the new to-do.',
                  }),
                  required: true,
                },
              ]}
            >
              <DatePicker disabled={saving} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Assigned Users',
              })}
              name="assignedUsers"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please selected at least one admin for the new to-do.',
                  }),
                  required: true,
                },
              ]}
            >
              <Select
                disabled={saving}
                loading={usersLoading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={adminUsersData}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              name="groups"
            >
              <Select
                disabled={saving}
                loading={groupsLoading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={groups}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Businesses',
              })}
              name="business"
            >
              <BusinessesSelect
                allowClear
                disabled={saving}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a business...',
                })}
                showSearch
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
              name="description"
            >
              {loading ? (
                <Skeleton.Input />
              ) : (
                <Input.TextArea disabled={saving} />
              )}
            </Form.Item>
          </Col>
        </Row>
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
        {taskTimeTracking && (
          <Row>
            <Col span={24}>
              {users.length > 0 && (
                <Typography.Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Time Tracking',
                  })}
                </Typography.Title>
              )}
              <Row>
                <Col flex={1}>
                  {users.map((user) => (
                    <Form.Item
                      colon
                      key={user.id}
                      label={user.name}
                      name={user.id}
                      required={false}
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please add a time for this user.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <InputNumber
                        addonAfter={intl.formatMessage({
                          defaultMessage: 'mins',
                        })}
                        disabled={saving}
                        min={0}
                      />
                    </Form.Item>
                  ))}
                </Col>
                {users.length > 0 && (
                  <Col>
                    <Typography.Paragraph
                      style={{ fontWeight: 600, marginBottom: 5 }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add Another User',
                      })}
                    </Typography.Paragraph>
                    <Select
                      disabled={saving}
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
                )}
              </Row>
            </Col>
          </Row>
        )}
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
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Save activity to be completed later.',
                })}
              >
                <Button
                  danger
                  disabled={saving}
                  htmlType="submit"
                  loading={saving}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Save Activity',
                  })}
                </Button>
              </Tooltip>
            </Col>
            {!completed && (
              <Col>
                <Button
                  // htmlType="submit"
                  disabled={saving}
                  loading={saving}
                  onClick={() =>
                    onSubmit({ ...form.getFieldsValue(), completed: true })
                  }
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Save & Complete',
                  })}
                </Button>
              </Col>
            )}
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        onClose={() => setAddQuestion(false)}
        open={addQuestion}
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        width="800"
      >
        {addQuestion ? (
          <CreateQuestionContainer
            ids={selectedIds}
            onClose={() => setAddQuestion(false)}
            update={update}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default EditTodo;
