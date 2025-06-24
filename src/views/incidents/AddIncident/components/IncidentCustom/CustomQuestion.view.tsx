/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-base-to-string */

import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { CustomQuestion } from 'types/DataType';

import CustomQuestionInput from '#/views/incidents/AddIncident/components/IncidentCustom/CustomQuestionInput.view';
import { Col, Form, type FormInstance, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  disabled: boolean;
  form?: FormInstance<FormData>;
  questions: CustomQuestion[];
  radioAnswer?: boolean;
}

const CustomQuestions = ({ disabled, form, questions }: Props) => {
  const intl = useIntl();

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
                  const dependentValues = getFieldValue(
                    question.dependentOnQuestionId || ''
                  ) as string | string[] | undefined;
                  const valuesArray =
                    question.dependentOnAnswerValueArray || [];
                  const mode = question.dependentMode;
                  let shouldRender = false;

                  // Normalize answer array and mode-based matching
                  const lowerValuesArray = valuesArray.map((v) =>
                    v.toLowerCase()
                  );
                  let selectedValues: string[] = [];
                  if (Array.isArray(dependentValues)) {
                    // direct array of selected values
                    selectedValues = dependentValues.map((v) =>
                      String(v).toLowerCase()
                    );
                  } else if (typeof dependentValues === 'string') {
                    const raw = dependentValues;
                    if (raw.includes('|||')) {
                      selectedValues = raw
                        .split('|||')
                        .map((v) => v.trim().toLowerCase())
                        .filter(Boolean);
                    } else if (raw.includes(',')) {
                      selectedValues = raw
                        .split(',')
                        .map((v) => v.trim().toLowerCase())
                        .filter(Boolean);
                    } else {
                      selectedValues = [raw.trim().toLowerCase()];
                    }
                  }

                  if (mode !== null && lowerValuesArray.length > 0) {
                    if (mode === 'any') {
                      shouldRender = lowerValuesArray.some((val) =>
                        selectedValues.includes(val)
                      );
                    } else if (mode === 'all') {
                      shouldRender = lowerValuesArray.every((val) =>
                        selectedValues.includes(val)
                      );
                    }
                  } else {
                    // Fallback to single-value logic if no array-based criteria
                    const currentValue = (
                      Array.isArray(dependentValues)
                        ? dependentValues[0]
                        : dependentValues
                    )?.toLowerCase();
                    shouldRender =
                      currentValue ===
                      question.dependentOnAnswerValue?.toLowerCase();
                  }

                  return shouldRender ? (
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
                      <CustomQuestionInput
                        disabled={disabled}
                        form={form}
                        question={question}
                      />
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item>
            </Col>
          );
        }
        return (
          <Col key={question.questionId} span={24}>
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
              <CustomQuestionInput
                disabled={disabled}
                form={form}
                question={question}
              />
            </Form.Item>
          </Col>
        );
      })}
    </Row>
  );
};

export default CustomQuestions;
