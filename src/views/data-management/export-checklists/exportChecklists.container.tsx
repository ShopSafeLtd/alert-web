import React from 'react';

import View from './exportChecklistsView';
import useExportChecklists from './useExportChecklists';

const ExportChecklistsContainer = () => {
  const { dispatch, getZip, loading, state } = useExportChecklists();
  return (
    <View dispatch={dispatch} getZip={getZip} loading={loading} state={state} />
  );
};

export default ExportChecklistsContainer;
