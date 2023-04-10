import React from 'react';
import type { SelectProps, UploadProps } from 'antd';
import { Button, Card, Col, Form, Input, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface OnSubmitValues {
  name: string;
  url: string;
  categories: string[];
}

interface Props {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  categories: SelectProps['options'];
  categoriesLoading: boolean;
  selectedCategories: { value: string }[];
  categoriesChange: (categories: { value: string }[]) => void;
  onClose: () => void;
  documentUploadProps: UploadProps;
  investigationId?: string | null;
}

const AddBusiness = ({
  onSubmit,
  saving,
  selectedCategories,
  categories,
  categoriesChange,
  categoriesLoading,
  onClose,
  documentUploadProps,
  investigationId,
}: Props) => (
  <Card style={{ marginLeft: 20, marginRight: 20 }}>
    <Form<OnSubmitValues>
      initialValues={{
        name: '',
        url: '',
        categories: [],
      }}
      onFinish={onSubmit}
    >
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input a name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item name="category" label="Category">
            <Select
              // select mutliple, category, can create new
              placeholder="Category"
              mode="tags"
              size="small"
              maxTagCount={2}
              style={{ minWidth: 200 }}
              loading={categoriesLoading}
              onChange={categoriesChange}
              options={categories}
              optionFilterProp="value"
              labelInValue
              value={selectedCategories}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginLeft: 20, marginTop: 20 }}>
        <Upload
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...documentUploadProps}
          listType="picture"
          style={{ display: 'flex' }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Document</Button>
        </Upload>
      </Row>
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              disabled={saving}
              type="primary"
              htmlType="submit"
            >
              {investigationId ? 'Create Evidence' : 'Create Document'}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  </Card>
);

export default AddBusiness;
