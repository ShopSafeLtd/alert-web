/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  PageHeader,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import type { ListData } from '../../adminTodo/useActivities';
import ActivityTemplateForm from '../../../components/form-components/ActivityTemplate';
import type {
  FormData,
  LabelValue,
  OverUnder,
  Question,
  QuestionGroupData,
} from './useWorkflowForm';
import CreateQuestionContainer from '../../../components/form-components/createQuestion/CreateQuestion.container';
import Loading from '../../../components/shared-components/AntD/Loading';
import { AnswerType, IncidentPriority, Model } from 'graphql/types';

interface WorkflowProps {
  form: FormInstance<FormData>;
  onFinish: (formData: FormData) => void;
  tagsSelected: boolean;
  tags: { label: string; value: string }[];
  questions: Question[];
  taskQuestions: Question[];
  setSelectedActivity: (q: QuestionGroupData) => void;
  questionGroups: QuestionGroupData[];
  users: { label: string; value: string }[];
  valueSelected: boolean;
  questionsSelected: boolean;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  activityTemplateForm: boolean;
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  selectedQuestions: Question[];
  availableQuestions: Question[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
  newQuestion: boolean;
  createNewQuestion: (id: string, question: string) => void;
  groups: LabelValue[];
  loading: boolean;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  saving: boolean;
  lessThanSelected: boolean;
  modelSelected: Model | null | undefined;
  goodsTypeCheck: boolean;
  goods: { label: string; value: string }[];
  descriptionCheck: boolean;
  incidentTimeCountCheck: boolean;
  taskOutcome: boolean;
  sendEmailCheck: boolean;
  sendNotificationCheck: boolean;
}

const WorkflowView: React.FC<WorkflowProps> = ({
  onFinish,
  form,
  tagsSelected,
  questionGroups,
  taskQuestions,
  questionsSelected,
  questions,
  setSelectedActivity,
  tags,
  valueSelected,
  users,
  setSelectedQuestions,
  selectedQuestions,
  availableQuestions,
  setAvailableQuestions,
  setActivityTemplateForm,
  activityTemplateForm,
  updateTemplates,
  onClose,
  groups,
  createNewQuestion,
  newQuestion,
  loading,
  setNewQuestion,
  saving,
  modelSelected,
  lessThanSelected,
  goodsTypeCheck,
  goods,
  descriptionCheck,
  incidentTimeCountCheck,
  taskOutcome,
  sendEmailCheck,
  sendNotificationCheck,
}) => {
  const { id: editId } = useParams();
  const intl = useIntl();
  if (loading)
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
    );
  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={
          <Typography.Title level={3}>
            {editId
              ? intl.formatMessage({
                  defaultMessage: 'Edit Workflow',
                })
              : intl.formatMessage({
                  defaultMessage: 'Create Workflow',
                })}
          </Typography.Title>
        }
      />
      <div
        style={{
          padding: 8,
          paddingTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Form<FormData>
          form={form}
          onFinish={onFinish}
          layout="vertical"
          disabled={saving}
          style={{
            width: '75%',
          }}
        >
          <Card>
            <Form.Item
              label={<FormattedMessage defaultMessage="Name for workflow" />}
              name="name"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a name',
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected checks are present for the outcome to happen" />
              }
              name="option"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                },
              ]}
            >
              <Radio.Group
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
                optionType="button"
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Type of Workflow" />}
              name="workflowType"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                },
              ]}
            >
              <Radio.Group
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Incident',
                    }),
                    value: Model.Incident,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Offender',
                    }),
                    value: Model.Offender,
                  },
                ]}
                optionType="button"
              />
            </Form.Item>
          </Card>
          {modelSelected ? (
            <>
              <Divider />
              <Typography.Title level={3}>
                <FormattedMessage defaultMessage="Conditions" />
              </Typography.Title>
              {modelSelected === Model.Incident && (
                <>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Card
                        style={{
                          height: '100%',
                        }}
                      >
                        <Row>
                          <Col span={22}>
                            <Typography.Title
                              level={4}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Tags Check" />
                            </Typography.Title>
                          </Col>

                          <Col span={2}>
                            <Form.Item name="tags" valuePropName="checked">
                              <Checkbox />
                            </Form.Item>
                          </Col>
                        </Row>
                        {tagsSelected && (
                          <>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="If any or all the selected tags are present" />
                              }
                              name="tagMethod"
                              rules={[
                                {
                                  required: true,
                                  message: intl.formatMessage({
                                    defaultMessage: 'Please select an option',
                                  }),
                                },
                              ]}
                            >
                              <Radio.Group
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
                                optionType="button"
                              />
                            </Form.Item>
                            <Form.Item
                              label={<FormattedMessage defaultMessage="Tags" />}
                              name="tagOptions"
                            >
                              <Select
                                mode="tags"
                                options={tags}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </>
                        )}
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card
                        style={{
                          height: '100%',
                        }}
                      >
                        <Row>
                          <Col span={22}>
                            <Typography.Title
                              level={4}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Value Check" />
                            </Typography.Title>
                          </Col>

                          <Col span={2}>
                            <Form.Item
                              name="valueCheck"
                              valuePropName="checked"
                            >
                              <Checkbox />
                            </Form.Item>
                          </Col>
                        </Row>
                        {valueSelected && (
                          <Form.Item
                            label={
                              <FormattedMessage defaultMessage="If the total value of items is over" />
                            }
                            name="valuePrice"
                          >
                            <InputNumber
                              prefix="£"
                              min={0}
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        )}
                        <Row>
                          <Col span={22}>
                            <Typography.Title
                              level={4}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Lower Than Check" />
                            </Typography.Title>
                          </Col>

                          <Col span={2}>
                            <Form.Item
                              name="lessThanCheck"
                              valuePropName="checked"
                            >
                              <Checkbox />
                            </Form.Item>
                          </Col>
                        </Row>
                        {lessThanSelected && (
                          <Form.Item
                            label={
                              <FormattedMessage defaultMessage="If the total value of items is less than" />
                            }
                            name="lessThanPrice"
                          >
                            <InputNumber
                              prefix="£"
                              min={0}
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        )}
                      </Card>
                    </Col>
                  </Row>
                  <Row
                    gutter={[8, 8]}
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <Col span={12}>
                      <Card
                        style={{
                          height: '100%',
                        }}
                      >
                        <Row>
                          <Col span={22}>
                            <Typography.Title
                              level={4}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Goods Check" />
                            </Typography.Title>
                          </Col>

                          <Col span={2}>
                            <Form.Item
                              name="goodsTypeCheck"
                              valuePropName="checked"
                            >
                              <Checkbox />
                            </Form.Item>
                          </Col>
                        </Row>
                        {goodsTypeCheck && (
                          <>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="If any or all the selected goods types are present" />
                              }
                              name="goodsTypeCondition"
                              rules={[
                                {
                                  required: true,
                                  message: intl.formatMessage({
                                    defaultMessage: 'Please select an option',
                                  }),
                                },
                              ]}
                            >
                              <Radio.Group
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
                                optionType="button"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Goods" />
                              }
                              name="goodsType"
                            >
                              <Select
                                mode="tags"
                                options={goods}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </>
                        )}
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card
                        style={{
                          height: '100%',
                        }}
                      >
                        <Row>
                          <Col span={22}>
                            <Typography.Title
                              level={4}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Description" />
                            </Typography.Title>
                          </Col>

                          <Col span={2}>
                            <Form.Item
                              name="descriptionCheck"
                              valuePropName="checked"
                            >
                              <Checkbox />
                            </Form.Item>
                          </Col>
                        </Row>
                        {descriptionCheck && (
                          <>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="If any or all the selected words are present" />
                              }
                              name="descriptionCondition"
                              rules={[
                                {
                                  required: true,
                                  message: intl.formatMessage({
                                    defaultMessage: 'Please select an option',
                                  }),
                                },
                              ]}
                            >
                              <Radio.Group
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
                                optionType="button"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Words" />
                              }
                              name="descriptionWords"
                            >
                              <Select
                                mode="tags"
                                optionFilterProp="label"
                                dropdownStyle={{ display: 'none' }}
                              />
                            </Form.Item>
                          </>
                        )}
                      </Card>
                    </Col>
                  </Row>

                  <Row
                    gutter={[8, 8]}
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <Col span={24}>
                      <Card>
                        <Row>
                          <Col span={23}>
                            <Typography.Title
                              level={4}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Questions Check" />
                            </Typography.Title>
                          </Col>

                          <Col span={1}>
                            <Form.Item
                              name="questionChecked"
                              valuePropName="checked"
                            >
                              <Checkbox />
                            </Form.Item>
                          </Col>
                        </Row>
                        {questionsSelected && (
                          <>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="If any or all the selected questions are present and answered" />
                              }
                              name="questionMethod"
                              rules={[
                                {
                                  required: true,
                                  message: intl.formatMessage({
                                    defaultMessage: 'Please select an option',
                                  }),
                                },
                              ]}
                              style={{
                                width: '50%',
                              }}
                            >
                              <Radio.Group
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
                                optionType="button"
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Add question to check" />
                              }
                              name="qs"
                              style={{
                                width: '50%',
                              }}
                            >
                              <Col>
                                <Select
                                  placeholder={intl.formatMessage({
                                    defaultMessage:
                                      'Select a question from the list...',
                                  })}
                                  value={null}
                                  style={{ width: '100%' }}
                                  onChange={(value) => {
                                    const question = questions.find(
                                      ({ id }) => id === value
                                    );
                                    if (question) {
                                      setSelectedQuestions([
                                        ...selectedQuestions,
                                        question,
                                      ]);
                                    }
                                    setAvailableQuestions(
                                      availableQuestions.filter(
                                        ({ id }) => id !== value
                                      )
                                    );
                                  }}
                                  options={availableQuestions.map(
                                    ({ id, question }) => ({
                                      value: id,
                                      label: question,
                                    })
                                  )}
                                />
                              </Col>
                            </Form.Item>

                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Checked Questions" />
                              }
                              name="placeholder"
                            >
                              {selectedQuestions.map(
                                ({
                                  id,
                                  question,
                                  type,
                                  options,
                                  answer,
                                  overUnder,
                                }) => (
                                  <Row style={{ marginTop: 12 }}>
                                    <Col span={20}>
                                      <Typography.Text>
                                        {question}
                                      </Typography.Text>
                                      {type === AnswerType.Select && (
                                        <Select
                                          value={answer}
                                          mode="multiple"
                                          options={options.map(
                                            ({ label, value }) => ({
                                              value,
                                              label,
                                            })
                                          )}
                                          onChange={(
                                            value: string | string[]
                                          ) => {
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
                                        />
                                      )}
                                      {type === AnswerType.Boolean && (
                                        <div style={{ marginTop: 8 }}>
                                          <Radio.Group
                                            value={answer}
                                            onChange={(e) => {
                                              setSelectedQuestions(
                                                (prevState) =>
                                                  prevState.map((q) => {
                                                    if (q.id === id) {
                                                      return {
                                                        ...q,
                                                        answer: e.target
                                                          .value as string,
                                                      };
                                                    }
                                                    return q;
                                                  })
                                              );
                                            }}
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
                                            optionType="button"
                                          />
                                        </div>
                                      )}
                                      {type === AnswerType.Number && (
                                        <div style={{ marginTop: 8 }}>
                                          <InputNumber
                                            value={
                                              Array.isArray(answer)
                                                ? answer[0]
                                                : answer || 0
                                            }
                                            onChange={(
                                              value: string | number | null
                                            ) => {
                                              setSelectedQuestions(
                                                (prevState) =>
                                                  prevState.map((q) => {
                                                    if (q.id === id && value) {
                                                      return {
                                                        ...q,
                                                        answer:
                                                          typeof value ===
                                                          'number'
                                                            ? value.toString()
                                                            : value,
                                                      };
                                                    }
                                                    return q;
                                                  })
                                              );
                                            }}
                                            min={0}
                                            style={{ width: '50%' }}
                                          />
                                          <Radio.Group
                                            value={overUnder}
                                            onChange={(e) => {
                                              setSelectedQuestions(
                                                (prevState) =>
                                                  prevState.map((q) => {
                                                    if (q.id === id) {
                                                      return {
                                                        ...q,
                                                        overUnder: e.target
                                                          .value as OverUnder,
                                                      };
                                                    }
                                                    return q;
                                                  })
                                              );
                                            }}
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
                                            optionType="button"
                                          />
                                        </div>
                                      )}
                                      {type !== AnswerType.Select &&
                                        type !== AnswerType.Boolean &&
                                        type !== AnswerType.Number && (
                                          <Input
                                            value={answer}
                                            onChange={(e) => {
                                              setSelectedQuestions(
                                                (prevState) =>
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
                                          />
                                        )}
                                    </Col>
                                    <Col
                                      span={2}
                                      offset={1}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Button
                                        onClick={() => {
                                          const q = selectedQuestions.find(
                                            ({ id: qid }) => id === qid
                                          );
                                          if (q) {
                                            setAvailableQuestions([
                                              ...availableQuestions,
                                              q,
                                            ]);
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
                          </>
                        )}
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
              {modelSelected === Model.Offender && (
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Card
                      style={{
                        height: '100%',
                      }}
                    >
                      <Row>
                        <Col span={22}>
                          <Typography.Title
                            level={4}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              paddingTop: 8,
                            }}
                          >
                            <FormattedMessage defaultMessage="No. of Offences in X days" />
                          </Typography.Title>
                        </Col>

                        <Col span={2}>
                          <Form.Item
                            name="incidentTimeCountCheck"
                            valuePropName="checked"
                          >
                            <Checkbox />
                          </Form.Item>
                        </Col>
                      </Row>
                      {incidentTimeCountCheck && (
                        <>
                          <Form.Item
                            label={
                              <FormattedMessage defaultMessage="No. of days" />
                            }
                            name="incidentTimeCountDays"
                            rules={[
                              {
                                required: true,
                                message: intl.formatMessage({
                                  defaultMessage: 'Please select an option',
                                }),
                              },
                            ]}
                            initialValue={1}
                          >
                            <InputNumber min={1} />
                          </Form.Item>
                          <Form.Item
                            label={
                              <FormattedMessage defaultMessage="No. of incidents" />
                            }
                            initialValue={1}
                            name="incidentTimeCountIncidents"
                            rules={[
                              {
                                required: true,
                                message: intl.formatMessage({
                                  defaultMessage: 'Please select an option',
                                }),
                              },
                            ]}
                          >
                            <InputNumber min={1} />
                          </Form.Item>
                        </>
                      )}
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      style={{
                        height: '100%',
                      }}
                    >
                      <Row>
                        <Col span={22}>
                          <Typography.Title
                            level={4}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              paddingTop: 8,
                            }}
                          >
                            <FormattedMessage defaultMessage="Offense while banned" />
                          </Typography.Title>
                          <Typography.Paragraph
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <FormattedMessage
                              defaultMessage="Triggers when an incident happens ?
"
                            />
                          </Typography.Paragraph>
                        </Col>

                        <Col span={2}>
                          <Form.Item
                            name="incidentWhileBanCheck"
                            valuePropName="checked"
                          >
                            <Checkbox />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              )}
              <Divider style={{ marginTop: 10 }} />
              <Typography.Title level={3}>
                <FormattedMessage defaultMessage="Outcomes" />
              </Typography.Title>
              {/* Outcomes */}
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Card>
                    <Row>
                      <Col span={22}>
                        <Typography.Title
                          level={4}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: 8,
                          }}
                        >
                          <FormattedMessage defaultMessage="Create Activity" />
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <FormattedMessage
                            defaultMessage="What activity to create when the above conditions are met?
"
                          />
                        </Typography.Paragraph>
                      </Col>

                      <Col span={2}>
                        <Form.Item name="taskOutcome" valuePropName="checked">
                          <Checkbox />
                        </Form.Item>
                      </Col>
                    </Row>
                    {taskOutcome && (
                      <>
                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Select an activity template" />
                          }
                          name="selectedGroup"
                        >
                          <Row gutter={[8, 8]}>
                            <Col span={20}>
                              <Select
                                onSelect={(value) => {
                                  const activity = questionGroups.find(
                                    ({ id }) => id === value
                                  );
                                  if (activity) {
                                    setSelectedActivity(activity);
                                    form.setFieldsValue({
                                      taskName: activity.name,
                                      taskDescription: activity.description,
                                      taskDueDays: activity.defaultDueDays,
                                      taskQuestions: activity.questions.map(
                                        ({ id }) => id
                                      ),
                                    });
                                  }
                                }}
                                options={questionGroups.map(({ id, name }) => ({
                                  value: id,
                                  label: name,
                                }))}
                              />
                            </Col>
                            <Col>
                              <Button
                                onClick={() => setActivityTemplateForm(true)}
                              >
                                <FormattedMessage defaultMessage="New Template" />
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                        <Form.Item
                          label={<FormattedMessage defaultMessage="Name" />}
                          name="taskName"
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Default due days" />
                          }
                          name="taskDueDays"
                        >
                          <InputNumber min={0} />
                        </Form.Item>

                        <Row gutter={[8, 8]}>
                          <Col span={20}>
                            <Form.Item
                              name="taskQuestions"
                              label={
                                <FormattedMessage defaultMessage="Questions" />
                              }
                            >
                              <Select
                                mode="multiple"
                                maxTagCount="responsive"
                                options={taskQuestions.map(
                                  ({ id, question }) => ({
                                    value: id,
                                    label: question,
                                  })
                                )}
                              />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              name=""
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                              label=" "
                            >
                              <Button
                                style={{ paddingBottom: 24 }}
                                onClick={() => setNewQuestion(true)}
                              >
                                <FormattedMessage defaultMessage="New Question" />
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={[8, 8]}>
                          <Col span={12}>
                            <Form.Item
                              name="assigneeGroups"
                              label={
                                <FormattedMessage defaultMessage="Select groups to get users from" />
                              }
                            >
                              <Select
                                mode="multiple"
                                options={groups}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="taskAssignee"
                              label={
                                <FormattedMessage defaultMessage="Additional users to create activity for" />
                              }
                            >
                              <Select
                                mode="multiple"
                                options={users}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Card>
                </Col>

                <Col span={24}>
                  <Card>
                    <Row>
                      <Col span={22}>
                        <Typography.Title
                          level={4}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: 8,
                          }}
                        >
                          <FormattedMessage defaultMessage="Create Notification" />
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <FormattedMessage
                            defaultMessage="What notification to create when the above conditions are met?
"
                          />
                        </Typography.Paragraph>
                      </Col>

                      <Col span={2}>
                        <Form.Item
                          name="sendNotificationCheck"
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                      </Col>
                    </Row>
                    {sendNotificationCheck && (
                      <>
                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Notification Title" />
                          }
                          name="sendNotificationTitle"
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Notification text" />
                          }
                          name="sendNotificationMessage"
                        >
                          <Input.TextArea />
                        </Form.Item>

                        <Row gutter={[8, 8]}>
                          <Col span={12}>
                            <Form.Item
                              name="sendNotificationUsers"
                              label={
                                <FormattedMessage defaultMessage="Additional users to send notification to. If none selected will use scheme users" />
                              }
                            >
                              <Select
                                mode="multiple"
                                options={users}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Card>
                </Col>

                <Col span={24}>
                  <Card>
                    <Row>
                      <Col span={22}>
                        <Typography.Title
                          level={4}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: 8,
                          }}
                        >
                          <FormattedMessage defaultMessage="Create Email" />
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <FormattedMessage
                            defaultMessage="What email to create when the above conditions are met?
"
                          />
                        </Typography.Paragraph>
                      </Col>

                      <Col span={2}>
                        <Form.Item
                          name="sendEmailCheck"
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                      </Col>
                    </Row>
                    {sendEmailCheck && (
                      <>
                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Email Subject" />
                          }
                          name="sendEmailTitle"
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Email body text" />
                          }
                          name="sendEmailMessage"
                        >
                          <Input.TextArea />
                        </Form.Item>

                        <Row gutter={[8, 8]}>
                          <Col span={12}>
                            <Form.Item
                              name="sendEmailUsers"
                              label={
                                <FormattedMessage defaultMessage="Additional users to send email to" />
                              }
                            >
                              <Select
                                mode="multiple"
                                options={users}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Card>
                </Col>
                {modelSelected === Model.Incident && (
                  <Col span={24}>
                    <Card
                      title={intl.formatMessage({
                        defaultMessage: 'Update Incident',
                      })}
                    >
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          <Form.Item
                            label={
                              <FormattedMessage defaultMessage="Select an priority to set the incident to" />
                            }
                            name="setPriority"
                          >
                            <Select
                              options={Object.keys(IncidentPriority).map(
                                (key) => ({
                                  value: key,
                                  label: key,
                                })
                              )}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label={
                          <FormattedMessage defaultMessage="Auto Approve incident?" />
                        }
                        valuePropName="checked"
                        name="autoApprove"
                      >
                        <Checkbox />
                      </Form.Item>
                    </Card>
                  </Col>
                )}
              </Row>
            </>
          ) : null}
          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={16} justify="end">
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Back',
                  })}
                </Button>
              </Col>
              <Col>
                <Button disabled={saving} type="primary" htmlType="submit">
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Drawer
          title={intl.formatMessage({
            defaultMessage: 'Create Activity Template',
          })}
          open={activityTemplateForm}
          width={800}
          onClose={() => onClose()}
        >
          {activityTemplateForm ? (
            <ActivityTemplateForm
              update={updateTemplates}
              onClose={() => onClose()}
              initData={undefined}
              id={undefined}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          title={intl.formatMessage({
            defaultMessage: 'Add/Create Question',
          })}
          open={newQuestion}
          width="800"
          onClose={() => onClose()}
        >
          {newQuestion ? (
            <CreateQuestionContainer
              onClose={() => onClose()}
              update={createNewQuestion}
              ids={taskQuestions.map(({ id }) => id)}
            />
          ) : (
            <div />
          )}
        </Drawer>
      </div>
    </>
  );
};

export default WorkflowView;
