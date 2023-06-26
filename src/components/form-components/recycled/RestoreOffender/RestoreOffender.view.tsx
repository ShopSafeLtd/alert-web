import React from 'react';
import type { RecycledItemQuery } from 'graphql/generated';
import { Button, Col, Row, Skeleton, Descriptions, Popconfirm } from 'antd';
import { useIntl } from 'react-intl';

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
          label={intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' })}
        >
          {data?.recycledItem?.offender?.name}
        </Descriptions.Item>

        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Sex', id: 'eWJHGp' })}
        >
          {data?.recycledItem?.offender?.gender}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Ethnicity',
            id: 'XtCAFo',
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
              id: '8swx2J',
            })}
            onConfirm={onDelete}
            okText={intl.formatMessage({ defaultMessage: 'Yes', id: 'a5msuh' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
              id: 'oUWADl',
            })}
            overlayInnerStyle={{ padding: 10 }}
          >
            <Button disabled={saving} loading={saving}>
              {intl.formatMessage({
                defaultMessage: 'Delete Now',
                id: '77+H1T',
              })}
            </Button>
          </Popconfirm>
        </Col>
        <Col>
          <Popconfirm
            title={intl.formatMessage({
              defaultMessage: 'Are you sure to restore this offender?',
              id: 'SstHAZ',
            })}
            onConfirm={onSubmit}
            okText={intl.formatMessage({ defaultMessage: 'Yes', id: 'a5msuh' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
              id: 'oUWADl',
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
                id: 'vnYVwS',
              })}
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};

export default RestoreOffender;
