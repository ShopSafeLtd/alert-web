import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { CustomQuestion, SelectOptions } from 'types/DataType';

// import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import { useGroupsContext } from '#/context/groups-context';
import CustomQuestions from '#/views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
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

interface Props {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  // setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  form: FormInstance<FormData>;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  // setSelectedIds: (value: string[]) => void;
  // selectedQuestions: { id: string; question: string }[];
  questions: CustomQuestion[];
  saving: boolean;
  selectedIds?: string[];
  setAddQuestion: (value: boolean) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  update: (id: string, question: string) => void;
  users: { id: string; name: string; timeTaken: number }[];
  usersLoading: boolean;
  // todoData: EditTodoQuery | undefined;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current.valueOf() < Date.now() - 3600 * 1000 * 24;

const EditTodo = ({
  addQuestion,
  adminUsersData,
  availableUsers,
  documentList,
  documentUploadProps,
  // setSelectedQuestions,
  form,
  loading,
  onClose,
  onSubmit,
  // setSelectedIds,
  // selectedQuestions,
  questions,
  saving,
  selectedIds,
  setAddQuestion,
  setAvailableUsers,
  setUsers,
  templatesData,
  templatesLoading,
  update,
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
              <DatePicker
                disabled={saving}
                disabledDate={disabledDate}
                style={{ width: '100%' }}
              />
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
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for a user.',
                  }),
                  required: true,
                },
              ]}
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
              name="businesses"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select one business for the activity.',
                  }),
                  required: true,
                },
              ]}
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
