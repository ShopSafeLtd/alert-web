import React from 'react';
import { Col, Form, Input, Radio, Row } from 'antd';
import { useIntl } from 'react-intl';

interface Props {
  saving: boolean;
  knowAddress: boolean | undefined;
}

const OffenderFormAddress = ({ knowAddress, saving }: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="knowAddress"
            label={intl.formatMessage({
              defaultMessage: "Do you know the offender's address?",
              id: 'QkATJt',
            })}
            tooltip={intl.formatMessage({
              defaultMessage:
                'If there is a known address for the offender please select Yes and enter the details.',
              id: 's0SFLa',
            })}
          >
            <Radio.Group disabled={saving}>
              <Radio.Button value>
                {intl.formatMessage({
                  defaultMessage: 'Yes',
                  id: 'a5msuh',
                })}
              </Radio.Button>
              <Radio.Button value={false}>
                {intl.formatMessage({ defaultMessage: 'No', id: 'oUWADl' })}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {knowAddress && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="addressAlias"
              label={intl.formatMessage({
                defaultMessage: 'Label',
                id: '753yX5',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'A friendly name for the address to identify it, such as home',
                id: 'YI+p4u',
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
                id: 'oS/nae',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="street"
              label={intl.formatMessage({
                defaultMessage: 'Street',
                id: 'BaIwdV',
              })}
              rules={[
                {
                  required: knowAddress,
                  message: intl.formatMessage({
                    defaultMessage: `Please enter a street for the offender's address.`,
                    id: 'RwcUFt',
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
                id: 'byaTQZ',
              })}
              rules={[
                {
                  required: knowAddress,
                  message: intl.formatMessage({
                    defaultMessage: `Please enter a town/city for the offender's address.`,
                    id: '3QDCjV',
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="county"
              label={intl.formatMessage({
                defaultMessage: 'County',
                id: 'B+KJhc',
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
                id: 'FJhjgz',
              })}
              rules={[
                {
                  required: knowAddress,
                  message: intl.formatMessage({
                    defaultMessage: `Please enter a postcode for the offender's address.`,
                    id: 'zAyuiS',
                  }),
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
