import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Row,
  Space,
  Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import SignatureInput from '../../../SignBox';

const { Text, Title } = Typography;

interface Props {
  onSubmit: () => void;
  update: (value: unknown) => void;
  saving: boolean;
  setCurrent: (value: number) => void;
  content: string;
  updateBox: () => void;
}

const SchemeTerms = ({
  onSubmit,
  update,
  saving,
  setCurrent,
  content,
  updateBox,
}: Props): JSX.Element => {
  setCurrent(2);

  return (
    <div className="list-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>Terms of Use</Title>

          <Text>
            Please read through the terms and conditions and accept them to
            continue.
          </Text>

          {/* <Text>
              Please read through our terms and conditions and accept them to
              continue.
            </Text> */}
        </Col>
      </Row>
      <Card style={{ width: '98%' }}>
        <Space direction="vertical" style={{ fontSize: 12 }} size={1}>
          <div // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: content || '',
            }}
          />
        </Space>
      </Card>
      <Form onFinish={onSubmit}>
        <Row gutter={10} justify="end">
          <Col>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Please agree to the terms and conditions!')
                        ),
                },
              ]}
            >
              <Checkbox onChange={updateBox}>
                <Title level={4}>
                  I confirm that I have read and agree to the above terms and
                  conditions.
                </Title>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10} justify="end">
          <Col>
            <Form.Item
              name="termsSignature"
              rules={[
                {
                  required: true,
                  message: 'Please sign the terms',
                },
              ]}
            >
              <SignatureInput hidden={false} onChange={update} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Link to="/app/onboarding/terms-conditions">
                <Button
                  disabled={saving}
                  type="primary"
                  onClick={() => {
                    // window.history.back();
                    setCurrent(1);
                  }}
                >
                  Back
                </Button>
              </Link>
            </Col>

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
    </div>
  );
};
export default SchemeTerms;
