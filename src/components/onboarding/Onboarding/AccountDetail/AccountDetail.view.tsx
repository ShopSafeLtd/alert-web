import React from 'react';
import { CurrentUserQuery } from 'graphql/generated';
import { Button, Card, Typography, Form, Row, Col, Input } from 'antd';

const { Title, Text } = Typography;

interface AccountData {
  fullName: string;
}

interface Props {
  onSubmit: (value: AccountData) => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
}
const EditProfile = ({
  onSubmit,
  data,
  loading,
  saving,
}: Props): JSX.Element => (
  <div className="list-view">
    <Row style={{ margin: 15 }}>
      <Col>
        <Title level={3}>Account Details</Title>
        <Text>
          Please review your account details and correct any errors or fill in
          any missing information.
        </Text>
      </Col>
    </Row>
    <Card
      bordered={false}
      loading={loading}
      // title="Account Details"
      style={{ width: '98%' }}
    >
      <Form
        initialValues={{
          fullName: data?.currentUser?.fullName,
        }}
        onFinish={onSubmit}
      >
        <Row gutter={50}>
          <Col span={11}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter a name for the user.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={20} justify="end">
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export default EditProfile;
