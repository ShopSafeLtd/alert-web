/* eslint-disable @typescript-eslint/naming-convention */
import type { Theme } from '#/configs/ThemeConfig';
import type { FormInstance } from 'antd';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import UsersManySelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import DatePicker from '#/components/util-components/DatePicker';
import {
  currencySymbolAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import {
  AnswerType,
  CronSchedule,
  IncidentPriority,
  Model,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

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

interface ListData {
  defaultDueDays: number;
  description: string;
  id: string;
  name: string;
  questions: {
    id: string;
    question: string;
  }[];
}

interface WorkflowProps {
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  createNewQuestion: (id: string, question: string) => void;
  descriptionCheck: boolean;
  form: FormInstance<FormData>;
  goods: { label: string; value: string }[];
  goodsTypeCheck: boolean;
  groups: LabelValue[];
  groupsSelected: boolean;
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
  updateIncidentCheck: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
  valueSelected: boolean;
}

const useStyles = createUseStyles((theme: Theme) => ({
  cardBody: {
    backgroundColor: theme.cardSubsectionBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    padding: 20,
  },
}));

const WorkflowView: React.FC<WorkflowProps> = ({
  activityTemplateForm,
  availableQuestions,
  createNewQuestion,
  descriptionCheck,
  form,
  goods,
  goodsTypeCheck,
  groups,
  groupsSelected,
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
  updateIncidentCheck,
  updateTemplates,
  valueSelected,
}) => {
  const classes = useStyles();
  const { id: editId } = useParams();
  const intl = useIntl();

  const typeWatch = Form.useWatch('workflowMode', form);
  const workflowTypeWatch = Form.useWatch('workflowType', form);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const { prefix } = useAtomValue(currencySymbolAtom);

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
    <div style={{ padding: 15, width: '100%' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Form<FormData>
          disabled={saving}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Card bodyStyle={{ padding: '12px 20px' }}>
            <Row align="middle">
              <Col flex={1}>
                <Typography.Title level={3} style={{ marginBottom: 0 }}>
                  {editId
                    ? intl.formatMessage({
                        defaultMessage: 'Edit Workflow',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Create Workflow',
                      })}
                </Typography.Title>
              </Col>
              <Col>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Row gutter={16}>
                    <Col>
                      <Button
                        disabled={saving}
                        onClick={() => window.history.back()}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Back',
                        })}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        disabled={saving}
                        htmlType="submit"
                        type="primary"
                      >
                        {editId
                          ? intl.formatMessage({
                              defaultMessage: 'Save Workflow',
                            })
                          : intl.formatMessage({
                              defaultMessage: 'Create Workflow',
                            })}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Row gutter={16}>
            <Col span={10}>
              <Card>
                <Typography.Title level={3} style={{ marginBottom: 30 }}>
                  <FormattedMessage defaultMessage="Worflow Trigger" />
                </Typography.Title>
                <Form.Item
                  label={
                    <FormattedMessage defaultMessage="Name for the workflow" />
                  }
                  name="name"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please enter a name',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Friendly name for the workflow which you can use to identify it later.',
                  })}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16} style={{ width: '100%' }}>
                  <Col span={24}>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Workflow Mode',
                      })}
                      name="workflowMode"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please select workflow mode',
                          }),
                          required: true,
                        },
                      ]}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'Triggered workflows run when an even occurs such as an incident being created. Scheduled workflows run at a specified time.',
                      })}
                    >
                      <Radio.Group
                        disabled={editId !== undefined}
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
                            label: intl.formatMessage({
                              defaultMessage: 'Trigger',
                            }),
                            value: 'trigger',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Scheduled',
                            }),
                            value: 'scheduled',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    {typeWatch === 'trigger' && (
                      <Form.Item
                        label={
                          <FormattedMessage defaultMessage="Trigger Data" />
                        }
                        name="workflowType"
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please select an option',
                            }),
                            required: true,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'The data that triggers the workflow.',
                        })}
                      >
                        <Radio.Group
                          disabled={editId !== undefined}
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
                            {
                              label: intl.formatMessage({
                                defaultMessage: 'Activity',
                              }),
                              value: Model.Todo,
                            },
                            {
                              label: intl.formatMessage({
                                defaultMessage: 'Checklist',
                              }),
                              value: Model.Checklist,
                            },
                          ]}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>

                {typeWatch === 'scheduled' && (
                  <Row gutter={16}>
                    <Col span={10}>
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Workflow Frequency',
                        })}
                        name="frequency"
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please select a frequency',
                            }),
                            required: true,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'How regularly the workflow should run',
                        })}
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
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Start Date',
                        })}
                        name="cronDate"
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please select a start date',
                            }),
                            required: true,
                          },
                        ]}
                        tooltip={intl.formatMessage({
                          defaultMessage:
                            'Select the date when the workflow should start',
                        })}
                      >
                        <DatePicker
                          defaultValue={
                            new Date(
                              new Date().setDate(new Date().getDate() + 1)
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Card>
              {modelSelected && modelSelected !== Model.Checklist && (
                <Card bodyStyle={{ padding: 0 }}>
                  <>
                    <div style={{ padding: 20 }}>
                      <Typography.Title level={3} style={{ marginBottom: 2 }}>
                        <FormattedMessage defaultMessage="Conditions" />
                      </Typography.Title>
                      <Typography.Paragraph style={{ marginBottom: 20 }}>
                        <FormattedMessage defaultMessage="Use workflow conditions to trigger the workflow only when certain conditions are met." />
                      </Typography.Paragraph>
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
                    </div>

                    {modelSelected === Model.Incident && (
                      <>
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
                                <FormattedMessage defaultMessage="Tags Present" />
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                <FormattedMessage defaultMessage="Only trigger the worflow if the selected tags are present." />
                              </Typography.Text>
                            </Col>
                            <Col span={2}>
                              <Form.Item name="tags" valuePropName="checked">
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          {tagsSelected && (
                            <div className={classes.cardBody}>
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
                                label={
                                  <FormattedMessage defaultMessage="Tags" />
                                }
                                name="tagOptions"
                              >
                                <Select
                                  mode="tags"
                                  optionFilterProp="label"
                                  options={tags}
                                />
                              </Form.Item>
                            </div>
                          )}
                        </div>
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
                                <FormattedMessage defaultMessage="Incident has a group" />
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                <FormattedMessage defaultMessage="Only trigger the workflow if the incident has a specific content group." />
                              </Typography.Text>
                            </Col>
                            <Col>
                              <Form.Item name="groups" valuePropName="checked">
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          {groupsSelected && (
                            <div className={classes.cardBody}>
                              <Form.Item
                                label={
                                  <FormattedMessage defaultMessage="If any or all the content groups are present" />
                                }
                                name="groupMethod"
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
                                  <FormattedMessage defaultMessage="Content Groups" />
                                }
                                name="groupIds"
                              >
                                <GroupsSelect
                                  allowClear
                                  mode={'multiple'}
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </div>
                          )}
                        </div>
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
                                <FormattedMessage defaultMessage="Value Greater Than" />
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                <FormattedMessage defaultMessage="Only trigger the workflow if the incident value exceeds a specified amount." />
                              </Typography.Text>
                            </Col>
                            <Col>
                              <Form.Item
                                name="valueCheck"
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          {valueSelected && (
                            <div className={classes.cardBody}>
                              <Form.Item
                                label={
                                  <FormattedMessage defaultMessage="If the total value of items is over" />
                                }
                                name="valuePrice"
                              >
                                <InputNumber
                                  min={0}
                                  prefix={prefix}
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </div>
                          )}
                        </div>
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
                                <FormattedMessage defaultMessage="Value Less Than" />
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                <FormattedMessage defaultMessage="Only trigger the workflow if the incident value is under a specified amount." />
                              </Typography.Text>
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
                            <div className={classes.cardBody}>
                              <Form.Item
                                label={
                                  <FormattedMessage defaultMessage="If the total value of items is less than" />
                                }
                                name="lessThanPrice"
                              >
                                <InputNumber
                                  min={0}
                                  prefix={prefix}
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </div>
                          )}
                        </div>
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
                                <FormattedMessage defaultMessage="Goods Present" />
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                <FormattedMessage defaultMessage="Only trigger the workflow if the incident has specified goods present." />
                              </Typography.Text>
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
                            <div className={classes.cardBody}>
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
                            </div>
                          )}
                        </div>
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
                                <FormattedMessage defaultMessage="Description Contents" />
                              </Typography.Title>
                              <Typography.Text type="secondary">
                                <FormattedMessage defaultMessage="Trigger the workflow if the incident desction contains any or all of the selected words." />
                              </Typography.Text>
                            </Col>
                            <Col>
                              <Form.Item
                                name="descriptionCheck"
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          {descriptionCheck && (
                            <div className={classes.cardBody}>
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
                            </div>
                          )}
                        </div>
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
                                <FormattedMessage defaultMessage="Only trigger the workflow custom questions on the incident has specified answers." />
                              </Typography.Text>
                            </Col>
                            <Col>
                              <Form.Item
                                name="questionChecked"
                                valuePropName="checked"
                              >
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
                              {selectedQuestions &&
                                selectedQuestions.length > 0 && (
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
                                        <Row
                                          align="bottom"
                                          gutter={8}
                                          key={id}
                                          style={{ marginTop: 12 }}
                                          wrap={false}
                                        >
                                          <Col flex={1}>
                                            <Typography.Text>
                                              {question}
                                            </Typography.Text>
                                            {(type === AnswerType.Select ||
                                              type ===
                                                AnswerType.SelectSingle) && (
                                              <Select
                                                mode="multiple"
                                                onChange={(
                                                  value: string | string[]
                                                ) => {
                                                  setSelectedQuestions(
                                                    (prevState) =>
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
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage: 'Yes',
                                                        }
                                                      ),
                                                      value: 'true',
                                                    },
                                                    {
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage: 'No',
                                                        }
                                                      ),
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
                                                    value:
                                                      | null
                                                      | number
                                                      | string
                                                  ) => {
                                                    setSelectedQuestions(
                                                      (prevState) =>
                                                        prevState.map((q) => {
                                                          if (
                                                            q.id === id &&
                                                            value
                                                          ) {
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
                                                              overUnder: e
                                                                .target
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
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage:
                                                            'Over',
                                                        }
                                                      ),
                                                      value: 'over',
                                                    },
                                                    {
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage:
                                                            'Under',
                                                        }
                                                      ),
                                                      value: 'under',
                                                    },
                                                  ]}
                                                  value={overUnder}
                                                />
                                              </div>
                                            )}
                                            {type !== AnswerType.Select &&
                                              type !==
                                                AnswerType.SelectSingle &&
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
                                                              answer:
                                                                e.target.value,
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
                                                const q =
                                                  selectedQuestions.find(
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
                                )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {modelSelected === Model.Offender && (
                      <>
                        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
                        <div>
                          <Row gutter={16} style={{ padding: 20 }} wrap={false}>
                            <Col flex={1}>
                              <Typography.Title
                                level={4}
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  paddingTop: 8,
                                }}
                              >
                                <FormattedMessage defaultMessage="Number of incidents in a period of days" />
                              </Typography.Title>
                              <Typography.Paragraph
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                                type="secondary"
                              >
                                <FormattedMessage defaultMessage="Triggers if an offender has a specified number of incidents in a defined period of days." />
                              </Typography.Paragraph>
                            </Col>
                            <Col>
                              <Form.Item
                                name="incidentTimeCountCheck"
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          {incidentTimeCountCheck && (
                            <div className={classes.cardBody}>
                              <Row gutter={32}>
                                <Col>
                                  <Form.Item
                                    initialValue={1}
                                    label={
                                      <FormattedMessage defaultMessage="Period of days" />
                                    }
                                    name="incidentTimeCountDays"
                                    rules={[
                                      {
                                        message: intl.formatMessage({
                                          defaultMessage:
                                            'Please select an option',
                                        }),
                                        required: true,
                                      },
                                    ]}
                                    tooltip={
                                      <FormattedMessage defaultMessage="Number of days in which to count incidents" />
                                    }
                                  >
                                    <InputNumber min={1} />
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Form.Item
                                    initialValue={1}
                                    label={
                                      <FormattedMessage defaultMessage="Number of incidents" />
                                    }
                                    name="incidentTimeCountIncidents"
                                    rules={[
                                      {
                                        message: intl.formatMessage({
                                          defaultMessage:
                                            'Please select an option',
                                        }),
                                        required: true,
                                      },
                                    ]}
                                    tooltip={
                                      <FormattedMessage defaultMessage="Number of incidents in the period requried to trigger the workflow" />
                                    }
                                  >
                                    <InputNumber min={1} />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
                        <div>
                          <Row gutter={16} style={{ padding: 20 }} wrap={false}>
                            <Col flex={1}>
                              <Typography.Title
                                level={4}
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  paddingTop: 8,
                                }}
                              >
                                <FormattedMessage defaultMessage="New Incident while banned" />
                              </Typography.Title>
                              <Typography.Paragraph
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                                type="secondary"
                              >
                                <FormattedMessage defaultMessage="Triggers when a new incident is added involving this offender and they have an active ban issued against them." />
                              </Typography.Paragraph>
                            </Col>
                            <Col>
                              <Form.Item
                                name="incidentWhileBanCheck"
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      </>
                    )}
                    {modelSelected === Model.Todo && (
                      <>
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
                              <Form.Item
                                name="questionChecked"
                                valuePropName="checked"
                              >
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
                              {selectedQuestions &&
                                selectedQuestions.length > 0 && (
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
                                        <Row
                                          align="bottom"
                                          gutter={8}
                                          key={id}
                                          style={{ marginTop: 12 }}
                                          wrap={false}
                                        >
                                          <Col flex={1}>
                                            <Typography.Text>
                                              {question}
                                            </Typography.Text>
                                            {(type === AnswerType.Select ||
                                              type ===
                                                AnswerType.SelectSingle) && (
                                              <Select
                                                mode="multiple"
                                                onChange={(
                                                  value: string | string[]
                                                ) => {
                                                  setSelectedQuestions(
                                                    (prevState) =>
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
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage: 'Yes',
                                                        }
                                                      ),
                                                      value: 'true',
                                                    },
                                                    {
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage: 'No',
                                                        }
                                                      ),
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
                                                    value:
                                                      | null
                                                      | number
                                                      | string
                                                  ) => {
                                                    setSelectedQuestions(
                                                      (prevState) =>
                                                        prevState.map((q) => {
                                                          if (
                                                            q.id === id &&
                                                            value
                                                          ) {
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
                                                              overUnder: e
                                                                .target
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
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage:
                                                            'Over',
                                                        }
                                                      ),
                                                      value: 'over',
                                                    },
                                                    {
                                                      label: intl.formatMessage(
                                                        {
                                                          defaultMessage:
                                                            'Under',
                                                        }
                                                      ),
                                                      value: 'under',
                                                    },
                                                  ]}
                                                  value={overUnder}
                                                />
                                              </div>
                                            )}
                                            {type !== AnswerType.Select &&
                                              type !==
                                                AnswerType.SelectSingle &&
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
                                                              answer:
                                                                e.target.value,
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
                                                const q =
                                                  selectedQuestions.find(
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
                                )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                </Card>
              )}
            </Col>
            {typeWatch && (
              <Col span={14}>
                <Card bodyStyle={{ overflow: 'hidden', padding: 0 }}>
                  <div style={{ padding: 20 }}>
                    <Typography.Title level={3} style={{ marginBottom: 2 }}>
                      <FormattedMessage defaultMessage="Outcomes" />
                    </Typography.Title>
                    <Typography.Paragraph type="secondary">
                      <FormattedMessage defaultMessage="Configure the outcomes that will be occur when the workflow is triggered." />
                    </Typography.Paragraph>
                  </div>

                  <Divider style={{ marginBottom: 0, marginTop: 0 }} />
                  <div>
                    <Row style={{ padding: 20 }} wrap={false}>
                      <Col flex={1}>
                        <Typography.Title
                          level={4}
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <FormattedMessage defaultMessage="Create Activity" />
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                          type="secondary"
                        >
                          <FormattedMessage defaultMessage="Create an activity from a tempalte or custom definition and assign it to speified users, groups and roles." />
                        </Typography.Paragraph>
                      </Col>
                      <Col>
                        <Form.Item name="taskOutcome" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                    {taskOutcome && (
                      <div className={classes.cardBody}>
                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Select an activity template" />
                          }
                          name="selectedGroup"
                          tooltip={
                            <FormattedMessage defaultMessage="You can use a predefined activity template or create a new one." />
                          }
                        >
                          <Row gutter={[8, 8]} wrap={false}>
                            <Col flex={1}>
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
                              <Button
                                onClick={() => setActivityTemplateForm(true)}
                              >
                                <FormattedMessage defaultMessage="New Template" />
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                        <Row gutter={16} wrap={false}>
                          <Col flex={1}>
                            <Form.Item
                              label={<FormattedMessage defaultMessage="Name" />}
                              name="taskName"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please enter a name for the activity',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Default due days" />
                              }
                              name="taskDueDays"
                            >
                              <InputNumber min={0} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={16}>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Business" />
                              }
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
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={[8, 8]} wrap={false}>
                          <Col flex={1}>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Questions" />
                              }
                              name="taskQuestions"
                            >
                              <Select
                                maxTagCount="responsive"
                                mode="multiple"
                                options={taskQuestions.map(
                                  ({ id, question }) => ({
                                    label: question,
                                    value: id,
                                  })
                                )}
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
                      </div>
                    )}
                  </div>
                  <Divider style={{ marginBottom: 0, marginTop: 0 }} />
                  {typeWatch === 'trigger' && (
                    <>
                      <div>
                        <Row style={{ padding: 20 }} wrap={false}>
                          <Col flex={1}>
                            <Typography.Title
                              level={4}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <FormattedMessage defaultMessage="Create Notification" />
                            </Typography.Title>
                            <Typography.Paragraph
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                              type="secondary"
                            >
                              <FormattedMessage defaultMessage="Send a notification to the selected users, groups and roles via Alert. This will be delivered to the mobile app and the web application notifiaction drawer." />
                            </Typography.Paragraph>
                          </Col>
                          <Col>
                            <Form.Item
                              name="sendNotificationCheck"
                              valuePropName="checked"
                            >
                              <Switch />
                            </Form.Item>
                          </Col>
                        </Row>
                        {sendNotificationCheck && (
                          <div className={classes.cardBody}>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Notification Title" />
                              }
                              name="sendNotificationTitle"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please enter a title for the notification',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Notification Body" />
                              }
                              name="sendNotificationMessage"
                            >
                              <Input.TextArea />
                            </Form.Item>
                          </div>
                        )}
                      </div>
                      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
                      <div>
                        <Row style={{ padding: 20 }} wrap={false}>
                          <Col flex={1}>
                            <Typography.Title
                              level={4}
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <FormattedMessage defaultMessage="Create Email" />
                            </Typography.Title>
                            <Typography.Paragraph
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                              type="secondary"
                            >
                              <FormattedMessage defaultMessage="Send an email to specified users, groups and roles." />
                            </Typography.Paragraph>
                          </Col>
                          <Col>
                            <Form.Item
                              name="sendEmailCheck"
                              valuePropName="checked"
                            >
                              <Switch />
                            </Form.Item>
                          </Col>
                        </Row>
                        {sendEmailCheck && (
                          <div className={classes.cardBody}>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Email Subject" />
                              }
                              name="sendEmailTitle"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please enter a subject line for the email.',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Email Body" />
                              }
                              name="sendEmailMessage"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please enter a body for the email.',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Input.TextArea />
                            </Form.Item>
                          </div>
                        )}
                      </div>
                      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
                      {modelSelected === Model.Incident && (
                        <div>
                          <Row style={{ padding: 20 }} wrap={false}>
                            <Col flex={1}>
                              <Typography.Title
                                level={4}
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                              >
                                <FormattedMessage defaultMessage="Update Incident" />
                              </Typography.Title>
                              <Typography.Paragraph
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                                type="secondary"
                              >
                                <FormattedMessage defaultMessage="Update fields on the incident." />
                              </Typography.Paragraph>
                            </Col>
                            <Col>
                              <Form.Item
                                name="updateIncident"
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          {updateIncidentCheck && (
                            <div className={classes.cardBody}>
                              <Row gutter={[16, 16]}>
                                <Col span={10}>
                                  <Form.Item
                                    label={
                                      <FormattedMessage defaultMessage="Set incident priority to:" />
                                    }
                                    name="setPriority"
                                  >
                                    <Select
                                      options={Object.keys(
                                        IncidentPriority
                                      ).map((key) => ({
                                        label: key,
                                        value: key,
                                      }))}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Form.Item
                                    label={
                                      <FormattedMessage defaultMessage="Approve the incident" />
                                    }
                                    name="autoApprove"
                                    valuePropName="checked"
                                  >
                                    <Switch />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </Card>

                {(taskOutcome || sendEmailCheck || sendNotificationCheck) && (
                  <Card>
                    <Row wrap={false}>
                      <Col flex={1}>
                        <Typography.Title level={4}>
                          <FormattedMessage defaultMessage="User Management" />
                        </Typography.Title>
                        <Typography.Text type="secondary">
                          <FormattedMessage defaultMessage="Select specific users for the outcomes or define roles, and groups to seach for the users to be assigned to the outcomes." />
                        </Typography.Text>
                        <Form.Item
                          label={
                            <FormattedMessage defaultMessage="Select Specefic Users" />
                          }
                          name="userManagementUsers"
                          style={{ marginTop: 14 }}
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
                        <Divider style={{ marginBottom: 26, marginTop: 26 }} />
                        <Typography.Paragraph
                          style={{ fontWeight: 500, marginBottom: 14 }}
                        >
                          <FormattedMessage defaultMessage="Use the following fields to define criteria for assigning users to the outcomes." />
                        </Typography.Paragraph>
                        <Form.Item
                          label={<FormattedMessage defaultMessage="Roles" />}
                          name="userManagementRoles"
                          tooltip={
                            <FormattedMessage defaultMessage="Select roles which would be used to assign users to the outcomes" />
                          }
                        >
                          <RoleSelect multi schemeId={schemeId} />
                        </Form.Item>
                        <Row gutter={[32, 16]}>
                          {typeWatch !== 'scheduled' &&
                            workflowTypeWatch &&
                            workflowTypeWatch !== Model.Checklist && (
                              <Col>
                                <Form.Item
                                  label={intl.formatMessage({
                                    defaultMessage: 'Use trigger model groups',
                                  })}
                                  name="useDynamicGroups"
                                  tooltip={intl.formatMessage({
                                    defaultMessage:
                                      'Use the groups assigned to the triggering model to find the users to assign to the outcomes to.',
                                  })}
                                  valuePropName="checked"
                                >
                                  <Switch />
                                </Form.Item>
                              </Col>
                            )}
                          <Col flex={1}>
                            <Form.Item
                              label={
                                <FormattedMessage defaultMessage="Select Groups" />
                              }
                              name="userManagementGroups"
                              tooltip={
                                <FormattedMessage defaultMessage="Select groups which would be used to assign users to the outcomes to." />
                              }
                            >
                              <Select
                                mode="multiple"
                                optionFilterProp="label"
                                options={groups}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                )}
              </Col>
            )}
          </Row>
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
    </div>
  );
};

export default WorkflowView;
