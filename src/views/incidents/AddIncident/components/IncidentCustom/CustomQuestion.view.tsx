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
        console.log({ qid: question.questionId });
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
