/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { AvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/__generated__/get-questions.generated';
import type { FormInstance } from 'antd';

import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
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
import { AnswerType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TagQuestion } from '../update-question-on-tag/UpdateQuestion.container';
import type { FormData } from './useAddQuestion';

import {
  DatePreview,
  NumberPreview,
  SelectPreview,
  StringPreview,
  TimePreview,
  YesNoPreview,
} from './previews';

interface AddQuestionViewProps {
  brands: {
    label: string;
    value: string;
  }[];
  data: FormData;
  form: FormInstance<FormData>;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  questionData: AvailableQuestionsQuery | undefined;
  saving: boolean;
  tagQuestions?: TagQuestion[];
}

const AddQuestionView = ({
  brands,
  data,
  form,
  loading,
  onClose,
  onSubmit,
  questionData,
  saving,
  tagQuestions,
}: AddQuestionViewProps) => {
  const answerType = Form.useWatch('type', form);
  const question = Form.useWatch('question', form) || '';
  const opt = Form.useWatch('options', form) || [];
  const selectedId = Form.useWatch('selectedId', form);
  const intl = useIntl();
  const dependentOn = Form.useWatch('dependentOn', form);
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

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
        <SelectPreview options={opt.filter(Boolean)} question={question} />
      );
    }
    if (answerType === AnswerType.SelectSingle) {
      return (
        <SelectPreview
          options={opt.filter(Boolean)}
          question={question}
          single
        />
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
      case AnswerType.SelectSingle:
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
      layout="vertical"
      onFinish={onSubmit}
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
            filterOption={(input, option) => {
              const value = option?.label ?? '';
              return value.toLowerCase().includes(input.toLowerCase());
            }}
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
                options: qOptions || [],
                question: qQuestion,
                type: qType,
              });
            }}
            options={questionData?.availableQuestions.map((q) => ({
              label: q.questionFormatted,
              value: q.id,
            }))}
            showSearch
          />
        </Form.Item>
        <Form.Item
          hidden={!!selectedId}
          label={intl.formatMessage({
            defaultMessage: 'Question',
          })}
          name="question"
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
          hidden={!!selectedId || !question}
          label={intl.formatMessage({
            defaultMessage: 'Select type for answer',
          })}
          name="type"
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
                  defaultMessage: 'Select (Multiple)',
                }),
                value: AnswerType.Select,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Select (Single)',
                }),
                value: AnswerType.SelectSingle,
              },
            ]}
          />
        </Form.Item>
      </Card>

      {(answerType === AnswerType.Select ||
        answerType === AnswerType.SelectSingle) && (
        <Card
          hidden={!!selectedId}
          style={{
            maxHeight: 300,
            overflow: 'auto',
          }}
          title={intl.formatMessage({
            defaultMessage: 'Options',
          })}
        >
          <Form.List
            name="options"
            rules={[
              {
                validator: async (_, options) => {
                  if (
                    (answerType !== AnswerType.Select &&
                      answerType !== AnswerType.SelectSingle) ||
                    selectedId
                  )
                    return;
                  if (!options || options.length < 2) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage: 'Please add at least 2 options',
                        })
                      )
                    );
                  }
                  if (options.some((o: null | string | undefined) => !o)) {
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
                  <Row gutter={10} key={field.key}>
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
                    block
                    icon={
                      <i
                        aria-hidden="true"
                        className="fa fa-plus"
                        style={{ color: '#1890ff' }}
                      />
                    }
                    onClick={() => add()}
                    type="dashed"
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
            hidden={!dependentOn}
            label={intl.formatMessage({
              defaultMessage: 'Dependent Answer',
            })}
            name="dependentAnswer"
            required={!!dependentOn}
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select an answer that this question will depend on to show in the form',
                }),
                required: !!dependentOn,
              },
            ]}
          >
            {generateFormItem()}
          </Form.Item>
          <Form.Item
            hidden={brands?.length === 0}
            label={intl.formatMessage({
              defaultMessage: 'Dependent Brands',
            })}
            name="dependentBrands"
          >
            <Select mode="multiple" options={brands} showSearch />
          </Form.Item>
        </Card>
      )}
      <Card loading={loading}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Question Tooltip',
          })}
          name="tooltip"
        >
          <Input disabled={saving} />
        </Form.Item>
      </Card>
      <Card loading={loading}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Roles',
          })}
          name="roles"
        >
          <RoleSelect multi schemeId={currentSchemeId} />
        </Form.Item>
      </Card>

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
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
              htmlType="submit"
              loading={saving || loading}
              type="primary"
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
