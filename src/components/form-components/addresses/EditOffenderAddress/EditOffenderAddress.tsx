import type { LocationData } from 'types/DataType';

import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface AddressForm {
  alias: string;
  building: string;
  county: string;
  id: string;
  postcode: string;
  street: string;
  townCity: string;
}

interface Props {
  data?: LocationData;
  onClose: () => void;
  onSubmit: (data: AddressForm) => void;
}

const EditOffenderAddress = ({ data, onClose, onSubmit }: Props) => {
  const intl = useIntl();

  return (
    <Form<AddressForm>
      initialValues={data}
      layout="vertical"
      onFinish={(formData) => {
        onSubmit({
          ...formData,
          id: data?.id || '',
        });
      }}
    >
      {/* <Form.Item
        name="location"
        label={intl.formatMessage({
          defaultMessage: 'Location',
          id: 'rvirM2',
        })}
      >
        <LocatingCard
          width="100%"
          height={194}
          location={location}
          setLocation={setLocation}
        />
      </Form.Item> */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Label',
            })}
            name="alias"
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
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Street',
            })}
            name="street"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the new address.',
                }),
                required: true,
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
                    'Please enter a town/city for the new address.',
                }),
                required: true,
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
                    'Please enter a postcode for the new address.',
                }),
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button htmlType="submit" type="primary">
              {intl.formatMessage({
                defaultMessage: 'Save Address',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditOffenderAddress;
