import {
  Col,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
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
  return (
    <Row>
      {questions.map((question) => (
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
      ))}
    </Row>
  );
};

export default CustomQuestions;
