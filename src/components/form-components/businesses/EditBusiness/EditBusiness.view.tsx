import React from 'react';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';

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
}

const EditBusiness = ({
  onSubmit,
  onClose,
  onSearchBusiness,
  saving,
  form,
  loading,
}: Props) => (
  <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
    <Form.Item name="name" label="Business Name" rules={[{ required: true }]}>
      {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
    </Form.Item>
    <Form.Item name="parent" label="Parent Business">
      {loading ? (
        <Skeleton.Input />
      ) : (
        <DebounceSelect
          showSearch
          allowClear
          disabled={saving}
          placeholder="Search for a business..."
          fetchOptions={onSearchBusiness}
          style={{ width: 400 }}
        />
      )}
    </Form.Item>
    <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
      Location
    </Typography.Text>
    <Row style={{ marginTop: 10 }} gutter={16}>
      <Col>
        <Form.Item name="building" label="Building">
          {loading ? (
            <Skeleton.Input />
          ) : (
            <Input style={{ width: 200 }} disabled={saving} />
          )}
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name="street" label="Street" rules={[{ required: true }]}>
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
          label="Town/City"
          rules={[{ required: true }]}
        >
          {loading ? (
            <Skeleton.Input />
          ) : (
            <Input style={{ width: 200 }} disabled={saving} />
          )}
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name="county" label="County">
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
          label="Postcode"
          rules={[{ required: true }]}
        >
          {loading ? <Skeleton.Input /> : <Input disabled={saving} />}
        </Form.Item>
      </Col>
    </Row>
    <Form.Item>
      <Row gutter={16} justify="end">
        <Col>
          <Button onClick={onClose}>Cancel</Button>
        </Col>
        <Col>
          <Button
            loading={saving}
            disabled={saving}
            type="primary"
            htmlType="submit"
          >
            Save Business
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default EditBusiness;
