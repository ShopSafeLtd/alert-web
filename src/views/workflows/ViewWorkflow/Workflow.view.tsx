/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
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
import { AnswerType } from '../../../graphql/generated';
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
                  id: 'wIrGg7',
                })
              : intl.formatMessage({
                  defaultMessage: 'Create Workflow',
                  id: 'GBCpm7',
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
              label={
                <FormattedMessage
                  defaultMessage="Name for workflow"
                  id="asVXa7"
                />
              }
              name="name"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a name',
                    id: 'PVXd+T',
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage
                  defaultMessage="If any or all the selected checks are present for the outcome to happen"
                  id="LDnUcJ"
                />
              }
              name="option"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                    id: 'PPLP3R',
                  }),
                },
              ]}
            >
              <Radio.Group
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                      id: 'ToO3/h',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                      id: 'zQvVDJ',
                    }),
                    value: 'all',
                  },
                ]}
                optionType="button"
              />
            </Form.Item>
          </Card>
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
                      <FormattedMessage
                        defaultMessage="Tags Check"
                        id="Fhryya"
                      />
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
                        <FormattedMessage
                          defaultMessage="If any or all the selected tags are present"
                          id="MHUUBE"
                        />
                      }
                      name="tagMethod"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({
                            defaultMessage: 'Please select an option',
                            id: 'PPLP3R',
                          }),
                        },
                      ]}
                    >
                      <Radio.Group
                        options={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Any',
                              id: 'ToO3/h',
                            }),
                            value: 'any',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'All',
                              id: 'zQvVDJ',
                            }),
                            value: 'all',
                          },
                        ]}
                        optionType="button"
                      />
                      {/* <Select> */}
                      {/*   <Option value="any"> */}
                      {/*     <FormattedMessage defaultMessage="Any" id="ToO3/h" /> */}
                      {/*   </Option> */}
                      {/*   <Option value="all"> */}
                      {/*     <FormattedMessage defaultMessage="All" id="zQvVDJ" /> */}
                      {/*   </Option> */}
                      {/* </Select> */}
                    </Form.Item>
                    <Form.Item
                      label={
                        <FormattedMessage defaultMessage="Tags" id="1EYCdR" />
                      }
                      name="tagOptions"
                    >
                      <Select mode="tags" options={tags} />
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
                      <FormattedMessage
                        defaultMessage="Value Check"
                        id="m2EUUQ"
                      />
                    </Typography.Title>
                  </Col>

                  <Col span={2}>
                    <Form.Item name="valueCheck" valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                  </Col>
                </Row>
                {valueSelected && (
                  <Form.Item
                    label={
                      <FormattedMessage
                        defaultMessage="If the total value of items is over"
                        id="/3qAXO"
                      />
                    }
                    name="valuePrice"
                  >
                    <InputNumber prefix="£" min={0} style={{ width: '100%' }} />
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
                      <FormattedMessage
                        defaultMessage="Questions Check"
                        id="zL1kRs"
                      />
                    </Typography.Title>
                  </Col>

                  <Col span={1}>
                    <Form.Item name="questionChecked" valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                  </Col>
                </Row>
                {questionsSelected && (
                  <>
                    <Form.Item
                      label={
                        <FormattedMessage
                          defaultMessage="If any or all the selected questions are present and answered"
                          id="otvaN6"
                        />
                      }
                      name="questionMethod"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({
                            defaultMessage: 'Please select an option',
                            id: 'PPLP3R',
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
                              id: 'ToO3/h',
                            }),
                            value: 'any',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'All',
                              id: 'zQvVDJ',
                            }),
                            value: 'all',
                          },
                        ]}
                        optionType="button"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <FormattedMessage
                          defaultMessage="Add question to check"
                          id="c5rXL2"
                        />
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
                            id: 'JnKRw2',
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
                        <FormattedMessage
                          defaultMessage="Checked Questions"
                          id="cY+KmR"
                        />
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
                              <Typography.Text>{question}</Typography.Text>
                              {type === AnswerType.Select && (
                                <Select
                                  value={answer}
                                  mode="multiple"
                                  options={options.map(({ label, value }) => ({
                                    value,
                                    label,
                                  }))}
                                  onChange={(value: string | string[]) => {
                                    setSelectedQuestions((prevState) =>
                                      prevState.map((q) => {
                                        if (q.id === id) {
                                          return { ...q, answer: value };
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
                                    options={[
                                      {
                                        label: intl.formatMessage({
                                          defaultMessage: 'Yes',
                                          id: 'a5msuh',
                                        }),
                                        value: 'true',
                                      },
                                      {
                                        label: intl.formatMessage({
                                          defaultMessage: 'No',
                                          id: 'oUWADl',
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
                                    min={0}
                                    style={{ width: '50%' }}
                                  />
                                  <Radio.Group
                                    value={overUnder}
                                    onChange={(e) => {
                                      setSelectedQuestions((prevState) =>
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
                                          id: 'ZMDaHM',
                                        }),
                                        value: 'over',
                                      },
                                      {
                                        label: intl.formatMessage({
                                          defaultMessage: 'Under',
                                          id: 'uhROer',
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
                                <FormattedMessage
                                  defaultMessage="Remove"
                                  id="G/yZLu"
                                />
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

          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Card
                title={intl.formatMessage({
                  defaultMessage:
                    'Outcome: What activity to create when the above conditions are met?',
                  id: '6Z9JbC',
                })}
              >
                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Select an activity template"
                      id="KGFiql"
                    />
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
                      <Button onClick={() => setActivityTemplateForm(true)}>
                        <FormattedMessage
                          defaultMessage="New Template"
                          id="4jpdwo"
                        />
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage defaultMessage="Name" id="HAlOn1" />}
                  name="taskName"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={
                    <FormattedMessage
                      defaultMessage="Default due days"
                      id="NQ90za"
                    />
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
                        <FormattedMessage
                          defaultMessage="Questions"
                          id="KV/9Hv"
                        />
                      }
                    >
                      <Select
                        mode="multiple"
                        maxTagCount="responsive"
                        options={taskQuestions.map(({ id, question }) => ({
                          value: id,
                          label: question,
                        }))}
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
                        <FormattedMessage
                          defaultMessage="New Question"
                          id="kgZDDS"
                        />
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item
                      name="assigneeGroups"
                      label={
                        <FormattedMessage
                          defaultMessage="Select groups to get users from"
                          id="zf6eoB"
                        />
                      }
                    >
                      <Select mode="multiple" options={groups} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="taskAssignee"
                      label={
                        <FormattedMessage
                          defaultMessage="Additional users to create activity for"
                          id="IIj/Zm"
                        />
                      }
                    >
                      <Select mode="multiple" options={users} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={16} justify="end">
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    id: 'cyR7Kh',
                    defaultMessage: 'Back',
                  })}
                </Button>
              </Col>
              <Col>
                <Button disabled={saving} type="primary" htmlType="submit">
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                    id: 'jvo0vs',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Drawer
          title={intl.formatMessage({
            defaultMessage: 'Create Activity Template',
            id: '+zA4DH',
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
            id: '/vx2Ey',
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
