import React from 'react';

import View from './ListFolders.view';
import useListFolders from './hooks/useListFolders';

const ListFolders = () => {
  const {
    addDocument,
    addFolder,
    addRights,
    data,
    deleteRights,
    documentsData,
    documentsLoading,
    fetchMoreDocScroll,
    fetchMoreScroll,
    loading,
    onDelete,
    onDeleteFolder,
    saving,
    search,
    setSearch,
    toggleAddDocument,
    toggleAddFolder,
    updateDocumentList,
    updateFolderList,
  } = useListFolders();

  return (
    <View
      addDocument={addDocument}
      addFolder={addFolder}
      addRights={addRights}
      data={data}
      deleteRights={deleteRights}
      documentsData={documentsData}
      documentsLoading={documentsLoading}
      fetchMoreDocScroll={fetchMoreDocScroll}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      onDelete={onDelete}
      onDeleteFolder={onDeleteFolder}
      saving={saving}
      search={search}
      setSearch={setSearch}
      toggleAddDocument={toggleAddDocument}
      toggleAddFolder={toggleAddFolder}
      updateDocumentList={updateDocumentList}
      updateFolderList={updateFolderList}
    />
  );
};

export default ListFolders;
