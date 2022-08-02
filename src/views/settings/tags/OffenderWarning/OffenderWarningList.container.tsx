import React from 'react';
import View from './OffenderWarningList.view';
import useOffenderWarningList from './useOffenderWarningList';

const OffenderWarningList = (): JSX.Element => {
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
    updateOffenderWarningList,
    saving,
    deleteConfirm,
  } = useOffenderWarningList();
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
      updateOffenderWarningList={updateOffenderWarningList}
      saving={saving}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default OffenderWarningList;
