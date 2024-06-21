import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useIntl } from 'react-intl';
import type { FormData } from './useAddJustification';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddJustification = ({
  onSubmit,
  saving,
  onClose,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Form onFinish={onSubmit} layout="vertical">
        <Row gutter={30}>
          <Col span={24}>
            <Form.Item
              name="justification"
              label={intl.formatMessage({
                defaultMessage: 'Justification',
              })}
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
export default AddJustification;
