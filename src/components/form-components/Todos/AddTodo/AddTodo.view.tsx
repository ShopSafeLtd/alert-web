import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { CustomQuestion, SelectOptions } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { UploadOutlined } from '@ant-design/icons';
import {
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
  Upload,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddTodo';

import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import BusinessesSelect from '../../BusinessesSelect/BusinessesSelect.view';
import CreateQuestionContainer from '../../createQuestion/CreateQuestion.container';

interface Props {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  businessId?: string;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  // setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  form: FormInstance<FormData>;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  // setSelectedIds: (value: string[]) => void;
  questions: CustomQuestion[];
  // selectedQuestions: { id: string; question: string }[];
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
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current.valueOf() < Date.now() - 3600 * 1000 * 24;

const AddTodo = ({
  addQuestion,
  adminUsersData,
  availableUsers,
  businessId,
  documentList,
  documentUploadProps,
  // setSelectedQuestions,
  form,
  onClose,
  onSubmit,
  // setSelectedIds,
  questions,
  // selectedQuestions,
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
}: Props): JSX.Element => {
  const intl = useIntl();
  const { groups, groupsLoading } = useGroupsContext();

  return (
    <>
      <Form
        form={form}
        initialValues={{ assignedUsers: [], business: businessId }}
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
              <Input disabled={saving} />
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
                      'Please select at least one group for the activity.',
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
                  required: !businessId,
                },
              ]}
            >
              <BusinessesSelect
                allowClear
                disabled={saving || !!businessId}
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
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        {questions && questions.length > 0 ? (
          <CustomQuestions disabled={saving} questions={questions} />
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
                    defaultMessage: 'Create Activity',
                  })}
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create & Complete',
                })}
              </Button>
            </Col>
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

export default AddTodo;
