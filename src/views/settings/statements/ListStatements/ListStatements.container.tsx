import React from 'react';

import View from './ListStatements.view';
import useListStatements from './useListStatements';

const ListStatements = () => {
  const {
    createTemplate,
    data,
    editTemplate,
    loading,
    toggleCreate,
    toggleEdit,
  } = useListStatements();

  return (
    <View
      createTemplate={createTemplate}
      data={data}
      editTemplate={editTemplate}
      loading={loading}
      toggleCreate={toggleCreate}
      toggleEdit={toggleEdit}
    />
  );
};

export default ListStatements;
