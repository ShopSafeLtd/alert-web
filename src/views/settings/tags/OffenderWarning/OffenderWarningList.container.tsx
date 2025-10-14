import React from 'react';

import View from './OffenderWarningList.view';
import useOffenderWarningList from './useOffenderWarningList';

const OffenderWarningList = (): JSX.Element => {
  const {
    addOffenderWarning,
    data,
    deleteConfirm,
    editOffenderWarning,
    loading,
    offenderId,
    onAddOffenderWarning,
    saving,
    search,
    setOffenderId,
    setSearch,
    toggleAddOffenderWarning,
    toggleEditOffenderWarning,
  } = useOffenderWarningList();
  return (
    <View
      addOffenderWarning={addOffenderWarning}
      data={data}
      deleteConfirm={deleteConfirm}
      editOffenderWarning={editOffenderWarning}
      loading={loading}
      offenderId={offenderId}
      onAddOffenderWarning={onAddOffenderWarning}
      saving={saving}
      search={search}
      setOffenderId={setOffenderId}
      setSearch={setSearch}
      toggleAddOffenderWarning={toggleAddOffenderWarning}
      toggleEditOffenderWarning={toggleEditOffenderWarning}
    />
  );
};

export default OffenderWarningList;
