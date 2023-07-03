import React from 'react';
import View from './ListStatements.view';
import useListStatements from './useListStatements';

const ListStatements = () => {
  const {
    data,
    loading,
    toggleCreate,
    toggleEdit,
    createTemplate,
    editTemplate,
  } = useListStatements();

  return (
    <View
      data={data}
      loading={loading}
      toggleCreate={toggleCreate}
      toggleEdit={toggleEdit}
      createTemplate={createTemplate}
      editTemplate={editTemplate}
    />
  );
};

export default ListStatements;
