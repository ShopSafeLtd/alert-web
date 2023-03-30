import React from 'react';
import {
  Button,
  // PageHeader,
  Card,
  Typography,
  Form,
  Row,
  Col,
  Input,
  Image,
} from 'antd';
import logo from '../../../images/icon-512.png';

const { Title, Text } = Typography;

interface FormData {
  password: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
}
const SetPassword = ({ onSubmit, saving }: Props): JSX.Element => (
  <div className="list-view">
    <Row gutter={10} style={{ margin: 8 }}>
      <Col>
        <Image width={50} src={logo} alt="ShopSafe Icon" />
      </Col>
      <Col>
        <Title
          style={{
            marginTop: 5,
          }}
        >
          Welcome to Alert!
        </Title>
      </Col>
    </Row>

    <Card style={{ minHeight: '100vh' }}>
      <Title level={3}>Set Password</Title>
      <Text>
        Please set your password, you will use this to log into Alert in the
        future. It must contain upper and lower case letters, a number, and be
        at least 8 characters long.
      </Text>
      <Form onFinish={onSubmit} style={{ marginTop: 30 }}>
        <Row>
          <Col span={9}>
            <Form.Item
              name="password"
              label="New Password   "
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please set a password for the account.',
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,}$/,
                  message:
                    'Password must contain upper and lower case letters, a number, and be at least 8 characters long.',
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="input password"
                disabled={saving}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" disabled={saving} />
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
                Set Password
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export default SetPassword;
