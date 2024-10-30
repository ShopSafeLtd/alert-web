import React from 'react';

import View from './EvidenceList.view';
import useViewEvidenceList from './hooks/useEvidenceList';

const EvidenceList = (): JSX.Element => {
  const {
    data,
    demIds,
    loading,
    onDelete,
    onPaginationChange,
    selectedData,
    setSelectedData,
    setSelectedId,
  } = useViewEvidenceList();

  return (
    <View
      data={data}
      demIds={demIds}
      loading={loading}
      onDelete={onDelete}
      onPaginationChange={onPaginationChange}
      selectedData={selectedData}
      setSelectedData={setSelectedData}
      setSelectedId={setSelectedId}
    />
  );
};

export default EvidenceList;
