import { Col, Form, Input, Radio, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  knowAddress: boolean | undefined;
  saving: boolean;
}

const OffenderFormAddress = ({ knowAddress, saving }: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: "Do you know the offender's address?",
            })}
            name="knowAddress"
            tooltip={intl.formatMessage({
              defaultMessage:
                'If there is a known address for the offender please select Yes and enter the details.',
            })}
          >
            <Radio.Group disabled={saving}>
              <Radio.Button value>
                {intl.formatMessage({
                  defaultMessage: 'Yes',
                })}
              </Radio.Button>
              <Radio.Button value={false}>
                {intl.formatMessage({ defaultMessage: 'No' })}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {knowAddress && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Label',
              })}
              name="addressAlias"
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
              label={intl.formatMessage({
                defaultMessage: 'Building',
              })}
              name="building"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Street',
              })}
              name="street"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      "Please enter a street for the offender's address.",
                  }),
                  required: knowAddress,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Town/City',
              })}
              name="townCity"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      "Please enter a town/city for the offender's address.",
                  }),
                  required: knowAddress,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'County',
              })}
              name="county"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Postcode',
              })}
              name="postcode"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      "Please enter a postcode for the offender's address.",
                  }),
                  required: knowAddress,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
};
export default OffenderFormAddress;
