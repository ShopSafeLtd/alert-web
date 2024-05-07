import React from 'react';
import View from './ListDocument.view';
import useEvidenceList from './useListDocuments';

const EvidenceList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    addEvidence,
    toggleAddEvidence,
    updateNewEvidenceList,
    saving,
    onDelete,
    deleteRights,
    createRights,
    downloadRights,
  } = useEvidenceList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addEvidence={addEvidence}
      toggleAddEvidence={toggleAddEvidence}
      updateNewEvidenceList={updateNewEvidenceList}
      saving={saving}
      onDelete={onDelete}
      deleteRights={deleteRights}
      createRights={createRights}
      downloadRights={downloadRights}
    />
  );
};

export default EvidenceList;
