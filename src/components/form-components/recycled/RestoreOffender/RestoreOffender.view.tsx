import React from 'react';

import { Button, Col, Row, Skeleton, Descriptions, Popconfirm } from 'antd';
import { useIntl } from 'react-intl';
import type { RecycledItemQuery } from 'graphql/recycled/queries/recycled-item.generated';

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
}: Props): JSX.Element => {
  const intl = useIntl();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <div>
      <Descriptions
        layout="vertical"
        column={1}
        labelStyle={{ fontSize: 18, marginTop: 5, marginBottom: -10 }}
        contentStyle={{ fontSize: 15 }}
      >
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Name' })}
        >
          {data?.recycledItem?.offender?.name}
        </Descriptions.Item>

        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Sex' })}
        >
          {data?.recycledItem?.offender?.gender}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Ethnicity',
          })}
        >
          {data?.recycledItem?.offender?.race}
        </Descriptions.Item>
      </Descriptions>

      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Popconfirm
            title={intl.formatMessage({
              defaultMessage:
                'Are you sure to permanently delete this offender?',
            })}
            onConfirm={onDelete}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            overlayInnerStyle={{ padding: 10 }}
          >
            <Button disabled={saving} loading={saving}>
              {intl.formatMessage({
                defaultMessage: 'Delete Now',
              })}
            </Button>
          </Popconfirm>
        </Col>
        <Col>
          <Popconfirm
            title={intl.formatMessage({
              defaultMessage: 'Are you sure to restore this offender?',
            })}
            onConfirm={onSubmit}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            overlayInnerStyle={{ padding: 10 }}
          >
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({
                defaultMessage: 'Restore Item',
              })}
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};

export default RestoreOffender;
