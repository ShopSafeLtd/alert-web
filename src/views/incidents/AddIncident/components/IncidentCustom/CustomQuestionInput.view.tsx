import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { CustomQuestion } from 'types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
import { type FormInstance, Input, InputNumber, Modal, Radio } from 'antd';
import dayjs from 'dayjs';
import { AnswerType } from 'graphql/types';
import React, { useEffect } from 'react';
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
  const covertToString = (data: Date | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <DatePicker
      disabled={disabled}
      format="DD/MM/YYYY"
      onChange={covertToString}
      style={{ minWidth: 150 }}
      value={value ? dayjs(value).toDate() : undefined}
    />
  );
};

const StringTime = ({ disabled, onChange, value }: StringInputProps) => {
  const covertToString = (data: Date | null) => {
    if (onChange) onChange(data ? data.toString() : '');
  };

  return (
    <DatePicker.TimePicker
      disabled={disabled}
      onChange={covertToString}
      style={{ minWidth: 150 }}
      value={value ? dayjs(value).toDate() : null}
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
      value={value ? value.split(',').map((item) => item.trim()) : []}
    />
  );
};

interface Props {
  disabled: boolean;
  form?: FormInstance<FormData>;
  onChange?: (value: string) => void;
  question: CustomQuestion;
  value?: string;
}

const CustomQuestionInput = ({
  disabled,
  form,
  onChange,
  question,
  value,
}: Props) => {
  const intl = useIntl();

  useEffect(() => {
    if (question.actions.length > 0 && value) {
      for (const action of question.actions) {
        if (action.conditionValues.includes(value)) {
          if (action.type === 'TAG_SET') {
            Modal.info({
              content: intl.formatMessage({
                defaultMessage:
                  'Please be aware that the incident type has been changed based on your answer.',
              }),
              title: intl.formatMessage({
                defaultMessage: 'The incident type has been changed',
              }),
              type: 'info',
            });
            form?.setFieldsValue({
              tags: action.setValues,
            });
          }
          if (action.type === 'INVOLVED_SET') {
            form?.setFieldsValue({
              involvedTags: action.setValues,
            });
          }
        }
      }
    }
  }, [question, value]);

  switch (question.answerType) {
    case AnswerType.Date: {
      return (
        <StringDate disabled={disabled} onChange={onChange} value={value} />
      );
    }
    case AnswerType.Time: {
      return (
        <StringTime disabled={disabled} onChange={onChange} value={value} />
      );
    }
    case AnswerType.Boolean: {
      return (
        <Radio.Group
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value as string)}
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
          value={value}
        />
      );
    }
    case AnswerType.Number: {
      return (
        <StringInputNumber
          disabled={disabled}
          onChange={onChange}
          value={value}
        />
      );
    }
    case AnswerType.Select: {
      return (
        <StringSelect
          disabled={disabled}
          onChange={onChange}
          options={question.options}
          value={value}
        />
      );
    }
    case AnswerType.SelectSingle: {
      return (
        <StringSelect
          disabled={disabled}
          onChange={onChange}
          options={question.options}
          radioAnswer={question.answerType === AnswerType.SelectSingle}
          value={value}
        />
      );
    }
    default: {
      return (
        <Input.TextArea
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          rows={1}
          style={{ maxWidth: '50%' }}
          value={value}
        />
      );
    }
  }
};

export default CustomQuestionInput;
