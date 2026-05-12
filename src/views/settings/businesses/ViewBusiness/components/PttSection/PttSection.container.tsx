import React, { useEffect, useRef } from 'react';

import View from './PttSection.view';
import { useLiveStream } from './useLiveStream';
import { usePttRealtime } from './usePttRealtime';
import { usePttSection } from './usePttSection';

interface Props {
  businessId: string;
  pttGroupId: null | string | undefined;
}

const PttSection = ({ businessId, pttGroupId }: Props) => {
  const {
    currentPage,
    detailData,
    detailError,
    detailLoading,
    devices,
    loading,
    notConfigured,
    onCloseDrawer,
    onPageChange,
    onSelectSession,
    pageSize,
    patchSession,
    prependSession,
    pttEnabled,
    refetchDetail,
    selectedSessionId,
    sessions,
    total,
  } = usePttSection(businessId, pttGroupId);

  const { onlineDeviceIds, recordingStates, uploadProgress } = usePttRealtime(
    devices,
    pttEnabled && !notConfigured,
    prependSession,
    patchSession
  );

  const { handleEndStream, handleStartStream, streamState } = useLiveStream(
    pttEnabled && !notConfigured
  );

  const prevUploadProgressRef = useRef(uploadProgress);
  useEffect(() => {
    if (!selectedSessionId) return;
    const prev = prevUploadProgressRef.current;
    const curr = uploadProgress;
    prevUploadProgressRef.current = curr;

    const wasActive = prev.has(selectedSessionId);
    const isActive = curr.has(selectedSessionId);
    // Refetch when a chunk arrives for the open session, or when upload just completed
    if (isActive || wasActive) {
      void refetchDetail();
    }
  }, [uploadProgress, selectedSessionId, refetchDetail]);

  return (
    <View
      currentPage={currentPage}
      detailData={detailData}
      detailError={detailError}
      detailLoading={detailLoading}
      devices={devices}
      loading={loading}
      notConfigured={notConfigured}
      onCloseDrawer={onCloseDrawer}
      onEndStream={() => {
        void handleEndStream();
      }}
      onPageChange={onPageChange}
      onSelectSession={onSelectSession}
      onStartStream={(id) => {
        void handleStartStream(id);
      }}
      onlineDeviceIds={onlineDeviceIds}
      pageSize={pageSize}
      pttEnabled={pttEnabled}
      recordingStates={recordingStates}
      selectedSessionId={selectedSessionId}
      sessions={sessions}
      streamState={streamState}
      total={total}
      uploadProgress={uploadProgress}
    />
  );
};

export default PttSection;
