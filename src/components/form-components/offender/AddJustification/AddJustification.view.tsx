import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddJustification';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddJustification = ({
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={30}>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Justification',
              })}
              name="justification"
              tooltip={intl.formatMessage({
                defaultMessage:
                  "Enter a justification to explain why this offender doesn't connect with an incident.",
              })}
              // rules={[
              //   {
              //     required: needJustification,
              //     message: intl.formatMessage({
              //       defaultMessage:
              //         'Please enter a justification for the offender.',
              //       id: '11rxZC',
              //     }),
              //   },
              // ]}
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
export default AddJustification;
