/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,unicorn/no-useless-promise-resolve-reject,consistent-return,@typescript-eslint/no-unsafe-call */
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { FormData } from './useUpdateQuestion';
import { AnswerType } from '../../../graphql/types';
import type { TagQuestion } from './UpdateQuestion.container';

interface AddQuestionViewProps {
  loading: boolean;
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  tagQuestions: TagQuestion[];
  brands: {
    label: string;
    value: string;
  }[];
}

const UpdateQuestionView = ({
  data,
  loading,
  form,
  onSubmit,
  onClose,
  saving,
  tagQuestions,
  brands,
}: AddQuestionViewProps) => {
  const answerType = data.type;
  const opt = data.newOptions || [];
  const intl = useIntl();
  const dependentOn = Form.useWatch('dependentOn', form);
  const generateFormItem = () => {
    const dependentQuestion = tagQuestions.find(
      (q) => q.tagQuestionId === dependentOn
    );
    if (!dependentOn || !dependentQuestion) return <div />;
    switch (dependentQuestion.type) {
      case AnswerType.String: {
        return <Input />;
      }
      case AnswerType.Boolean: {
        return (
          <Radio.Group size="small">
            <Radio.Button value="true">
              <FormattedMessage defaultMessage="Yes" />
            </Radio.Button>
            <Radio.Button value="false">
              <FormattedMessage defaultMessage="No" />
            </Radio.Button>
          </Radio.Group>
        );
      }
      case AnswerType.Date: {
        return <DatePicker />;
      }
      case AnswerType.Time: {
        return <DatePicker.TimePicker />;
      }
      case AnswerType.Select: {
        return (
          <Select
            options={dependentQuestion.options?.map((o) => ({
              label: o,
              value: o.toLowerCase(),
            }))}
          />
        );
      }
      case AnswerType.Number: {
        return <InputNumber />;
      }
      default: {
        return <div />;
      }
    }
  };
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
          })}
          name="newQuestion"
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Required',
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
                        })
                      )
                    );
                  }
                  if (options.some((o: string | null | undefined) => !o)) {
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
        loading={loading}
        title={intl.formatMessage({
          defaultMessage: 'Dependencies',
        })}
      >
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Dependent Question',
          })}
          name="dependentOn"
        >
          <Select
            onSelect={() => form.setFieldsValue({ dependentAnswer: '' })}
            options={tagQuestions.map((q) => ({
              label: q.question,
              value: q.tagQuestionId,
            }))}
          />
        </Form.Item>
        {dependentOn && (
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Dependent Answer',
            })}
            rules={[
              {
                required: !!dependentOn,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select an answer that this question will depend on to show in the form',
                }),
              },
            ]}
            required={!!dependentOn}
            hidden={!dependentOn}
            name="dependentAnswer"
          >
            {generateFormItem()}
          </Form.Item>
        )}

        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Dependent Brands',
          })}
          name="dependentBrands"
          hidden={brands?.length === 0}
        >
          <Select options={brands} mode="multiple" showSearch />
        </Form.Item>
      </Card>
      <Form.Item>
        <Row style={{ marginTop: 10 }} gutter={10} justify="end">
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
              loading={saving || loading}
              type="primary"
              htmlType="submit"
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
