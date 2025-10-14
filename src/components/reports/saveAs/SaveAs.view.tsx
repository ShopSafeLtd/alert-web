import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface OnSubmitValues {
  name: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
}

const SaveAs = ({ onClose, onSubmit, saving }: Props) => {
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
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please input a name!',
                  }),
                  required: true,
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
          <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                <FormattedMessage defaultMessage="Cancel" />
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
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
