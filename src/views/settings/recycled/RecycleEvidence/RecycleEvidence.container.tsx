import React from 'react';

import View from './RecycleEvidence.view';
import useRecycleBin from './useRecycleEvidence';

const RecycleEvidence = (): JSX.Element => {
  const { data, loading, onRestore, saving, selectedData, setSelectedData } =
    useRecycleBin();
  return (
    <View
      data={data}
      loading={loading}
      onRestore={onRestore}
      saving={saving}
      selectedData={selectedData}
      setSelectedData={setSelectedData}
    />
  );
};

export default RecycleEvidence;
