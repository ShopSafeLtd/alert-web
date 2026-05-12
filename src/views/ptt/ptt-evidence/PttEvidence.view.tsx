import { Button, Card, Col, Row, Select, Skeleton, Typography } from 'antd';
import DatePicker from 'components/util-components/DatePicker';
import React from 'react';
import { useIntl } from 'react-intl';

import type { PttDetail, PttFilters, PttSession } from './usePttEvidence';

import PttEvidenceDrawer from '../components/PttEvidenceDrawer';
import PttEvidenceGrid from '../components/PttEvidenceGrid';

interface Props {
  currentPage: number;
  detailData: PttDetail | null;
  detailLoading: boolean;
  deviceOptions: { label: string; value: string }[];
  filters: PttFilters;
  groupOptions: { label: string; value: string }[];
  loading: boolean;
  onCloseDetail: () => void;
  onDateRangeChange: (dates: [Date | null, Date | null] | null) => void;
  onOpenDetail: (sessionId: string) => void;
  onPageChange: (page: number, pageSize: number) => void;
  onReset: () => void;
  selectedSessionId: null | string;
  sessions: PttSession[];
  setFilter: <K extends keyof PttFilters>(key: K, value: PttFilters[K]) => void;
  total: number;
}

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'Completed', value: 'completed' },
  { label: 'Recording', value: 'recording' },
];

const PttEvidenceView = ({
  currentPage,
  detailData,
  detailLoading,
  deviceOptions,
  filters,
  groupOptions,
  loading,
  onCloseDetail,
  onDateRangeChange,
  onOpenDetail,
  onPageChange,
  onReset,
  selectedSessionId,
  sessions,
  setFilter,
  total,
}: Props) => {
  const intl = useIntl();

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        {intl.formatMessage({ defaultMessage: 'PTT Evidence' })}
      </Typography.Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} wrap>
          <Col>
            <Select
              allowClear
              onChange={(val) => {
                setFilter('groupId', val ?? null);
                setFilter('deviceId', null);
              }}
              options={groupOptions}
              placeholder={intl.formatMessage({ defaultMessage: 'Group' })}
              style={{ minWidth: 160 }}
              value={filters.groupId ?? undefined}
            />
          </Col>
          <Col>
            <Select
              allowClear
              onChange={(val) => setFilter('deviceId', val ?? null)}
              options={deviceOptions}
              placeholder={intl.formatMessage({ defaultMessage: 'Device' })}
              style={{ minWidth: 180 }}
              value={filters.deviceId ?? undefined}
            />
          </Col>
          <Col>
            <Select
              onChange={(val) => setFilter('status', val || null)}
              options={STATUS_OPTIONS}
              style={{ minWidth: 160 }}
              value={filters.status ?? ''}
            />
          </Col>
          <Col>
            <DatePicker.RangePicker
              onChange={(dates) =>
                onDateRangeChange(
                  (dates as [Date | null, Date | null] | null) ?? null
                )
              }
              showTime
              style={{ minWidth: 340 }}
              value={[
                filters.since ? new Date(filters.since) : null,
                filters.until ? new Date(filters.until) : null,
              ]}
            />
          </Col>
          <Col>
            <Button onClick={onReset}>
              {intl.formatMessage({ defaultMessage: 'Clear' })}
            </Button>
          </Col>
        </Row>
      </Card>

      {loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 12 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={i} lg={4} md={6} sm={8} xs={12}>
              <Skeleton.Image active style={{ height: 120, width: '100%' }} />
              <Skeleton active paragraph={{ rows: 1 }} title={false} />
            </Col>
          ))}
        </Row>
      ) : (
        <PttEvidenceGrid
          currentPage={currentPage}
          loading={false}
          onPageChange={onPageChange}
          onSelectSession={onOpenDetail}
          pageSize={filters.limit}
          sessions={sessions}
          total={total}
        />
      )}

      <PttEvidenceDrawer
        detail={detailData}
        loading={detailLoading}
        onClose={onCloseDetail}
        open={!!selectedSessionId}
      />
    </div>
  );
};

export default PttEvidenceView;
