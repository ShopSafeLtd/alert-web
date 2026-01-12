import type { ChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  description: string;
  name: string;
  user: string[];
}

interface Props {
  data: ChatQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
}

const EditChat = ({
  data,
  loading,
  onClose,
  onSubmit,
  saving,
  usersData,
  usersLoading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        description: data?.chat?.description,
        name: data?.chat?.name,
        user:
          data?.chat?.members && data.chat.members.length > 0
            ? data.chat.members.map(({ user }) => user.id)
            : [],
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the chat group.',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a description for the chat group.',
                }),
                required: true,
              },
            ]}
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
            name="user"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please add at least one user for the chat group.',
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
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditChat;
