import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface AddressForm {
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (data: AddressForm) => void;
}

const NewOffenderAddress = ({ onClose, onSubmit }: Props) => {
  const intl = useIntl();

  return (
    <Form<AddressForm> layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="alias"
            label={intl.formatMessage({
              defaultMessage: 'Label',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'A friendly name for the address to identify it, such as home',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="building"
            label={intl.formatMessage({
              defaultMessage: 'Building',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the new address.',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="townCity"
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a town/city for the new address.',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="county"
            label={intl.formatMessage({
              defaultMessage: 'County',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="postcode"
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a postcode for the new address.',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({
                defaultMessage: 'Add Address',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default NewOffenderAddress;
