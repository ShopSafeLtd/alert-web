import React from 'react';

import View from './ImportData.view';
import useImport from './useImport';

const ImportDataContainer = () => {
  const { dispatch, onItemsLoaded, onSubmit, saving, state } = useImport();
  return (
    <View
      dispatch={dispatch}
      onItemsLoaded={onItemsLoaded}
      onSubmit={onSubmit}
      saving={saving}
      state={state}
    />
  );
};

export default ImportDataContainer;
