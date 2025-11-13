import React from 'react';

import View from './ViewFolder.view';
import useViewFolder from './hooks/useViewFolder';

const ViewFolderContainer = () => {
  const {
    addDocument,
    addFolder,
    addRights,
    data,
    deleteRights,
    editFolder,
    editRights,
    loading,
    onDelete,
    onDeleteFolder,
    saving,
    search,
    setSearch,
    toggleAddDocument,
    toggleAddFolder,
    toggleEditFolder,
    updateDocumentList,
    updateFolderList,
  } = useViewFolder();

  return (
    <View
      addDocument={addDocument}
      addFolder={addFolder}
      addRights={addRights}
      data={data}
      deleteRights={deleteRights}
      editFolder={editFolder}
      editRights={editRights}
      loading={loading}
      onDelete={onDelete}
      onDeleteFolder={onDeleteFolder}
      saving={saving}
      search={search}
      setSearch={setSearch}
      toggleAddDocument={toggleAddDocument}
      toggleAddFolder={toggleAddFolder}
      toggleEditFolder={toggleEditFolder}
      updateDocumentList={updateDocumentList}
      updateFolderList={updateFolderList}
    />
  );
};

export default ViewFolderContainer;
