import React from 'react';
import useViewEvidenceList from './hooks/useListEvidence';
import View from './EvidenceList.view';

const EvidenceList = (): JSX.Element => {
  const {
    data,
    loading,
    selectedData,
    setSelectedData,
    setSelectedId,
    demIds,
    onPaginationChange,
  } = useViewEvidenceList();

  return (
    <View
      data={data}
      loading={loading}
      selectedData={selectedData}
      setSelectedData={setSelectedData}
      setSelectedId={setSelectedId}
      onPaginationChange={onPaginationChange}
      demIds={demIds}
    />
  );
};

export default EvidenceList;
