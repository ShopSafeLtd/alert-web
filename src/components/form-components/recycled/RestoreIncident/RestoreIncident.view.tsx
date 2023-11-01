import React from 'react';
import type { RecycledItemQuery } from 'graphql/generated';
import { Button, Col, Row, Skeleton, Descriptions, Popconfirm } from 'antd';
import moment from 'moment';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

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
          label={intl.formatMessage({
            defaultMessage: 'Subject',
            id: 'LLtKhp',
          })}
        >
          {data?.recycledItem?.incident?.subject}
        </Descriptions.Item>

        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Location',
            id: 'rvirM2',
          })}
        >
          {data?.recycledItem?.incident?.location?.full}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' })}
        >
          {FormatCalendar(data?.recycledItem?.incident?.date || moment())}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Remark', id: 'fTlL2P' })}
        >
          {data?.recycledItem?.incident?.createdBy.fullName}
        </Descriptions.Item>
      </Descriptions>

      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Popconfirm
            title={intl.formatMessage({
              defaultMessage:
                'Are you sure to permanently delete this Incident?',
              id: 'y5gXPE',
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
              defaultMessage: 'Are you sure to restore this Incident?',
              id: 'hkUyq1',
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

export default RestoreIncident;
