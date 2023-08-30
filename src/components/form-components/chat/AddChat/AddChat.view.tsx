import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useIntl } from 'react-intl';
import type { ListSchemeUsersQuery } from 'graphql/generated';

export interface FormData {
  name: string;
  description: string;
  users: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
  form: FormInstance<FormData>;
}

const AddChat = ({
  onSubmit,
  onClose,
  usersData,
  usersLoading,
  saving,
  form,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new chat group.',
                  id: 'DqoZy3',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={23}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="users"
            label={intl.formatMessage({
              defaultMessage: 'Users',
              id: 'YDMrKK',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please add at least one user for the new chat group.',
                  id: 'c8IWbz',
                }),
              },
            ]}
          >
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              filterOption
              optionFilterProp="label"
              options={usersData?.users.map((user) => ({
                value: user.id,
                label: `${user.fullName} (${user.businesses[0]?.name})`,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({
                defaultMessage: 'Create Chat Group',
                id: 'z0zYUX',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddChat;
