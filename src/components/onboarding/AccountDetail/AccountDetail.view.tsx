import React from 'react';
import { CurrentUserQuery } from 'graphql/generated';
import { Button, Card, Typography, Form, Row, Col, Input } from 'antd';

const { Title, Text } = Typography;

interface AccountData {
  fullName: string;
  organisation: string;
  postcode: string;
  street: string;
  townCity: string;
  building: string | null;
  county: string | null;
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
          organisation: data?.currentUser?.organisation,
          postcode: data?.currentUser?.addresses[0].postcode || '',
          street: data?.currentUser?.addresses[0].street || '',
          townCity: data?.currentUser?.addresses[0].townCity || '',
          building: data?.currentUser?.addresses[0].building || '',
          county: data?.currentUser?.addresses[0].county || '',
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
          <Col span={11}>
            <Form.Item
              name="organisation"
              label="Organisation"
              rules={[
                {
                  required: true,
                  message: 'Please enter an organisation for the user.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Title level={3} style={{ marginBottom: 25 }}>
          Address:
        </Title>
        <Row gutter={50}>
          <Col span={11}>
            <Form.Item name="building" label="Building">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="street"
              label="Street"
              rules={[
                {
                  required: true,
                  message: 'Please enter a town/city for the address.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={50}>
          <Col span={11}>
            <Form.Item
              name="townCity"
              label="Town/City"
              rules={[
                {
                  required: true,
                  message: 'Please enter a town/city for the address.',
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="county" label="County">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={50}>
          <Col span={11}>
            <Form.Item
              name="postcode"
              label="Postcode"
              rules={[
                {
                  required: true,
                  message: 'Please enter postcode for the address.',
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
