import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useIntl } from 'react-intl';
import type { FormData } from './useKnowOffender';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const KnowOffender = ({ onSubmit, saving, onClose }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Form onFinish={onSubmit} layout="vertical">
        <Row gutter={30}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the name of the offender',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the name of the offender.',
                  }),
                },
              ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="infoSource"
              label={intl.formatMessage({
                defaultMessage: 'Information Source',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  "Enter the information source of the offender's name",
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      "Please enter the information source of the offender's name.",
                  }),
                },
              ]}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage({
                  defaultMessage: 'Save',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
export default KnowOffender;
