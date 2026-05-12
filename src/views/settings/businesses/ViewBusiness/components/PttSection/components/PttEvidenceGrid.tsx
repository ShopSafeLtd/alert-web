import type { Theme } from 'configs/ThemeConfig';

import { PlayCircleOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Col,
  Pagination,
  Progress,
  Row,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { BusinessPttDataQuery } from '../../../graphql/queries/__generated__/business-ptt-data.generated';
import type { StreamState } from '../useLiveStream';
import type { UploadProgress } from '../usePttRealtime';

const useStyles = createUseStyles((theme: Theme) => ({
  evidenceCard: {
    '& .ant-card-body': {
      background: theme.cardSubsectionBackground,
    },
    overflow: 'hidden',
  },
}));

type PttSession =
  BusinessPttDataQuery['scheme']['pttEvidence']['sessions'][number];

interface Props {
  currentPage: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onSelectSession: (sessionId: string) => void;
  onStartStream: (deviceId: string) => void;
  pageSize: number;
  sessions: PttSession[];
  streamState: StreamState;
  total: number;
  uploadProgress: Map<string, UploadProgress>;
}

const msToDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatDuration = (session: PttSession): string => {
  if (
    session.durationMs !== null &&
    session.durationMs !== undefined &&
    session.durationMs > 0
  ) {
    return msToDuration(session.durationMs);
  }
  if (session.endedAt) {
    const calculated = dayjs(session.endedAt).diff(dayjs(session.startedAt));
    return msToDuration(Math.max(0, calculated));
  }
  return '—';
};

const RecordingDuration = ({ startedAt }: { startedAt: Date }) => {
  const [elapsed, setElapsed] = useState(
    Date.now() - new Date(startedAt).getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - new Date(startedAt).getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  return <>{msToDuration(Math.max(0, elapsed))}</>;
};

const PttEvidenceGrid = ({
  currentPage,
  loading,
  onPageChange,
  onSelectSession,
  onStartStream,
  pageSize,
  sessions,
  streamState,
  total,
  uploadProgress,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  if (!loading && sessions.length === 0) {
    return (
      <Typography.Text type="secondary">
        {intl.formatMessage({ defaultMessage: 'No evidence recorded yet.' })}
      </Typography.Text>
    );
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        {sessions.map((session) => {
          const isRecording = session.status === 'recording';
          const isUploading = session.status === 'uploading';

          const statusOverlay = (isRecording || isUploading) && (
            <div
              style={{
                alignItems: 'center',
                background: 'rgba(0,0,0,0.45)',
                bottom: 0,
                display: 'flex',
                gap: 6,
                left: 0,
                padding: '4px 8px',
                position: 'absolute',
              }}
            >
              <Badge color={isRecording ? 'red' : 'blue'} status="processing" />
              <Typography.Text
                style={{
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                {isRecording
                  ? intl.formatMessage({ defaultMessage: 'REC' })
                  : intl.formatMessage({ defaultMessage: 'UPLOADING' })}
              </Typography.Text>
              {isRecording && (
                <Typography.Text
                  style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}
                >
                  <RecordingDuration startedAt={session.startedAt} />
                </Typography.Text>
              )}
            </div>
          );

          const progress = uploadProgress.get(session.sessionId);
          const progressPercent =
            progress && progress.total
              ? Math.round((progress.received / progress.total) * 100)
              : undefined;

          const isStreamActive =
            streamState.status === 'streaming' ||
            streamState.status === 'waiting' ||
            streamState.status === 'requesting';
          const isThisDeviceStreaming =
            isStreamActive && streamState.deviceId === session.deviceId;
          const isAnotherDeviceStreaming =
            isStreamActive && streamState.deviceId !== session.deviceId;

          const watchLiveOverlay = isRecording && (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                inset: 0,
                justifyContent: 'center',
                position: 'absolute',
              }}
            >
              <Button
                disabled={isAnotherDeviceStreaming}
                icon={<PlayCircleOutlined />}
                loading={
                  isThisDeviceStreaming &&
                  (streamState.status === 'requesting' ||
                    streamState.status === 'waiting')
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isThisDeviceStreaming) onStartStream(session.deviceId);
                }}
                size="small"
                style={{
                  backdropFilter: 'blur(4px)',
                  background: isThisDeviceStreaming
                    ? undefined
                    : 'rgba(0,0,0,0.45)',
                  borderColor: isThisDeviceStreaming
                    ? undefined
                    : 'rgba(255,255,255,0.6)',
                  color: isThisDeviceStreaming ? undefined : '#fff',
                }}
                type={isThisDeviceStreaming ? 'primary' : 'default'}
              >
                {isThisDeviceStreaming && streamState.status === 'streaming'
                  ? intl.formatMessage({ defaultMessage: 'Watching Live' })
                  : intl.formatMessage({ defaultMessage: 'Watch Live' })}
              </Button>
            </div>
          );

          return (
            <Col key={session.sessionId} lg={6} sm={8} xs={12}>
              <Card
                bodyStyle={{ padding: 8 }}
                className={classes.evidenceCard}
                cover={
                  session.thumbnailUrl ? (
                    <div style={{ position: 'relative' }}>
                      <img
                        alt={session.deviceName}
                        src={session.thumbnailUrl}
                        style={{
                          height: 200,
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                      {statusOverlay}
                      {watchLiveOverlay}
                    </div>
                  ) : (
                    <div
                      style={{
                        alignItems: 'center',
                        background: isRecording
                          ? '#1a1a1a'
                          : isUploading
                            ? '#0a1929'
                            : '#f0f0f0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        height: 200,
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {isRecording && (
                        <>
                          <Badge color="red" status="processing" />
                          <Typography.Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontWeight: 600,
                              letterSpacing: 1,
                            }}
                          >
                            {intl.formatMessage({ defaultMessage: 'REC' })}
                          </Typography.Text>
                          <Typography.Text
                            style={{
                              color: 'rgba(255,255,255,0.7)',
                              fontSize: 13,
                            }}
                          >
                            <RecordingDuration startedAt={session.startedAt} />
                          </Typography.Text>
                        </>
                      )}
                      {isUploading && (
                        <>
                          <Badge color="blue" status="processing" />
                          <Typography.Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontWeight: 600,
                              letterSpacing: 1,
                            }}
                          >
                            {intl.formatMessage({
                              defaultMessage: 'UPLOADING',
                            })}
                          </Typography.Text>
                        </>
                      )}
                      {!isRecording && !isUploading && (
                        <Typography.Text type="secondary">
                          {intl.formatMessage({
                            defaultMessage: 'No thumbnail',
                          })}
                        </Typography.Text>
                      )}
                      {watchLiveOverlay}
                    </div>
                  )
                }
                hoverable
                onClick={() => onSelectSession(session.sessionId)}
                size="small"
              >
                <Typography.Text
                  ellipsis
                  strong
                  style={{ display: 'block', fontSize: 12 }}
                >
                  {session.deviceName}
                </Typography.Text>
                {isUploading && (
                  <Progress
                    percent={progressPercent ?? 0}
                    showInfo={progressPercent !== undefined}
                    size="small"
                    status="active"
                    strokeColor="#1677ff"
                    style={{ marginBottom: 2, marginTop: 2 }}
                  />
                )}
                <Typography.Text
                  style={{ display: 'block', fontSize: 11 }}
                  type="secondary"
                >
                  {isRecording
                    ? dayjs(session.startedAt).format('HH:mm DD/MM/YY')
                    : isUploading && progress?.total
                      ? intl.formatMessage(
                          { defaultMessage: '{received}/{total} · {time}' },
                          {
                            received: progress.received,
                            time: dayjs(session.startedAt).format(
                              'HH:mm DD/MM/YY'
                            ),
                            total: progress.total,
                          }
                        )
                      : intl.formatMessage(
                          { defaultMessage: '{duration} · {time}' },
                          {
                            duration: formatDuration(session),
                            time: dayjs(session.startedAt).format(
                              'HH:mm DD/MM/YY'
                            ),
                          }
                        )}
                </Typography.Text>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row justify="end" style={{ marginTop: 16 }}>
        <Col>
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            pageSize={pageSize}
            pageSizeOptions={['9']}
            showSizeChanger={false}
            total={total}
          />
        </Col>
      </Row>
    </>
  );
};

export default PttEvidenceGrid;
