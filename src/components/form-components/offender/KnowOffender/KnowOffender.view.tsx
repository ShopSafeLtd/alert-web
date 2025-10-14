import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useKnowOffender';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const KnowOffender = ({ onClose, onSubmit, saving }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={30}>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the name of the offender.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the name of the offender',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Information Source',
              })}
              name="infoSource"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      "Please enter the information source of the offender's name.",
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  "Enter the information source of the offender's name",
              })}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
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
                htmlType="submit"
                loading={saving}
                type="primary"
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
