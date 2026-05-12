import { Badge, Button, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import type { BusinessPttDataQuery } from '../../../graphql/queries/__generated__/business-ptt-data.generated';
import type { StreamState } from '../useLiveStream';
import type { RecordingState } from '../usePttRealtime';

import { usePttCameraActionMutation } from '../../../graphql/mutations/__generated__/ptt-camera-action.generated';

type PttDevice = BusinessPttDataQuery['scheme']['pttDevices'][number];

interface Props {
  devices: PttDevice[];
  loading: boolean;
  onStartStream: (deviceId: string) => void;
  onlineDeviceIds: Set<string>;
  recordingStates: Map<string, RecordingState>;
  streamState: StreamState;
}

const PttDevicesTable = ({
  devices,
  loading,
  onStartStream,
  onlineDeviceIds,
  recordingStates,
  streamState,
}: Props) => {
  const intl = useIntl();
  const [cameraAction] = usePttCameraActionMutation();

  // Which device button is currently in flight
  const [pendingDeviceId, setPendingDeviceId] = useState<null | string>(null);
  // Optimistic recording state — updated immediately on success, cleaned up when realtime confirms
  const [optimisticRecordingIds, setOptimisticRecordingIds] = useState<
    Set<string>
  >(new Set());

  const isRecording = useCallback(
    (id: string) =>
      optimisticRecordingIds.has(id) ||
      (recordingStates.has(id) && !recordingStates.get(id)?.isComplete),
    [optimisticRecordingIds, recordingStates]
  );

  const handleAction = useCallback(
    async (id: string) => {
      const recording = isRecording(id);
      setPendingDeviceId(id);
      try {
        await cameraAction({
          variables: { action: recording ? 'stop' : 'start', deviceId: id },
        });
        setOptimisticRecordingIds((prev) => {
          const next = new Set(prev);
          if (recording) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      } finally {
        setPendingDeviceId(null);
      }
    },
    [cameraAction, isRecording]
  );

  return (
    <Table<PttDevice>
      columns={[
        {
          dataIndex: 'id',
          key: 'online',
          render: (id: string) => (
            <Badge status={onlineDeviceIds.has(id) ? 'success' : 'default'} />
          ),
          title: intl.formatMessage({ defaultMessage: 'Online' }),
          width: 60,
        },
        {
          dataIndex: 'name',
          key: 'name',
          title: intl.formatMessage({ defaultMessage: 'Name' }),
        },
        {
          dataIndex: 'model',
          key: 'model',
          render: (value: string) =>
            value === 'Test Sample' ? 'ShopSafe One' : value,
          title: intl.formatMessage({ defaultMessage: 'Model' }),
        },
        {
          dataIndex: 'isEnabled',
          key: 'isEnabled',
          render: (value: boolean) =>
            value ? (
              <Tag color="green">
                {intl.formatMessage({ defaultMessage: 'Active' })}
              </Tag>
            ) : (
              <Tag>{intl.formatMessage({ defaultMessage: 'Disabled' })}</Tag>
            ),
          title: intl.formatMessage({ defaultMessage: 'Status' }),
        },
        {
          dataIndex: 'id',
          key: 'recording',
          render: (id: string) => {
            if (!isRecording(id)) return null;
            return (
              <Tag color="red">
                {intl.formatMessage({ defaultMessage: 'Recording' })}
              </Tag>
            );
          },
          title: intl.formatMessage({ defaultMessage: 'Recording Status' }),
        },
        {
          dataIndex: 'lastSeenAt',
          key: 'lastSeenAt',
          render: (value: Date | null) =>
            value
              ? dayjs(value).format('HH:mm DD/MM/YY')
              : intl.formatMessage({ defaultMessage: 'Never' }),
          title: intl.formatMessage({ defaultMessage: 'Last Seen' }),
        },
        {
          dataIndex: 'id',
          key: 'actions',
          render: (id: string) => {
            const recording = isRecording(id);
            const isPending = pendingDeviceId === id;
            const isOtherPending =
              pendingDeviceId !== null && pendingDeviceId !== id;
            const isOffline = !onlineDeviceIds.has(id);

            const isStreamActive =
              streamState.status === 'streaming' ||
              streamState.status === 'waiting' ||
              streamState.status === 'requesting';
            const isThisDeviceStreaming =
              isStreamActive && streamState.deviceId === id;
            const isAnotherDeviceStreaming =
              isStreamActive && streamState.deviceId !== id;
            const isStreamPending =
              isThisDeviceStreaming &&
              (streamState.status === 'requesting' ||
                streamState.status === 'waiting');

            return (
              <Space size="small">
                <Button
                  danger={recording}
                  disabled={isOtherPending || (!recording && isOffline)}
                  loading={isPending}
                  onClick={() => {
                    void handleAction(id);
                  }}
                  size="small"
                  title={
                    !recording && isOffline
                      ? intl.formatMessage({
                          defaultMessage: 'Device is offline',
                        })
                      : undefined
                  }
                  type={recording ? 'primary' : 'default'}
                >
                  {recording
                    ? intl.formatMessage({ defaultMessage: 'Stop' })
                    : intl.formatMessage({ defaultMessage: 'Start Recording' })}
                </Button>
                <Button
                  disabled={
                    isOffline ||
                    isAnotherDeviceStreaming ||
                    (isThisDeviceStreaming &&
                      streamState.status === 'streaming')
                  }
                  loading={isStreamPending}
                  onClick={() => onStartStream(id)}
                  size="small"
                  title={
                    isOffline
                      ? intl.formatMessage({
                          defaultMessage: 'Device is offline',
                        })
                      : undefined
                  }
                  type={isThisDeviceStreaming ? 'primary' : 'default'}
                >
                  {isThisDeviceStreaming && streamState.status === 'streaming'
                    ? intl.formatMessage({ defaultMessage: 'Streaming…' })
                    : intl.formatMessage({ defaultMessage: 'Stream' })}
                </Button>
              </Space>
            );
          },
          title: '',
          width: 180,
        },
      ]}
      dataSource={devices.map((d) => ({ ...d, key: d.id }))}
      loading={loading}
      pagination={{ hideOnSinglePage: true, pageSize: 10 }}
      size="small"
    />
  );
};

export default PttDevicesTable;
