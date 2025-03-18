/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-base-to-string */
import type { Moment } from 'moment';
import type { CustomQuestion } from 'types/DataType';

// todo check data.tostring types
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
import { AnswerType } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

import CheckTags from '../../../../../components/form-components/check-tags/CheckTags.view';

interface StringInputProps {
  disabled: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

const StringInputNumber = ({ disabled, onChange, value }: StringInputProps) => {
  const covertToString = (data: null | number) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <InputNumber
      disabled={disabled}
      onChange={covertToString}
      style={{ minWidth: 200 }}
      value={value ? Number(value) : undefined}
    />
  );
};

const StringDate = ({ disabled, onChange, value }: StringInputProps) => {
  const covertToString = (data: Moment | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <DatePicker
      disabled={disabled}
      format="DD/MM/YYYY"
      onChange={covertToString}
      style={{ minWidth: 150 }}
      value={value ? moment(value) : undefined}
    />
  );
};

const StringTime = ({ disabled, onChange, value }: StringInputProps) => {
  const covertToString = (data: Moment | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <TimePicker
      disabled={disabled}
      onChange={covertToString}
      style={{ minWidth: 150 }}
      value={value ? moment(value) : null}
    />
  );
};

interface SelectInputProps extends StringInputProps {
  options: { label: string; value: string }[];
  radioAnswer?: boolean;
}

const StringSelect = ({
  disabled,
  onChange,
  options,
  radioAnswer,
  value,
}: SelectInputProps) => {
  const covertToString = (data: string[]) => {
    if (onChange) onChange(data.toString());
  };

  return (
    <CheckTags
      disabled={disabled}
      mode={radioAnswer ? 'radio' : 'check'}
      onChange={covertToString}
      options={options}
      value={value ? value.split(',') : []}
    />
  );
};

interface Props {
  disabled: boolean;
  questions: CustomQuestion[];
  radioAnswer?: boolean;
}

const CustomQuestions = ({ disabled, questions, radioAnswer }: Props) => {
  const intl = useIntl();

  const getFieldType = (question: CustomQuestion, type: AnswerType) => {
    switch (type) {
      case AnswerType.String: {
        return (
          <Input.TextArea
            disabled={disabled}
            rows={1}
            style={{ maxWidth: '50%' }}
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
            disabled={disabled}
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
          />
        );
      }
      case AnswerType.Number: {
        return <StringInputNumber disabled={disabled} />;
      }
      case AnswerType.Select: {
        return <StringSelect disabled={disabled} options={question.options} />;
      }
      case AnswerType.SelectSingle: {
        return (
          <StringSelect
            disabled={disabled}
            options={question.options}
            radioAnswer
          />
        );
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
            <Col key={question.questionId} span={24}>
              <Form.Item
                // rules={[{ required: true, message: 'Missing answer' }]}
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                  // @ts-ignore
                  prevValues[question.dependentOnQuestionId] !==
                  // @ts-ignore
                  curValues[question.dependentOnQuestionId]
                }
                tooltip={question.tooltip}
              >
                {({ getFieldValue }) => {
                  const currentValue = getFieldValue(
                    question.dependentOnQuestionId || ''
                  ) as string | undefined;
                  return currentValue?.toLowerCase() ===
                    question.dependentOnAnswerValue ? (
                    <Form.Item
                      label={question.label}
                      name={question.questionId}
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'This field is required.',
                          }),
                          required: question.required,
                        },
                      ]}
                      tooltip={question.tooltip}
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
          <Col key={question.questionId} span={24}>
            {question.answerType === AnswerType.String && (
              <Form.Item
                label={question.label}
                name={question.questionId}
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'This field is required.',
                    }),
                    required: question.required,
                  },
                ]}
                tooltip={question.tooltip}
              >
                <Input.TextArea
                  disabled={disabled}
                  rows={1}
                  style={{ maxWidth: '50%' }}
                />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Date && (
              <Form.Item
                label={question.label}
                name={question.questionId}
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'This field is required.',
                    }),
                    required: question.required,
                  },
                ]}
                tooltip={question.tooltip}
              >
                <StringDate disabled={disabled} />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Time && (
              <Form.Item
                label={question.label}
                name={question.questionId}
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'This field is required.',
                    }),
                    required: question.required,
                  },
                ]}
                tooltip={question.tooltip}
              >
                <StringTime disabled={disabled} />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Boolean && (
              <Form.Item
                label={question.label}
                name={question.questionId}
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'This field is required.',
                    }),
                    required: question.required,
                  },
                ]}
                tooltip={question.tooltip}
              >
                <Radio.Group
                  disabled={disabled}
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
                />
              </Form.Item>
            )}
            {question.answerType === AnswerType.Number && (
              <Form.Item
                label={question.label}
                name={question.questionId}
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'This field is required.',
                    }),
                    required: question.required,
                  },
                ]}
                tooltip={question.tooltip}
              >
                <StringInputNumber disabled={disabled} />
              </Form.Item>
            )}
            {(question.answerType === AnswerType.Select ||
              question.answerType === AnswerType.SelectSingle) && (
              <Form.Item
                label={question.label}
                name={question.questionId}
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'This field is required.',
                    }),
                    required: question.required,
                  },
                ]}
                tooltip={question.tooltip}
              >
                <StringSelect
                  disabled={disabled}
                  options={question.options}
                  radioAnswer={
                    radioAnswer ||
                    question.answerType === AnswerType.SelectSingle
                  }
                />
              </Form.Item>
            )}
          </Col>
        );
      })}
    </Row>
  );
};

export default CustomQuestions;
