import React from 'react';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import {
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
import type { FormData } from './useAddTodo';
import CreateQuestionContainer from '../../createQuestion/CreateQuestion.container';
import type { QuestionGroupOnSchemeQuery } from '../../../../graphql/generated';
import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import { useGroupsContext } from '#/context/groups-context';

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
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current.valueOf() < Date.now() - 3600 * 1000 * 24;

const AddTodo = ({
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
}: Props): JSX.Element => {
  const intl = useIntl();
  const { groups, groupsLoading } = useGroupsContext();

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
                id: 'HAlOn1',
                defaultMessage: 'Name',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: '5Ei/wg',
                    defaultMessage: 'Please enter a name for the new to-do.',
                  }),
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="questionGroup"
              label={intl.formatMessage({
                id: 'lOuJa8',
                defaultMessage: 'Activity Template',
              })}
            >
              <Select
                placeholder={intl.formatMessage({
                  id: 'C+ZsI4',
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
                id: '8XUukm',
                defaultMessage: 'Due Date',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'G4f9uY',
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
                id: '8oku8d',
                defaultMessage: 'Assigned Users',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: '/TfPy3',
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
                id: 'hzmswI',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for a user.',
                    id: '0h0TWW',
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
                id: 'Q8Qw5B',
                defaultMessage: 'Description',
              })}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        {questions && questions.length > 0 ? (
          <CustomQuestions questions={questions} disabled={saving} />
        ) : null}
        {/* <Row> */}
        {/*  <Col span={23}> */}
        {/*    <Form.Item */}
        {/*      name="questions" */}
        {/*      label={intl.formatMessage({ */}
        {/*        id: 'KV/9Hv', */}
        {/*        defaultMessage: 'Questions', */}
        {/*      })} */}
        {/*      style={{ marginBottom: 10 }} */}
        {/*    > */}
        {/*      {selectedQuestions.map((question) => ( */}
        {/*        <Row> */}
        {/*          <Col flex={1}> */}
        {/*            <p>{question.question}</p> */}
        {/*          </Col> */}
        {/*          <Col> */}
        {/*            <Button */}
        {/*              size="small" */}
        {/*              onClick={() => { */}
        {/*                setSelectedQuestions( */}
        {/*                  selectedQuestions.filter((q) => q.id !== question.id) */}
        {/*                ); */}
        {/*                setSelectedIds( */}
        {/*                  selectedIds?.filter((id) => id !== question.id) || [] */}
        {/*                ); */}
        {/*              }} */}
        {/*              icon={<FontAwesomeIcon icon={faTrash} />} */}
        {/*            /> */}
        {/*          </Col> */}
        {/*        </Row> */}
        {/*      ))} */}
        {/*    </Form.Item> */}
        {/*    <Row justify="end"> */}
        {/*      <Col> */}
        {/*        <Button size="small" onClick={() => setAddQuestion(true)}> */}
        {/*          {intl.formatMessage({ */}
        {/*            id: '7nSzTq', */}
        {/*            defaultMessage: 'Add Question', */}
        {/*          })} */}
        {/*        </Button> */}
        {/*      </Col> */}
        {/*    </Row> */}
        {/*  </Col> */}
        {/* </Row> */}

        <Row>
          <Col span={24}>
            {users.length > 0 && (
              <Typography.Title level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Time Tracking',
                  id: 'm1/6Jj',
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
                          id: 'VVl5Mn',
                        }),
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      addonAfter={intl.formatMessage({
                        defaultMessage: 'mins',
                        id: '6G3yvH',
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
                      id: 'sy3PlZ',
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
            id: '6g7+6N',
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
                id: 'Kc9MAV',
              })}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  id: '47FYwb',
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  id: 'KF4Xpe',
                  defaultMessage: 'Create activity to be completed later.',
                })}
              >
                <Button
                  danger
                  disabled={saving}
                  loading={saving}
                  onClick={() => onSubmit(form.getFieldsValue())}
                >
                  {intl.formatMessage({
                    id: '8RIxKm',
                    defaultMessage: 'Create Activity',
                  })}
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                {intl.formatMessage({
                  id: 'svLGby',
                  defaultMessage: 'Create & Complete',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
          id: '/vx2Ey',
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

export default AddTodo;
