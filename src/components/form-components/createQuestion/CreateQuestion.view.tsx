/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { FormInstance } from 'antd';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import type { FormData } from './useCreateQuestion';
import {
  DatePreview,
  NumberPreview,
  SelectPreview,
  StringPreview,
  TimePreview,
  YesNoPreview,
} from './previews';
import type { AvailableTaskQuestionsQuery } from '#/components/form-components/createQuestion/graphql/available-questions.generated';
import { AnswerType } from 'graphql/types';

interface AddQuestionViewProps {
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  questionData: AvailableTaskQuestionsQuery | undefined;
  loading: boolean;
}

const CreateQuestionView = ({
  data,
  form,
  onSubmit,
  onClose,
  saving,
  questionData,
  loading,
}: AddQuestionViewProps) => {
  const answerType = Form.useWatch('type', form);
  const question = Form.useWatch('question', form) || '';
  const opt = Form.useWatch('options', form) || [];
  const selectedId = Form.useWatch('selectedId', form);
  const intl = useIntl();
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
              const ques = questionData?.availableTaskQuestions.find(
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
            options={questionData?.availableTaskQuestions.map((q) => ({
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

export default CreateQuestionView;
