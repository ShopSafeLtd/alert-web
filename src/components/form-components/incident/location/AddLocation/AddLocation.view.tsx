import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import type { LocationData } from 'types/DataType';

interface Props {
  onClose: () => void;
  onSubmit: (value: LocationData) => void;
  saving: boolean;
}

const AddLocation = ({ onClose, onSubmit, saving }: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="building"
            label={intl.formatMessage({
              defaultMessage: 'Building',
              id: 'oS/nae',
            })}
          >
            <Input disabled={saving} />
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
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the new location.',
                  id: 'LDupfj',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
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
                    'Please enter a town/city for the new location.',
                  id: 'MVCGSr',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
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
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
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
                    'Please enter a postcode for the new location.',
                  id: 'NwJPpe',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddLocation;
