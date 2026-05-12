import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAtomValue } from 'jotai/index';
import React from 'react';

import PttEvidenceView from './PttEvidence.view';
import { usePttEvidence } from './usePttEvidence';
import { usePttRealtime } from './usePttRealtime';

const PttEvidenceContainer = () => {
  const schemeId = useAtomValue(currentSchemeIdAtom) ?? '';

  const {
    currentPage,
    detailData,
    detailLoading,
    deviceNameMap,
    deviceOptions,
    filters,
    groupOptions,
    loading,
    onCloseDetail,
    onDateRangeChange,
    onOpenDetail,
    onPageChange,
    onReset,
    patchSession,
    prependSession,
    selectedSessionId,
    sessions,
    setFilter,
    total,
  } = usePttEvidence(schemeId);

  usePttRealtime(deviceNameMap, !!schemeId, prependSession, patchSession);

  return (
    <PttEvidenceView
      currentPage={currentPage}
      detailData={detailData}
      detailLoading={detailLoading}
      deviceOptions={deviceOptions}
      filters={filters}
      groupOptions={groupOptions}
      loading={loading}
      onCloseDetail={onCloseDetail}
      onDateRangeChange={onDateRangeChange}
      onOpenDetail={onOpenDetail}
      onPageChange={onPageChange}
      onReset={onReset}
      selectedSessionId={selectedSessionId}
      sessions={sessions}
      setFilter={setFilter}
      total={total}
    />
  );
};

export default PttEvidenceContainer;
