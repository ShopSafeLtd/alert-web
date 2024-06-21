import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useIntl, FormattedMessage } from 'react-intl';

interface OnSubmitValues {
  name: string;
}

interface Props {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  onClose: () => void;
}

const SaveAs = ({ onSubmit, saving, onClose }: Props) => {
  const intl = useIntl();

  return (
    <Card style={{ marginLeft: 20, marginRight: 20 }}>
      <Form<OnSubmitValues>
        initialValues={{
          name: '',
        }}
        onFinish={onSubmit}
      >
        <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please input a name!',
                  }),
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  defaultMessage: 'Name',
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                <FormattedMessage defaultMessage="Cancel" />
              </Button>
            </Col>
            <Col>
              <Button
                loading={saving}
                disabled={saving}
                type="primary"
                htmlType="submit"
              >
                <FormattedMessage defaultMessage="Save As" />
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SaveAs;
