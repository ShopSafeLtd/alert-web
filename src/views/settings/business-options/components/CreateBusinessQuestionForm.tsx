import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Switch, notification } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Option } = Select;

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateBusinessQuestionForm: React.FC<Props> = ({
  onCancel,
  onSuccess,
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [answerType, setAnswerType] = useState<string>('TEXT');

  const handleSubmit = (_values: unknown) => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The business question has been created successfully.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Question Created',
        }),
      });
      setSaving(false);
      onSuccess();
    }, 1000);
  };

  const showOptionsField = ['MULTISELECT', 'SELECT'].includes(answerType);

  return (
    <Form
      form={form}
      initialValues={{
        active: true,
        answerType: 'TEXT',
        required: false,
      }}
      layout="vertical"
      onFinish={(values) => {
        handleSubmit(values);
      }}
    >
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Question' })}
        name="question"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a question',
            }),
            required: true,
          },
        ]}
      >
        <Input.TextArea
          placeholder={intl.formatMessage({
            defaultMessage: 'Enter the question text',
          })}
          rows={2}
        />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Answer Type' })}
        name="answerType"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please select an answer type',
            }),
            required: true,
          },
        ]}
      >
        <Select onChange={setAnswerType}>
          <Option value="TEXT">
            <FormattedMessage defaultMessage="Text" />
          </Option>
          <Option value="NUMBER">
            <FormattedMessage defaultMessage="Number" />
          </Option>
          <Option value="DATE">
            <FormattedMessage defaultMessage="Date" />
          </Option>
          <Option value="BOOLEAN">
            <FormattedMessage defaultMessage="Yes/No" />
          </Option>
          <Option value="SELECT">
            <FormattedMessage defaultMessage="Single Select" />
          </Option>
          <Option value="MULTISELECT">
            <FormattedMessage defaultMessage="Multi Select" />
          </Option>
        </Select>
      </Form.Item>

      {showOptionsField && (
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Options' })}
          required
        >
          <Form.List
            name="options"
            rules={[
              {
                validator: (_rule, options: unknown[]) => {
                  if (!options || options.length < 2) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage: 'At least 2 options are required',
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
                {fields.map((field, index) => (
                  <Space
                    align="baseline"
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <Form.Item
                      {...field}
                      noStyle
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage:
                              'Please input option or delete this field',
                          }),
                          required: true,
                          whitespace: true,
                        },
                      ]}
                      validateTrigger={['onChange', 'onBlur']}
                    >
                      <Input
                        placeholder={intl.formatMessage(
                          { defaultMessage: 'Option {number}' },
                          { number: index + 1 }
                        )}
                        style={{ width: 400 }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    block
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    type="dashed"
                  >
                    <FormattedMessage defaultMessage="Add Option" />
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      )}

      <Space direction="vertical" style={{ width: '100%' }}>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Required Field' })}
          name="required"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Active' })}
          name="active"
          valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>
      </Space>

      <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
        <Space>
          <Button htmlType="submit" loading={saving} type="primary">
            <FormattedMessage defaultMessage="Create Question" />
          </Button>
          <Button disabled={saving} onClick={onCancel}>
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateBusinessQuestionForm;
