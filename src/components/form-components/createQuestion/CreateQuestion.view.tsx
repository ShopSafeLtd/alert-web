/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { FormInstance } from 'antd';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import type { FormData } from './useCreateQuestion';
import type { AvailableTaskQuestionsQuery } from '../../../graphql/generated';
import { AnswerType } from '../../../graphql/generated';
import {
  DatePreview,
  NumberPreview,
  SelectPreview,
  StringPreview,
  TimePreview,
  YesNoPreview,
} from './previews';

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
            id: 'yV1hME',
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
            id: 'kgOBET',
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
            id: 'pC1/Sb',
          })}
          name="type"
          hidden={!!selectedId || !question}
        >
          <Select
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Text',
                  id: 'aA8bDw',
                }),
                value: AnswerType.String,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Number',
                  id: 'kFkPWB',
                }),
                value: AnswerType.Number,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Yes/No',
                  id: 'KgcF6B',
                }),
                value: AnswerType.Boolean,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Date',
                  id: 'P7PLVj',
                }),
                value: AnswerType.Date,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Time',
                  id: 'ug01Mk',
                }),
                value: AnswerType.Time,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Select',
                  id: 'kQAf2d',
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
            id: 'NDV5Mq',
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
                          id: 'VdoV2m',
                        })
                      )
                    );
                  }
                  if (options.some((o: string | null | undefined) => !o)) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage: 'Please fill all options',
                          id: 'FyntBD',
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
                          id: 'G/yZLu',
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
                      id: 'MMOk0m',
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
          id: 'TJo5E6',
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
                id: '47FYwb',
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
                id: 'wSZR47',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CreateQuestionView;
