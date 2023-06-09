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
    editOffenderWarning,
    toggleEditOffenderWarning,
    addOffenderWarning,
    toggleAddOffenderWarning,
    onAddOffenderWarning,
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
      editOffenderWarning={editOffenderWarning}
      toggleEditOffenderWarning={toggleEditOffenderWarning}
      addOffenderWarning={addOffenderWarning}
      toggleAddOffenderWarning={toggleAddOffenderWarning}
      onAddOffenderWarning={onAddOffenderWarning}
      saving={saving}
      deleteConfirm={deleteConfirm}
    />
  );
};

export default OffenderWarningList;
