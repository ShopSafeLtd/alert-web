import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import type { InvestigationData } from './useAddInvestigation';

interface Props {
  onClose: () => void;
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

const AddInvestigation = ({
  onClose,
  onSubmit,

  saving,
}: Props): JSX.Element => (
  <div>
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please enter a make for the new vehicle.',
            //   },
            // ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="description" label="Description">
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              Create Investigation
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  </div>
);

export default AddInvestigation;
