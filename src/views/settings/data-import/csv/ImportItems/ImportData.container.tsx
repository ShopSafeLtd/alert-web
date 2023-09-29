import React from 'react';
import View from './ImportData.view';
import useImport from './useImport';

const ImportDataContainer = () => {
  const { state, dispatch, onItemsLoaded, onSubmit, saving } = useImport();
  return (
    <View
      state={state}
      dispatch={dispatch}
      onItemsLoaded={onItemsLoaded}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default ImportDataContainer;
