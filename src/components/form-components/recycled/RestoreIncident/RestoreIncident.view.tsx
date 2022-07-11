import React from 'react';
import { RecycledItemQuery } from 'graphql/generated';
import { Button, Col, Row, Skeleton, Descriptions, Popconfirm } from 'antd';
import moment from 'moment';

interface Props {
  onSubmit: () => void;
  onDelete: () => void;
  data: RecycledItemQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const RestoreIncident = ({
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
        <Descriptions.Item label="Subject">
          {data?.recycledItem?.incident?.subject}
        </Descriptions.Item>

        <Descriptions.Item label="Location">
          {data?.recycledItem?.incident?.location?.full}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {moment(data?.recycledItem?.incident?.date || moment()).format(
            `ddd MMM DD YYYY - HH:mm`
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Remark">
          {data?.recycledItem?.incident?.createdBy.fullName}
        </Descriptions.Item>
      </Descriptions>

      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Popconfirm
            title="Are you sure to permanently delete this Incident?"
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
            title="Are you sure to restore this Incident ?"
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

export default RestoreIncident;
