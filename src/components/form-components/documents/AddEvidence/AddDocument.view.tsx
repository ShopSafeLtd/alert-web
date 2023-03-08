import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
} from 'antd';
import LinkDem from '../ImportEvidence';

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
  toggleSearchEvidence: () => void;
  searchEvidence: boolean;
  selectedEvidence: {
    url: string;
  } | null;
  selectEvidence: (evidence: { url: string }) => void;
}

const AddBusiness = ({
  onSubmit,
  saving,
  selectedCategories,
  categories,
  categoriesChange,
  categoriesLoading,
  onClose,
  toggleSearchEvidence,
  selectedEvidence,
  searchEvidence,
  selectEvidence,
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
        <Col>
          {selectedEvidence && selectedEvidence.url && (
            <a href={selectedEvidence.url} target="_blank" rel="noreferrer">
              {selectedEvidence.url}
            </a>
          )}
          <Button style={{ marginLeft: '10px' }} onClick={toggleSearchEvidence}>
            Search Evidence
          </Button>
        </Col>
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
              Create Evidence
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
    <Drawer
      title="Add DEM Evidence"
      visible={searchEvidence}
      width="800"
      onClose={toggleSearchEvidence}
      zIndex={1011}
    >
      {searchEvidence ? (
        <LinkDem
          selectEvidence={selectEvidence}
          onClose={toggleSearchEvidence}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </Card>
);

export default AddBusiness;
