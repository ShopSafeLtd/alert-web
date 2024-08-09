import type { FormInstance } from 'antd';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

export interface FormData {
  description: string;
  name: string;
  users: string[];
}

interface Props {
  form: FormInstance<FormData>;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
}

const AddChat = ({
  form,
  onClose,
  onSubmit,
  saving,
  usersData,
  usersLoading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new chat group.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Users',
            })}
            name="users"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please add at least one user for the new chat group.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              filterOption
              loading={usersLoading}
              maxTagCount={3}
              mode="multiple"
              optionFilterProp="label"
              options={usersData?.users.map((user) => ({
                label: `${user.fullName} (${user.businesses[0]?.name})`,
                value: user.id,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
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
