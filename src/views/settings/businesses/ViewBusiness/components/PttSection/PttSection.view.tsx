import { Card, Col, Empty, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import PttEvidenceDrawer from 'views/ptt/components/PttEvidenceDrawer';

import type { BusinessPttDataQuery } from '../../graphql/queries/__generated__/business-ptt-data.generated';
import type { PttEvidenceDetailQuery } from '../../graphql/queries/__generated__/ptt-evidence-detail.generated';
import type { StreamState } from './useLiveStream';
import type { RecordingState, UploadProgress } from './usePttRealtime';

import LiveStreamModal from './components/LiveStreamModal';
import PttDevicesTable from './components/PttDevicesTable';
import PttEvidenceGrid from './components/PttEvidenceGrid';

type PttDevice = BusinessPttDataQuery['scheme']['pttDevices'][number];
type PttSession =
  BusinessPttDataQuery['scheme']['pttEvidence']['sessions'][number];
type PttDetail = PttEvidenceDetailQuery['pttEvidenceDetail'];

interface Props {
  currentPage: number;
  detailData: PttDetail | null;
  detailError: Error | undefined;
  detailLoading: boolean;
  devices: PttDevice[];
  loading: boolean;
  notConfigured: boolean;
  onCloseDrawer: () => void;
  onEndStream: () => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSelectSession: (sessionId: string) => void;
  onStartStream: (deviceId: string) => void;
  onlineDeviceIds: Set<string>;
  pageSize: number;
  pttEnabled: boolean;
  recordingStates: Map<string, RecordingState>;
  selectedSessionId: null | string;
  sessions: PttSession[];
  streamState: StreamState;
  total: number;
  uploadProgress: Map<string, UploadProgress>;
}

const PttSection = ({
  currentPage,
  detailData,
  detailError,
  detailLoading,
  devices,
  loading,
  notConfigured,
  onCloseDrawer,
  onEndStream,
  onPageChange,
  onSelectSession,
  onStartStream,
  onlineDeviceIds,
  pageSize,
  pttEnabled,
  recordingStates,
  selectedSessionId,
  sessions,
  streamState,
  total,
  uploadProgress,
}: Props) => {
  const intl = useIntl();

  if (!pttEnabled) return null;

  if (notConfigured) {
    return (
      <Card style={{ marginTop: 16 }}>
        <Row align="middle" style={{ marginBottom: 12 }}>
          <Col flex={1}>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {intl.formatMessage({ defaultMessage: 'PTT' })}
            </Typography.Title>
          </Col>
        </Row>
        <Empty
          description={intl.formatMessage({
            defaultMessage:
              'PTT is not configured for this business. A PTT group must be assigned before devices and evidence will appear.',
          })}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <>
      <Card loading={loading} style={{ marginTop: 16 }}>
        <Row align="middle" style={{ marginBottom: 12 }}>
          <Col flex={1}>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {intl.formatMessage({ defaultMessage: 'Connect Devices' })}
            </Typography.Title>
          </Col>
        </Row>
        <PttDevicesTable
          devices={devices}
          loading={loading}
          onStartStream={onStartStream}
          onlineDeviceIds={onlineDeviceIds}
          recordingStates={recordingStates}
          streamState={streamState}
        />
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Row align="middle" style={{ marginBottom: 12 }}>
          <Col flex={1}>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {intl.formatMessage({ defaultMessage: 'Connect Evidence' })}
            </Typography.Title>
          </Col>
        </Row>
        <PttEvidenceGrid
          currentPage={currentPage}
          loading={loading}
          onPageChange={onPageChange}
          onSelectSession={onSelectSession}
          onStartStream={onStartStream}
          pageSize={pageSize}
          sessions={sessions}
          streamState={streamState}
          total={total}
          uploadProgress={uploadProgress}
        />
      </Card>

      <PttEvidenceDrawer
        detail={detailData}
        error={detailError}
        loading={detailLoading}
        onClose={onCloseDrawer}
        open={!!selectedSessionId}
      />

      <LiveStreamModal onEndStream={onEndStream} streamState={streamState} />
    </>
  );
};

export default PttSection;
