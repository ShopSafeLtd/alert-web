import type { WorkflowProps } from '#/views/workflows/ViewWorkflow/Workflow.view';

import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { AnswerType } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { OverUnder } from '../useWorkflowForm';

type PickedBase = Pick<
  WorkflowProps,
  | 'activityClosedSelected'
  | 'activityCompletedBySelected'
  | 'activityOverdueSelected'
  | 'activityRaisedBySelected'
  | 'availableQuestions'
  | 'form'
  | 'questionsSelected'
  | 'selectedQuestions'
  | 'setAvailableQuestions'
  | 'setSelectedQuestions'
  | 'taskQuestions'
>;

type TodoConditionsProps = {
  classes: { cardBody: string };
} & PickedBase;

const TodoConditions: React.FC<TodoConditionsProps> = ({
  activityClosedSelected,
  activityCompletedBySelected,
  activityOverdueSelected,
  activityRaisedBySelected,
  availableQuestions,
  classes,
  form,
  questionsSelected,
  selectedQuestions,
  setAvailableQuestions,
  setSelectedQuestions,
  taskQuestions,
}) => {
  const intl = useIntl();

  return (
    <>
      {/* Activity Closed Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Activity Closed" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Trigger workflow when the activity has been closed." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="activityClosedCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {activityClosedSelected && (
          <div className={classes.cardBody}>
            <Form.Item name="activityClosed" valuePropName="checked">
              <Switch
                checkedChildren={intl.formatMessage({
                  defaultMessage: 'Closed',
                })}
                unCheckedChildren={intl.formatMessage({
                  defaultMessage: 'Not Closed',
                })}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Activity Raised By Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Activity Raised By" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Trigger workflow when activity is raised by specific users or roles." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="activityRaisedByCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {activityRaisedBySelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all selected users/roles" />
              }
              name="activityRaisedByCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Any' }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'All' }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Users" />}
              name="activityRaisedByUsers"
            >
              <UsersSelect
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select users',
                })}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Roles" />}
              name="activityRaisedByRoles"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select at least one user or role',
                  }),
                  validator: (_: unknown, value: string[]) => {
                    const users = form.getFieldValue(
                      'activityRaisedByUsers'
                    ) as string[];
                    if (
                      (!users || users.length === 0) &&
                      (!value || value.length === 0)
                    ) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <RolesSelect
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select roles',
                })}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Activity Completed By Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Activity Completed By" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Trigger workflow when activity is completed by specific users or roles." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="activityCompletedByCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {activityCompletedBySelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all selected users/roles" />
              }
              name="activityCompletedByCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Any' }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'All' }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Users" />}
              name="activityCompletedByUsers"
            >
              <UsersSelect
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select users',
                })}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Roles" />}
              name="activityCompletedByRoles"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select at least one user or role',
                  }),
                  validator: (_: unknown, value: string[]) => {
                    const users = form.getFieldValue(
                      'activityCompletedByUsers'
                    ) as string[];
                    if (
                      (!users || users.length === 0) &&
                      (!value || value.length === 0)
                    ) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <RolesSelect
                mode="multiple"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select roles',
                })}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Activity Overdue Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Activity Overdue" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Trigger workflow when the activity is overdue." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="activityOverdueCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {activityOverdueSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              initialValue={true}
              label={
                <FormattedMessage defaultMessage="Match activities that are:" />
              }
              name="activityOverdue"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Overdue',
                    }),
                    value: true,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Not Overdue',
                    }),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
            <Typography.Text
              style={{ display: 'block', marginTop: -16 }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Overdue: Activities past their due date. Not Overdue: Activities on time or with no due date." />
            </Typography.Text>
          </div>
        )}
      </div>

      {/* Existing Question Answers Condition */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Question Answers" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow custom questions on the activity has specified answers." />
            </Typography.Text>
          </Col>
          <Col>
            <Form.Item name="questionChecked" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {questionsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected questions are present and answered" />
              }
              name="questionMethod"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="Select a question to check" />
              }
              name="qs"
              style={{ width: '50%' }}
            >
              <Col>
                <Select
                  onChange={(value) => {
                    const question = taskQuestions.find(
                      ({ id }) => id === value
                    );
                    if (question) {
                      setSelectedQuestions([...selectedQuestions, question]);
                    }
                    setAvailableQuestions(
                      availableQuestions.filter(({ id }) => id !== value)
                    );
                  }}
                  options={availableQuestions.map(({ id, question }) => ({
                    label: question,
                    value: id,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select a question from the list...',
                  })}
                  style={{ width: '100%' }}
                  value={null}
                />
              </Col>
            </Form.Item>
            {selectedQuestions && selectedQuestions.length > 0 && (
              <Form.Item
                label={<FormattedMessage defaultMessage="Checked Questions" />}
                name="placeholder"
              >
                {selectedQuestions.map(
                  ({ answer, id, options, overUnder, question, type }) => (
                    <Row
                      align="bottom"
                      gutter={8}
                      key={id}
                      style={{ marginTop: 12 }}
                      wrap={false}
                    >
                      <Col flex={1}>
                        <Typography.Text>{question}</Typography.Text>
                        {(type === AnswerType.Select ||
                          type === AnswerType.SelectSingle) && (
                          <Select
                            mode="multiple"
                            onChange={(value: string | string[]) => {
                              setSelectedQuestions((prevState) =>
                                prevState.map((q) => {
                                  if (q.id === id) {
                                    return {
                                      ...q,
                                      answer: value,
                                    };
                                  }
                                  return q;
                                })
                              );
                            }}
                            options={options.map(({ label, value }) => ({
                              label,
                              value,
                            }))}
                            value={answer}
                          />
                        )}
                        {type === AnswerType.Boolean && (
                          <div style={{ marginTop: 8 }}>
                            <Radio.Group
                              onChange={(e) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id) {
                                      return {
                                        ...q,
                                        answer: e.target.value as string,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              optionType="button"
                              options={[
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'Yes',
                                  }),
                                  value: 'true',
                                },
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'No',
                                  }),
                                  value: 'false',
                                },
                              ]}
                              value={answer}
                            />
                          </div>
                        )}
                        {type === AnswerType.Number && (
                          <div style={{ marginTop: 8 }}>
                            <InputNumber
                              min={0}
                              onChange={(value: null | number | string) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id && value) {
                                      return {
                                        ...q,
                                        answer:
                                          typeof value === 'number'
                                            ? value.toString()
                                            : value,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              style={{ width: '50%' }}
                              value={
                                Array.isArray(answer) ? answer[0] : answer || 0
                              }
                            />
                            <Radio.Group
                              onChange={(e) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id) {
                                      return {
                                        ...q,
                                        overUnder: e.target.value as OverUnder,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              optionType="button"
                              options={[
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'Over',
                                  }),
                                  value: 'over',
                                },
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'Under',
                                  }),
                                  value: 'under',
                                },
                              ]}
                              value={overUnder}
                            />
                          </div>
                        )}
                        {type !== AnswerType.Select &&
                          type !== AnswerType.SelectSingle &&
                          type !== AnswerType.Boolean &&
                          type !== AnswerType.Number && (
                            <Input
                              onChange={(e) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id) {
                                      return {
                                        ...q,
                                        answer: e.target.value,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              value={answer}
                            />
                          )}
                      </Col>
                      <Col
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Button
                          onClick={() => {
                            const q = selectedQuestions.find(
                              ({ id: qid }) => id === qid
                            );
                            if (q) {
                              setAvailableQuestions([...availableQuestions, q]);
                            }
                            setSelectedQuestions(
                              selectedQuestions.filter(
                                ({ id: qid }) => id !== qid
                              )
                            );
                          }}
                        >
                          <FormattedMessage defaultMessage="Remove" />
                        </Button>
                      </Col>
                    </Row>
                  )
                )}
              </Form.Item>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoConditions;
