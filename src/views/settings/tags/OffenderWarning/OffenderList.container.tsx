import React from 'react';
import View from './OffenderList.view';
import useOffenderList from './useOffenderList';

const OffenderList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    offenderId,
    setOffenderId,
    editOffender,
    toggleEditOffender,
    addOffender,
    toggleAddOffender,
    updateOffenderList,
    saving,
    deleteConfirm,
  } = useOffenderList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      offenderId={offenderId}
      setOffenderId={setOffenderId}
      editOffender={editOffender}
      toggleEditOffender={toggleEditOffender}
      addOffender={addOffender}
      toggleAddOffender={toggleAddOffender}
      updateOffenderList={updateOffenderList}
      saving={saving}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default OffenderList;
