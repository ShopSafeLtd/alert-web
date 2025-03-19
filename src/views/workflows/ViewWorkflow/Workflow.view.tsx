/* eslint-disable @typescript-eslint/naming-convention */
import type { FormInstance } from 'antd';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import UsersManySelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import DatePicker from '#/components/util-components/DatePicker';
import { useStoreState } from '#/state';
import {
  Button,
  Card,
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
  Switch,
  Typography,
} from 'antd';
import { AnswerType, CronSchedule, Model } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import type { ListData } from '../../adminTodo/useActivities';
import type {
  FormData,
  LabelValue,
  OverUnder,
  Question,
  QuestionGroupData,
} from './useWorkflowForm';

import ActivityTemplateForm from '../../../components/form-components/ActivityTemplate';
import CreateQuestionContainer from '../../../components/form-components/createQuestion/CreateQuestion.container';
import Loading from '../../../components/shared-components/AntD/Loading';

interface WorkflowProps {
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  createNewQuestion: (id: string, question: string) => void;
  descriptionCheck: boolean;
  form: FormInstance<FormData>;
  goods: { label: string; value: string }[];
  goodsTypeCheck: boolean;
  groups: LabelValue[];
  incidentTimeCountCheck: boolean;
  lessThanSelected: boolean;
  loading: boolean;
  modelSelected: Model | null | undefined;
  newQuestion: boolean;
  onClose: () => void;
  onFinish: (formData: FormData) => void;
  questionGroups: QuestionGroupData[];
  questions: Question[];
  questionsSelected: boolean;
  saving: boolean;
  selectedQuestions: Question[];
  sendEmailCheck: boolean;
  sendNotificationCheck: boolean;
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedActivity: (q: QuestionGroupData) => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  tags: { label: string; value: string }[];
  tagsSelected: boolean;
  taskOutcome: boolean;
  taskQuestions: Question[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
  valueSelected: boolean;
}

const WorkflowView: React.FC<WorkflowProps> = ({
  activityTemplateForm,
  availableQuestions,
  createNewQuestion,
  descriptionCheck,
  form,
  goods,
  goodsTypeCheck,
  groups,
  incidentTimeCountCheck,
  lessThanSelected,
  loading,
  modelSelected,
  newQuestion,
  onClose,
  onFinish,
  questionGroups,
  questions,
  questionsSelected,
  saving,
  selectedQuestions,
  sendEmailCheck,
  sendNotificationCheck,
  setActivityTemplateForm,
  setAvailableQuestions,
  setNewQuestion,
  setSelectedActivity,
  setSelectedQuestions,
  tags,
  tagsSelected,
  taskOutcome,
  taskQuestions,
  updateTemplates,
  valueSelected,
}) => {
  const { id: editId } = useParams();
  const intl = useIntl();

  const typeWatch = Form.useWatch('workflowMode', form);
  const workflowTypeWatch = Form.useWatch('workflowType', form);
  const schemeId = useStoreState((state) => state.scheme.id);

  if (loading)
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
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
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: 8,
          paddingTop: 0,
        }}
      >
        <Form<FormData>
          disabled={saving}
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a name',
                  }),
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Workflow Mode' })}
              name="workflowMode"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select workflow mode',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => {
                  if (e.target.value === 'scheduled') {
                    form.setFieldsValue({ workflowType: Model.Cron });
                  } else {
                    form.setFieldsValue({ workflowType: undefined });
                  }
                }}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Trigger' }),
                    value: 'trigger',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Scheduled' }),
                    value: 'scheduled',
                  },
                ]}
              />
            </Form.Item>
            {typeWatch === 'trigger' && (
              <Form.Item
                label={<FormattedMessage defaultMessage="Type of Workflow" />}
                name="workflowType"
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
                />
              </Form.Item>
            )}
          </Card>
          {typeWatch === 'scheduled' ? (
            <>
              <Divider />
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Frequency' })}
                name="frequency"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select a frequency',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Every Day',
                      }),
                      value: CronSchedule.EveryDay,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Every Month',
                      }),
                      value: CronSchedule.EveryMonth,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Every Year',
                      }),
                      value: CronSchedule.EveryYear,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                extra={intl.formatMessage({
                  defaultMessage: 'Select the date when the cron should start',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Cron Start Date',
                })}
                name="cronDate"
              >
                <DatePicker
                  defaultValue={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                  }
                />
              </Form.Item>
            </>
          ) : modelSelected ? (
            <>
              <Divider />
              <Typography.Title level={3}>
                <FormattedMessage defaultMessage="Conditions" />
              </Typography.Title>
              <Form.Item
                label={
                  <FormattedMessage defaultMessage="If any or all the selected checks are present for the outcome to happen" />
                }
                name="option"
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
                                alignItems: 'center',
                                display: 'flex',
                                paddingTop: 8,
                              }}
                            >
                              <FormattedMessage defaultMessage="Tags Check" />
                            </Typography.Title>
                          </Col>
                          <Col span={2}>
                            <Form.Item name="tags" valuePropName="checked">
                              <Switch />
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
                              label={<FormattedMessage defaultMessage="Tags" />}
                              name="tagOptions"
                            >
                              <Select
                                mode="tags"
                                optionFilterProp="label"
                                options={tags}
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
                                alignItems: 'center',
                                display: 'flex',
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
                              <Switch />
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
                              min={0}
                              prefix="£"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        )}
                        <Row>
                          <Col span={22}>
                            <Typography.Title
                              level={4}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
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
                              <Switch />
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
                              min={0}
                              prefix="£"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        )}
                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
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
                                alignItems: 'center',
                                display: 'flex',
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
                              <Switch />
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
                                <FormattedMessage defaultMessage="Goods" />
                              }
                              name="goodsType"
                            >
                              <Select
                                mode="tags"
                                optionFilterProp="label"
                                options={goods}
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
                                alignItems: 'center',
                                display: 'flex',
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
                              <Switch />
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
                                <FormattedMessage defaultMessage="Words" />
                              }
                              name="descriptionWords"
                            >
                              <Select
                                dropdownStyle={{ display: 'none' }}
                                mode="tags"
                                optionFilterProp="label"
                              />
                            </Form.Item>
                          </>
                        )}
                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                    <Col span={24}>
                      <Card>
                        <Row>
                          <Col span={23}>
                            <Typography.Title
                              level={4}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
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
                              <Switch />
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
                                  message: intl.formatMessage({
                                    defaultMessage: 'Please select an option',
                                  }),
                                  required: true,
                                },
                              ]}
                              style={{ width: '50%' }}
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
                                <FormattedMessage defaultMessage="Add question to check" />
                              }
                              name="qs"
                              style={{ width: '50%' }}
                            >
                              <Col>
                                <Select
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
                                      label: question,
                                      value: id,
                                    })
                                  )}
                                  placeholder={intl.formatMessage({
                                    defaultMessage:
                                      'Select a question from the list...',
                                  })}
                                  style={{ width: '100%' }}
                                  value={null}
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
                                  answer,
                                  id,
                                  options,
                                  overUnder,
                                  question,
                                  type,
                                }) => (
                                  <Row key={id} style={{ marginTop: 12 }}>
                                    <Col span={20}>
                                      <Typography.Text>
                                        {question}
                                      </Typography.Text>
                                      {type === AnswerType.Select && (
                                        <Select
                                          mode="multiple"
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
                                          options={options.map(
                                            ({ label, value }) => ({
                                              label,
                                              value,
                                            })
                                          )}
                                          value={answer}
                                        />
                                      )}
                                      {type === AnswerType.Boolean && (
                                        <div style={{ marginTop: 8 }}>
                                          <Radio.Group
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
                                            onChange={(
                                              value: null | number | string
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
                                            style={{ width: '50%' }}
                                            value={
                                              Array.isArray(answer)
                                                ? answer[0]
                                                : answer || 0
                                            }
                                          />
                                          <Radio.Group
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
                                        type !== AnswerType.Boolean &&
                                        type !== AnswerType.Number && (
                                          <Input
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
                                            value={answer}
                                          />
                                        )}
                                    </Col>
                                    <Col
                                      offset={1}
                                      span={2}
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
                              alignItems: 'center',
                              display: 'flex',
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
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                      {incidentTimeCountCheck && (
                        <>
                          <Form.Item
                            initialValue={1}
                            label={
                              <FormattedMessage defaultMessage="No. of days" />
                            }
                            name="incidentTimeCountDays"
                            rules={[
                              {
                                message: intl.formatMessage({
                                  defaultMessage: 'Please select an option',
                                }),
                                required: true,
                              },
                            ]}
                          >
                            <InputNumber min={1} />
                          </Form.Item>
                          <Form.Item
                            initialValue={1}
                            label={
                              <FormattedMessage defaultMessage="No. of incidents" />
                            }
                            name="incidentTimeCountIncidents"
                            rules={[
                              {
                                message: intl.formatMessage({
                                  defaultMessage: 'Please select an option',
                                }),
                                required: true,
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
                              alignItems: 'center',
                              display: 'flex',
                              paddingTop: 8,
                            }}
                          >
                            <FormattedMessage defaultMessage="Offense while banned" />
                          </Typography.Title>
                          <Typography.Paragraph
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            <FormattedMessage defaultMessage="Triggers when an incident happens ?" />
                          </Typography.Paragraph>
                        </Col>
                        <Col span={2}>
                          <Form.Item
                            name="incidentWhileBanCheck"
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              )}
            </>
          ) : null}
          <Divider style={{ marginTop: 10 }} />
          <Typography.Title level={3}>
            <FormattedMessage defaultMessage="Outcomes" />
          </Typography.Title>

          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Card>
                <Typography.Title level={4}>
                  <FormattedMessage defaultMessage="User Management" />
                </Typography.Title>
                <Typography.Text type="secondary">
                  <FormattedMessage defaultMessage="Select users, roles, and groups to be assigned to the outcomes. Created events will use users from the selected roles/groups as well as any specific users selected" />
                </Typography.Text>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Specefic Users" />}
                  name="userManagementUsers"
                  tooltip={
                    <FormattedMessage defaultMessage="Select users to be assigned to the outcomes" />
                  }
                >
                  <UsersManySelect
                    allowClear
                    disabled={saving}
                    mode={'multiple'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a user...',
                    })}
                    showSearch
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Roles" />}
                  name="userManagementRoles"
                >
                  <RoleSelect multi schemeId={schemeId} />
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Groups" />}
                  name="userManagementGroups"
                >
                  <Select
                    mode="multiple"
                    optionFilterProp="label"
                    options={groups}
                  />
                </Form.Item>
                {typeWatch !== 'scheduled' && (
                  <Form.Item name="useDynamicGroups" valuePropName="checked">
                    <Switch>
                      {workflowTypeWatch === Model.Incident
                        ? intl.formatMessage({
                            defaultMessage: 'Use Incident groups',
                          })
                        : intl.formatMessage({
                            defaultMessage: 'Use Offender groups',
                          })}
                    </Switch>
                  </Form.Item>
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
                        alignItems: 'center',
                        display: 'flex',
                        paddingTop: 8,
                      }}
                    >
                      <FormattedMessage defaultMessage="Create Activity" />
                    </Typography.Title>
                    <Typography.Paragraph
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <FormattedMessage defaultMessage="What activity to create when the above conditions are met?" />
                    </Typography.Paragraph>
                  </Col>
                  <Col span={2}>
                    <Form.Item name="taskOutcome" valuePropName="checked">
                      <Switch />
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
                                  taskDescription: activity.description,
                                  taskDueDays: activity.defaultDueDays,
                                  taskName: activity.name,
                                  taskQuestions: activity.questions.map(
                                    ({ id }) => id
                                  ),
                                });
                              }
                            }}
                            options={questionGroups.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))}
                          />
                        </Col>
                        <Col>
                          <Button onClick={() => setActivityTemplateForm(true)}>
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
                    <Form.Item
                      label={<FormattedMessage defaultMessage="Business" />}
                      name="taskBusiness"
                    >
                      <BusinessesSelect
                        allowClear
                        disabled={saving}
                        mode={'multiple'}
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Search for a business...',
                        })}
                        showSearch
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <Row gutter={[8, 8]}>
                      <Col span={20}>
                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Questions" />
                          }
                          name="taskQuestions"
                        >
                          <Select
                            maxTagCount="responsive"
                            mode="multiple"
                            options={taskQuestions.map(({ id, question }) => ({
                              label: question,
                              value: id,
                            }))}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        <Form.Item label=" " name="">
                          <Button
                            onClick={() => setNewQuestion(true)}
                            style={{ paddingBottom: 24 }}
                          >
                            <FormattedMessage defaultMessage="New Question" />
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )}
              </Card>
            </Col>
            {typeWatch === 'trigger' && (
              <>
                <Col span={24}>
                  <Card>
                    <Row>
                      <Col span={22}>
                        <Typography.Title
                          level={4}
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                            paddingTop: 8,
                          }}
                        >
                          <FormattedMessage defaultMessage="Create Notification" />
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <FormattedMessage defaultMessage="What notification to create when the above conditions are met?" />
                        </Typography.Paragraph>
                      </Col>
                      <Col span={2}>
                        <Form.Item
                          name="sendNotificationCheck"
                          valuePropName="checked"
                        >
                          <Switch />
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
                            alignItems: 'center',
                            display: 'flex',
                            paddingTop: 8,
                          }}
                        >
                          <FormattedMessage defaultMessage="Create Email" />
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <FormattedMessage defaultMessage="What email to create when the above conditions are met?" />
                        </Typography.Paragraph>
                      </Col>
                      <Col span={2}>
                        <Form.Item
                          name="sendEmailCheck"
                          valuePropName="checked"
                        >
                          <Switch />
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
                      </>
                    )}
                  </Card>
                </Col>
              </>
            )}
          </Row>
          <Form.Item>
            <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Back',
                  })}
                </Button>
              </Col>
              <Col>
                <Button disabled={saving} htmlType="submit" type="primary">
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Drawer
          onClose={() => onClose()}
          open={activityTemplateForm}
          title={intl.formatMessage({
            defaultMessage: 'Create Activity Template',
          })}
          width={800}
        >
          {activityTemplateForm ? (
            <ActivityTemplateForm
              id={undefined}
              initData={undefined}
              onClose={() => onClose()}
              update={updateTemplates}
            />
          ) : (
            <div />
          )}
        </Drawer>
        <Drawer
          onClose={() => onClose()}
          open={newQuestion}
          title={intl.formatMessage({
            defaultMessage: 'Add/Create Question',
          })}
          width="800"
        >
          {newQuestion ? (
            <CreateQuestionContainer
              ids={taskQuestions.map(({ id }) => id)}
              onClose={() => onClose()}
              update={createNewQuestion}
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
