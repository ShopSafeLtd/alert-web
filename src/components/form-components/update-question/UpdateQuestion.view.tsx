/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { FormInstance } from 'antd';
import { Button, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import type { FormData } from './useUpdateQuestion';
import { AnswerType } from '../../../graphql/generated';

interface AddQuestionViewProps {
  loading: boolean;
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
}

const UpdateQuestionView = ({
  data,
  loading,
  form,
  onSubmit,
  onClose,
  saving,
}: AddQuestionViewProps) => {
  const answerType = data.type;
  const opt = data.newOptions || [];
  const intl = useIntl();

  return (
    <Form<FormData>
      form={form}
      initialValues={data}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Card loading={loading}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Question',
            id: 'kgOBET',
          })}
          name="newQuestion"
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Required',
            id: 'Seanpx',
          })}
          name="required"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Card>

      {answerType === AnswerType.Select && (
        <Card
          style={{
            maxHeight: 500,
            overflow: 'auto',
          }}
          title={intl.formatMessage({
            defaultMessage: 'Options',
            id: 'NDV5Mq',
          })}
        >
          <Form.List
            name="newOptions"
            initialValue={opt}
            rules={[
              {
                validator: async (_, options) => {
                  if (answerType !== AnswerType.Select) return;
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

export default UpdateQuestionView;
