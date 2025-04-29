/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { FormInstance } from 'antd';

import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useUpdateQuestion';

import { AnswerType } from '../../../graphql/types';

interface AddQuestionViewProps {
  data: FormData;
  form: FormInstance<FormData>;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const UpdateQuestionView = ({
  data,
  form,
  loading,
  onClose,
  onSubmit,
  saving,
}: AddQuestionViewProps) => {
  const answerType = data.type;
  const opt = data.newOptions || [];
  const intl = useIntl();

  return (
    <Form<FormData>
      form={form}
      initialValues={data}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Card loading={loading}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Question',
          })}
          name="newQuestion"
          required
        >
          <Input />
        </Form.Item>
      </Card>

      {(answerType === AnswerType.Select ||
        answerType === AnswerType.SelectSingle) && (
        <Card
          style={{
            maxHeight: 500,
            overflow: 'auto',
          }}
          title={intl.formatMessage({
            defaultMessage: 'Options',
          })}
        >
          <Form.List
            initialValue={opt}
            name="newOptions"
            rules={[
              {
                validator: async (_, options) => {
                  if (
                    answerType !== AnswerType.Select &&
                    answerType !== AnswerType.SelectSingle
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

export default UpdateQuestionView;
