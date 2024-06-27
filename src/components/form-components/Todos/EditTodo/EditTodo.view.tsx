import React from 'react';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import {
  Skeleton,
  Upload,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { SelectOptions, CustomQuestion } from 'types/DataType';
import { useIntl } from 'react-intl';
import { UploadOutlined } from '@ant-design/icons';
import type { FormData } from './useEditTodo';
import CreateQuestionContainer from '../../createQuestion/CreateQuestion.container';
import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import { useGroupsContext } from '#/context/groups-context';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  addQuestion: boolean;
  setAddQuestion: (value: boolean) => void;
  update: (id: string, question: string) => void;
  selectedIds?: string[];
  // setSelectedIds: (value: string[]) => void;
  // selectedQuestions: { id: string; question: string }[];
  // setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  form: FormInstance<FormData>;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  questions: CustomQuestion[];
  users: { id: string; name: string; timeTaken: number }[];
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  loading: boolean;
  // todoData: EditTodoQuery | undefined;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current.valueOf() < Date.now() - 3600 * 1000 * 24;

const EditTodo = ({
  onSubmit,
  onClose,
  saving,
  adminUsersData,
  usersLoading,
  addQuestion,
  setAddQuestion,
  update,
  selectedIds,
  // setSelectedIds,
  // selectedQuestions,
  // setSelectedQuestions,
  form,
  templatesLoading,
  templatesData,
  questions,
  users,
  setUsers,
  setAvailableUsers,
  availableUsers,
  documentList,
  documentUploadProps,
  loading,
}: // todoData,
Props): JSX.Element => {
  const intl = useIntl();
  const { groups, groupsLoading } = useGroupsContext();
  const completed = Form.useWatch('completed', form);

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        initialValues={{ assignedUsers: [] }}
      >
        <Row gutter={16}>
          <Col span={9}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a name for the new to-do.',
                  }),
                },
              ]}
            >
              {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="questionGroup"
              label={intl.formatMessage({
                defaultMessage: 'Activity Template',
              })}
            >
              <Select
                placeholder={intl.formatMessage({
                  defaultMessage: 'No template selected',
                })}
                disabled={saving}
                options={templatesData?.scheme?.questionGroups.map(
                  (template) => ({
                    label: template.name,
                    value: template.id,
                  })
                )}
                allowClear
                loading={templatesLoading}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="dueDate"
              label={intl.formatMessage({
                defaultMessage: 'Due Date',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a due date for the new to-do.',
                  }),
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
              name="assignedUsers"
              label={intl.formatMessage({
                defaultMessage: 'Assigned Users',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please selected at least one admin for the new to-do.',
                  }),
                },
              ]}
            >
              <Select
                loading={usersLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={adminUsersData}
                optionFilterProp="label"
                optionLabelProp="label"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="groups"
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for a user.',
                  }),
                },
              ]}
            >
              <Select
                loading={groupsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={groups}
                optionFilterProp="label"
                optionLabelProp="label"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              name="description"
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
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
          <CustomQuestions questions={questions} disabled={saving} />
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
                    label={user.name}
                    name={user.id}
                    colon
                    key={user.id}
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Please add a time for this user.',
                        }),
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      addonAfter={intl.formatMessage({
                        defaultMessage: 'mins',
                      })}
                      disabled={saving}
                    />
                  </Form.Item>
                ))}
              </Col>
              {users.length > 0 && (
                <Col>
                  <Typography.Paragraph
                    style={{ marginBottom: 5, fontWeight: 600 }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Another User',
                    })}
                  </Typography.Paragraph>
                  <Select
                    value={null}
                    style={{ width: 200 }}
                    options={availableUsers.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
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
                  />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Form.Item
          name="documents"
          label={intl.formatMessage({
            defaultMessage: 'Evidence',
          })}
        >
          <Upload
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...documentUploadProps}
            listType="picture"
            style={{ display: 'flex' }}
            fileList={documentList}
          >
            <Button icon={<UploadOutlined />}>
              {intl.formatMessage({
                defaultMessage: 'Upload Document',
              })}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
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
                  loading={saving}
                  htmlType="submit"
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
                  type="primary"
                  // htmlType="submit"
                  disabled={saving}
                  loading={saving}
                  onClick={() =>
                    onSubmit({ ...form.getFieldsValue(), completed: true })
                  }
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
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        open={addQuestion}
        width="800"
        onClose={() => setAddQuestion(false)}
      >
        {addQuestion ? (
          <CreateQuestionContainer
            onClose={() => setAddQuestion(false)}
            update={update}
            ids={selectedIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default EditTodo;
