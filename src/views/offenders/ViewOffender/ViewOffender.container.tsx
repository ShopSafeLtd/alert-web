import React from 'react';
import View from './ViewOffender.view';
import useViewOffender from './useViewOffender';

const ViewOffender = (): JSX.Element => {
  const {
    data,
    loading,
    openLightbox,
    addOffenderRights,
    offenderId,
    onDelete,
    deleteRights,
    editRights,
  } = useViewOffender();

  return (
    <View
      data={data}
      loading={loading}
      openLightbox={openLightbox}
      addOffenderRights={addOffenderRights}
      offenderId={offenderId}
      onDelete={onDelete}
      deleteRights={deleteRights}
      editRights={editRights}
    />
  );
};

export default ViewOffender;
