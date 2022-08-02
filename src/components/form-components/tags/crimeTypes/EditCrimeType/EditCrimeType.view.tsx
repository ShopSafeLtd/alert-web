import React from 'react';
import { TagQuery } from 'graphql/generated';
import { Button, Col, Form, Input, Row, Skeleton, Typography } from 'antd';

const { Text } = Typography;

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: TagQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const EditCrimeType = ({
  onSubmit,
  onClose,
  data,
  loading,
  saving,
}: Props): JSX.Element =>
  loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        name: data?.tag?.name,
        description: data?.tag?.description,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            Crime types are used to catagories incidents that are submitted by
            members.
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for the crime type.',
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
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
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

export default EditCrimeType;
