import React from 'react';
import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import type { CrimeGroupQuery } from 'graphql/generated';

interface FormData {
  alias: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  data: CrimeGroupQuery | undefined;
  loading: boolean;
}

const AddAlias = ({
  onSubmit,
  onClose,
  saving,
  data,
  loading,
}: Props): JSX.Element =>
  !data && loading ? (
    <Skeleton />
  ) : (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        alias: data?.crimeGroup?.alias,
      }}
    >
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="alias"
            label="Alias"
            rules={[
              {
                required: true,
                message: 'Please enter a alias for the crime group.',
              },
            ]}
          >
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
              Add Alias
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

export default AddAlias;
