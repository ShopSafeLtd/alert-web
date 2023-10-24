import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import type { LocationData } from 'types/DataType';

interface AddressForm {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface Props {
  data?: LocationData;
  onClose: () => void;
  onSubmit: (data: AddressForm) => void;
}

const EditOffenderAddress = ({ onClose, onSubmit, data }: Props) => {
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
            name="alias"
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
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
              id: 'BaIwdV',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the new address.',
                  id: 'd3uFRh',
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
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a town/city for the new address.',
                  id: 'YxqXbK',
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
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a postcode for the new address.',
                  id: 'iBIFWL',
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
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({
                defaultMessage: 'Save Address',
                id: 'xlfAGs',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditOffenderAddress;
