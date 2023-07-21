import { Col, DatePicker, Form, Input, InputNumber, Radio, Row } from 'antd';
import React from 'react';
import { AnswerType } from 'graphql/generated';
import type { CustomQuestion } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { Moment } from 'moment';
import moment from 'moment';

interface StringInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled: boolean;
}

const StringInputNumber = ({ value, onChange, disabled }: StringInputProps) => {
  const covertToString = (data: number) => {
    if (onChange) onChange(data.toString());
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
  const covertToString = (data: Moment) => {
    if (onChange) onChange(data.toString());
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

interface Props {
  questions: CustomQuestion[];
  disabled: boolean;
}

const CustomQuestions = ({ questions, disabled }: Props) => {
  const intl = useIntl();
  return (
    <Row>
      {questions.map((question) => (
        <Col span={24}>
          {question.answerType === AnswerType.String && (
            <Form.Item
              name={question.questionId}
              label={question.label}
              required={question.required}
            >
              <Input.TextArea style={{ maxWidth: '50%' }} disabled={disabled} />
            </Form.Item>
          )}
          {question.answerType === AnswerType.Date && (
            <Form.Item
              name={question.questionId}
              label={question.label}
              required={question.required}
            >
              <StringDate format="DD/MM/YYYY" disabled={disabled} />
            </Form.Item>
          )}
          {question.answerType === AnswerType.Boolean && (
            <Form.Item
              name={question.questionId}
              label={question.label}
              required={question.required}
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
              required={question.required}
            >
              <StringInputNumber disabled={disabled} />
            </Form.Item>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default CustomQuestions;
