import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { useIntl } from 'react-intl';
import LocatingCard from 'components/map/LocatingCard';
import type { LocationData } from 'types/DataType';

interface FormData {
  name: string;
  parent: {
    label: string;
    value: string;
  };
  building: string;
  street: string;
  townCity: string;
  county: string;
  publicName: boolean;
  postcode: string;
}

interface Props {
  onSubmit: (values: FormData) => void;
  onClose: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  saving: boolean;
  loading: boolean;
  form: FormInstance<FormData>;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
}

const EditBusiness = ({
  onSubmit,
  onClose,
  onSearchBusiness,
  saving,
  form,
  loading,
  location,
  setLocation,
}: Props) => {
  const intl = useIntl();

  return (
    <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
      <Form.Item
        name="name"
        label={intl.formatMessage({
          defaultMessage: 'Business Name',
          id: 'pGwRxT',
        })}
        rules={[{ required: true }]}
      >
        {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
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
        {loading ? (
          <Skeleton.Input />
        ) : (
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
        )}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
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
            {loading ? (
              <Skeleton.Input />
            ) : (
              <Input style={{ width: 200 }} disabled={saving} />
            )}
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
            {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
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
                defaultMessage: 'Save Business',
                id: 'Dk/kmv',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditBusiness;
