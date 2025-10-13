import React from 'react';

import View from './CompareOffender.view';
import useCompareIncident from './useCompareIncident';

const CompareIncident = () => {
  const {
    addOffender,
    addOffenders,
    mode,
    offenders,
    onMerge,
    onSubmitImages,
    preview,
    removeOffender,
    selected,
    selectedImages,
    setMode,
    toggleAddOffender,
    toggleSelected,
    toggleSelectedImages,
  } = useCompareIncident();

  return (
    <View
      addOffender={addOffender}
      addOffenders={addOffenders}
      mode={mode}
      offenders={offenders}
      onMerge={onMerge}
      onSubmitImages={onSubmitImages}
      preview={preview}
      removeOffender={removeOffender}
      selected={selected}
      selectedImages={selectedImages}
      setMode={setMode}
      toggleAddOffender={toggleAddOffender}
      toggleSelected={toggleSelected}
      toggleSelectedImages={toggleSelectedImages}
    />
  );
};

export default CompareIncident;
