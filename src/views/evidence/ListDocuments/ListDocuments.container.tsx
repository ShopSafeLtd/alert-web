import React from 'react';

import View from './ListDocument.view';
import useEvidenceList from './useListDocuments';

const EvidenceList = (): JSX.Element => {
  const {
    addEvidence,
    createRights,
    data,
    deleteRights,
    downloadRights,
    loading,
    onDelete,
    onTableChange,
    saving,
    search,
    setSearch,
    toggleAddEvidence,
    updateNewEvidenceList,
  } = useEvidenceList();
  return (
    <View
      addEvidence={addEvidence}
      createRights={createRights}
      data={data}
      deleteRights={deleteRights}
      downloadRights={downloadRights}
      loading={loading}
      onDelete={onDelete}
      onTableChange={onTableChange}
      saving={saving}
      search={search}
      setSearch={setSearch}
      toggleAddEvidence={toggleAddEvidence}
      updateNewEvidenceList={updateNewEvidenceList}
    />
  );
};

export default EvidenceList;
