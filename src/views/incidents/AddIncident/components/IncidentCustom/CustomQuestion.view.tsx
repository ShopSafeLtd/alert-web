/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment */
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  TimePicker,
} from 'antd';
import React from 'react';
import { AnswerType } from 'graphql/generated';
import type { CustomQuestion } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { Moment } from 'moment';
import moment from 'moment';
import CheckTags from '../../../../../components/form-components/check-tags/CheckTags.view';

interface StringInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled: boolean;
}

const StringInputNumber = ({ value, onChange, disabled }: StringInputProps) => {
  const covertToString = (data: number | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <InputNumber
      value={value ? Number(value) : undefined}
      onChange={covertToString}
      style={{ minWidth: 200 }}
      disabled={disabled}
    />
  );
};

const StringDate = ({ value, onChange, disabled }: StringInputProps) => {
  const covertToString = (data: Moment | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <DatePicker
      value={value ? moment(value) : undefined}
      onChange={covertToString}
      style={{ minWidth: 150 }}
      disabled={disabled}
      format="DD/MM/YYYY"
    />
  );
};

const StringTime = ({ value, onChange, disabled }: StringInputProps) => {
  const covertToString = (data: Moment | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <TimePicker
      value={value ? moment(value) : null}
      onChange={covertToString}
      style={{ minWidth: 150 }}
      disabled={disabled}
    />
  );
};

interface SelectInputProps extends StringInputProps {
  options: { label: string; value: string }[];
}

const StringSelect = ({
  value,
  onChange,
  options,
  disabled,
}: SelectInputProps) => {
  const covertToString = (data: string[]) => {
    if (onChange) onChange(data.toString());
  };

  return (
    <CheckTags
      value={value ? value.split(',') : []}
      onChange={covertToString}
      options={options}
      mode="check"
      disabled={disabled}
    />
  );
};

interface Props {
  questions: CustomQuestion[];
  disabled: boolean;
}

const CustomQuestions = ({ questions, disabled }: Props) => {
  const intl = useIntl();

  const getFieldType = (question: CustomQuestion, type: AnswerType) => {
    switch (type) {
      case AnswerType.String: {
        return (
          <Input.TextArea
            style={{ maxWidth: '50%' }}
            rows={1}
            disabled={disabled}
          />
        );
      }
      case AnswerType.Date: {
        return <StringDate disabled={disabled} />;
      }

      case AnswerType.Time: {
        return <StringTime disabled={disabled} />;
      }
      case AnswerType.Boolean: {
        return (
          <Radio.Group
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
            disabled={disabled}
          />
        );
      }
      case AnswerType.Number: {
        return <StringInputNumber disabled={disabled} />;
      }
      case AnswerType.Select: {
        return <StringSelect disabled={disabled} options={question.options} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Row>
      {questions.map((question) => {
        if (
          question.dependentOnQuestionId !== null &&
          question.dependentOnQuestionId
        ) {
          return (
            <Col span={24}>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                  // @ts-ignore
                  prevValues[question.dependentOnQuestionId] !==
                  // @ts-ignore
                  curValues[question.dependentOnQuestionId]
                }
              >
                {({ getFieldValue }) => {
                  const currentValue = getFieldValue(
                    question.dependentOnQuestionId || ''
                  ) as string | undefined;
                  return currentValue?.toLowerCase() ===
                    question.dependentOnAnswerValue ? (
                    <Form.Item
                      name={question.questionId}
                      label={question.label}
                      rules={[
                        {
                          required: question.required,
                          message: intl.formatMessage({
                            id: '6B5Jtu',
                            defaultMessage: 'This field is required.',
                          }),
                        },
                      ]}
                    >
                      {getFieldType(question, question.answerType)}
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item>
            </Col>
          );
        }
        return (
          <Col span={24}>
            {question.answerType === AnswerType.String && (
              <Form.Item
                name={question.questionId}
                label={question.label}
                rules={[
                  {
                    required: question.required,
                    message: intl.formatMessage({
                      id: '6B5Jtu',
                      defaultMessage: 'This field is required.',
                    }),
                  },
                ]}
              >
                <Input.TextArea
                  style={{ maxWidth: '50%' }}
                  rows={1}
                  disabled={disabled}
                />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Date && (
              <Form.Item
                name={question.questionId}
                label={question.label}
                rules={[
                  {
                    required: question.required,
                    message: intl.formatMessage({
                      id: '6B5Jtu',
                      defaultMessage: 'This field is required.',
                    }),
                  },
                ]}
              >
                <StringDate disabled={disabled} />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Time && (
              <Form.Item
                name={question.questionId}
                label={question.label}
                rules={[
                  {
                    required: question.required,
                    message: intl.formatMessage({
                      id: '6B5Jtu',
                      defaultMessage: 'This field is required.',
                    }),
                  },
                ]}
              >
                <StringTime disabled={disabled} />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Boolean && (
              <Form.Item
                name={question.questionId}
                label={question.label}
                rules={[
                  {
                    required: question.required,
                    message: intl.formatMessage({
                      id: '6B5Jtu',
                      defaultMessage: 'This field is required.',
                    }),
                  },
                ]}
              >
                <Radio.Group
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
                  disabled={disabled}
                />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Number && (
              <Form.Item
                name={question.questionId}
                label={question.label}
                rules={[
                  {
                    required: question.required,
                    message: intl.formatMessage({
                      id: '6B5Jtu',
                      defaultMessage: 'This field is required.',
                    }),
                  },
                ]}
              >
                <StringInputNumber disabled={disabled} />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Select && (
              <Form.Item
                name={question.questionId}
                label={question.label}
                rules={[
                  {
                    required: question.required,
                    message: intl.formatMessage({
                      id: '6B5Jtu',
                      defaultMessage: 'This field is required.',
                    }),
                  },
                ]}
              >
                <StringSelect disabled={disabled} options={question.options} />
              </Form.Item>
            )}
          </Col>
        );
      })}
    </Row>
  );
};

export default CustomQuestions;
