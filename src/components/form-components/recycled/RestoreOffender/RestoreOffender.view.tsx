import React from 'react';
import { RecycledItemQuery } from 'graphql/generated';
import { Button, Col, Row, Skeleton, Descriptions, Popconfirm } from 'antd';

interface Props {
  onSubmit: () => void;
  onDelete: () => void;
  data: RecycledItemQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const RestoreOffender = ({
  onSubmit,
  onDelete,
  data,
  loading,
  saving,
}: Props): JSX.Element =>
  loading ? (
    <Skeleton />
  ) : (
    <div>
      <Descriptions
        layout="vertical"
        column={1}
        labelStyle={{ fontSize: 18, marginTop: 5, marginBottom: -10 }}
        contentStyle={{ fontSize: 15 }}
      >
        <Descriptions.Item label="Name">
          {data?.recycledItem?.offender?.name}
        </Descriptions.Item>

        <Descriptions.Item label="Sex">
          {data?.recycledItem?.offender?.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Ethnicity">
          {data?.recycledItem?.offender?.race}
        </Descriptions.Item>
      </Descriptions>

      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Popconfirm
            title="Are you sure to permanently delete this offender?"
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button disabled={saving} loading={saving}>
              Delete Now
            </Button>
          </Popconfirm>
        </Col>
        <Col>
          <Popconfirm
            title="Are you sure to restore this offender?"
            onConfirm={onSubmit}
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              Restore Item
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );

export default RestoreOffender;
