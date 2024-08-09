import type { RecycledItemQuery } from 'graphql/recycled/queries/__generated__/recycled-item.generated';

import { Button, Col, Descriptions, Popconfirm, Row, Skeleton } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: RecycledItemQuery | undefined;
  loading: boolean;
  onDelete: () => void;
  onSubmit: () => void;
  saving: boolean;
}

const RestoreOffender = ({
  data,
  loading,
  onDelete,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return !data && loading ? (
    <Skeleton />
  ) : (
    <div>
      <Descriptions
        column={1}
        contentStyle={{ fontSize: 15 }}
        labelStyle={{ fontSize: 18, marginBottom: -10, marginTop: 5 }}
        layout="vertical"
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

      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={onDelete}
            overlayInnerStyle={{ padding: 10 }}
            title={intl.formatMessage({
              defaultMessage:
                'Are you sure to permanently delete this offender?',
            })}
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
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={onSubmit}
            overlayInnerStyle={{ padding: 10 }}
            title={intl.formatMessage({
              defaultMessage: 'Are you sure to restore this offender?',
            })}
          >
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
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
