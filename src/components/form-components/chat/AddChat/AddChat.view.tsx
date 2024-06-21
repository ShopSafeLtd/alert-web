import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useIntl } from 'react-intl';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';

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
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new chat group.',
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
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please add at least one user for the new chat group.',
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
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
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
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddChat;
