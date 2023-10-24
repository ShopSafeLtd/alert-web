import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Switch, Typography } from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { useIntl } from 'react-intl';
import type { LocationData } from 'types/DataType';
import LocatingCard from 'components/map/LocatingCard';
import type { FormData } from './useAddBusiness';

interface Props {
  onSubmit: (values: FormData) => void;
  onClose: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  saving: boolean;
  form: FormInstance<FormData>;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
}

const AddBusiness = ({
  onSubmit,
  onClose,
  onSearchBusiness,
  saving,
  form,
  location,
  setLocation,
}: Props) => {
  const intl = useIntl();

  return (
    <Form<FormData>
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ publicName: true }}
      form={form}
    >
      <Form.Item
        name="name"
        label={intl.formatMessage({
          defaultMessage: 'Business Name',
          id: 'pGwRxT',
        })}
        rules={[{ required: true }]}
      >
        <Input disabled={saving} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Show business name in the system',
          id: 'yuNoZz',
        })}
        name="publicName"
        valuePropName="checked"
        style={{
          marginBottom: 0,
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <Switch
          disabled={saving}
          style={{ marginLeft: 10, marginTop: -22 }}
          className="scheme-detail-switch"
        />
      </Form.Item>
      <Form.Item
        name="parent"
        label={intl.formatMessage({
          defaultMessage: 'Parent Business',
          id: 'Av/UtY',
        })}
      >
        <DebounceSelect
          showSearch
          allowClear
          disabled={saving}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search for a business...',
            id: 'qaJxSS',
          })}
          fetchOptions={onSearchBusiness}
          style={{ width: 400 }}
        />
      </Form.Item>
      <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
        {intl.formatMessage({ defaultMessage: 'Location', id: 'rvirM2' })}
      </Typography.Text>
      <LocatingCard
        width="100%"
        height={194}
        location={location}
        setLocation={setLocation}
      />
      <Row style={{ marginTop: 10 }} gutter={16}>
        <Col>
          <Form.Item
            name="building"
            label={intl.formatMessage({
              defaultMessage: 'Building',
              id: 'oS/nae',
            })}
          >
            <Input style={{ width: 200 }} disabled={saving} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
              id: 'BaIwdV',
            })}
            // rules={[{ required: true }]}
          >
            <Input style={{ width: 200 }} disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item
            name="townCity"
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
              id: 'byaTQZ',
            })}
            // rules={[{ required: true }]}
          >
            <Input style={{ width: 200 }} disabled={saving} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="county"
            label={intl.formatMessage({
              defaultMessage: 'County',
              id: 'B+KJhc',
            })}
          >
            <Input style={{ width: 200 }} disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            name="postcode"
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
              id: 'FJhjgz',
            })}
            // rules={[{ required: true }]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              disabled={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({
                defaultMessage: 'Create Business',
                id: 'a1axpo',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddBusiness;
