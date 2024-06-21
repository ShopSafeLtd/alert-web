/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { FormData } from './useAddQuestion';
import {
  DatePreview,
  NumberPreview,
  SelectPreview,
  StringPreview,
  TimePreview,
  YesNoPreview,
} from './previews';
import type { TagQuestion } from '../update-question-on-tag/UpdateQuestion.container';
import type { AvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/get-questions.generated';
import { AnswerType } from 'graphql/types';

interface AddQuestionViewProps {
  questionData: AvailableQuestionsQuery | undefined;
  loading: boolean;
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  tagQuestions?: TagQuestion[];
  brands: {
    label: string;
    value: string;
  }[];
}

const AddQuestionView = ({
  data,
  questionData,
  loading,
  form,
  onSubmit,
  onClose,
  saving,
  tagQuestions,
  brands,
}: AddQuestionViewProps) => {
  const answerType = Form.useWatch('type', form);
  const question = Form.useWatch('question', form) || '';
  const opt = Form.useWatch('options', form) || [];
  const selectedId = Form.useWatch('selectedId', form);
  const intl = useIntl();
  const dependentOn = Form.useWatch('dependentOn', form);

  const generatePreview = () => {
    if (answerType === AnswerType.String) {
      return <StringPreview question={question} />;
    }
    if (answerType === AnswerType.Boolean) {
      return <YesNoPreview question={question} />;
    }
    if (answerType === AnswerType.Date) {
      return <DatePreview question={question} />;
    }
    if (answerType === AnswerType.Number) {
      return <NumberPreview question={question} />;
    }
    if (answerType === AnswerType.Time) {
      return <TimePreview question={question} />;
    }
    if (answerType === AnswerType.Select) {
      return (
        <SelectPreview question={question} options={opt.filter(Boolean)} />
      );
    }

    return <div />;
  };

  const generateFormItem = () => {
    if (!tagQuestions) return <div />;
    const dependentQuestion = tagQuestions.find(
      (q) => q.tagQuestionId === dependentOn
    );
    if (!dependentOn || !dependentQuestion) return <div />;
    switch (dependentQuestion.type) {
      case AnswerType.String: {
        return <Input />;
      }
      case AnswerType.Boolean: {
        return (
          <Radio.Group size="small">
            <Radio.Button value="true">
              <FormattedMessage defaultMessage="Yes" />
            </Radio.Button>
            <Radio.Button value="false">
              <FormattedMessage defaultMessage="No" />
            </Radio.Button>
          </Radio.Group>
        );
      }
      case AnswerType.Date: {
        return <DatePicker />;
      }
      case AnswerType.Time: {
        return <DatePicker.TimePicker />;
      }
      case AnswerType.Select: {
        return (
          <Select
            options={dependentQuestion.options?.map((o) => ({
              label: o,
              value: o.toLowerCase(),
            }))}
          />
        );
      }
      case AnswerType.Number: {
        return <InputNumber />;
      }
      default: {
        return <div />;
      }
    }
  };

  return (
    <Form<FormData>
      form={form}
      initialValues={data}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Card>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Select Question',
          })}
          name="selectedId"
        >
          <Select
            allowClear
            onClear={() => {
              form.setFieldsValue({ question: '' });
            }}
            onSelect={(value) => {
              const ques = questionData?.availableQuestions.find(
                (q) => q.id === value
              );
              const qType = ques?.type;
              const qQuestion = ques?.questionFormatted;
              const qOptions = ques?.optionsFormatted;
              form.setFieldsValue({
                type: qType,
                question: qQuestion,
                options: qOptions || [],
              });
            }}
            options={questionData?.availableQuestions.map((q) => ({
              label: q.questionFormatted,
              value: q.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Question',
          })}
          name="question"
          hidden={!!selectedId}
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Required',
          })}
          name="required"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Card>

      <Card hidden={!!selectedId || !question}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Select type for answer',
          })}
          name="type"
          hidden={!!selectedId || !question}
        >
          <Select
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Text',
                }),
                value: AnswerType.String,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Number',
                }),
                value: AnswerType.Number,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Yes/No',
                }),
                value: AnswerType.Boolean,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Date',
                }),
                value: AnswerType.Date,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Time',
                }),
                value: AnswerType.Time,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Select',
                }),
                value: AnswerType.Select,
              },
            ]}
          />
        </Form.Item>
      </Card>

      {answerType === AnswerType.Select && (
        <Card
          style={{
            maxHeight: 300,
            overflow: 'auto',
          }}
          title={intl.formatMessage({
            defaultMessage: 'Options',
          })}
          hidden={!!selectedId}
        >
          <Form.List
            name="options"
            rules={[
              {
                validator: async (_, options) => {
                  if (answerType !== AnswerType.Select || selectedId) return;
                  if (!options || options.length < 2) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage: 'Please add at least 2 options',
                        })
                      )
                    );
                  }
                  if (options.some((o: string | null | undefined) => !o)) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage: 'Please fill all options',
                        })
                      )
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key} gutter={10}>
                    <Col span={20}>
                      <Form.Item
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...field}
                        name={[field.name]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button onClick={() => remove(field.name)}>
                        {intl.formatMessage({
                          defaultMessage: 'Remove',
                        })}
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        style={{ color: '#1890ff' }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Option',
                    })}
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
      )}

      <Card
        title={intl.formatMessage({
          defaultMessage: 'Preview',
        })}
      >
        {generatePreview()}
      </Card>
      {tagQuestions && (
        <Card loading={loading}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Dependent Question',
            })}
            name="dependentOn"
          >
            <Select
              onSelect={() => form.setFieldsValue({ dependentAnswer: '' })}
              options={tagQuestions.map((q) => ({
                label: q.question,
                value: q.tagQuestionId,
              }))}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Dependent Answer',
            })}
            rules={[
              {
                required: !!dependentOn,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select an answer that this question will depend on to show in the form',
                }),
              },
            ]}
            required={!!dependentOn}
            hidden={!dependentOn}
            name="dependentAnswer"
          >
            {generateFormItem()}
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Dependent Brands',
            })}
            name="dependentBrands"
            hidden={brands?.length === 0}
          >
            <Select options={brands} mode="multiple" showSearch />
          </Form.Item>
        </Card>
      )}
      <Form.Item>
        <Row style={{ marginTop: 10 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving || loading} onClick={() => onClose()}>
              {intl.formatMessage({
                defaultMessage: 'Cancel',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving || loading}
              loading={saving || loading}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({
                defaultMessage: 'Submit',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddQuestionView;
