import React from 'react';
import View from './CompareOffender.view';
import useCompareIncident from './useCompareIncident';

const CompareIncident = () => {
  const {
    offenders,
    preview,
    addOffender,
    addOffenders,
    toggleAddOffender,
    selected,
    toggleSelected,
    removeOffender,
    onMerge,
    mode,
    setMode,
    selectedImages,
    toggleSelectedImages,
    onSubmitImages,
  } = useCompareIncident();

  return (
    <View
      offenders={offenders}
      preview={preview}
      addOffender={addOffender}
      addOffenders={addOffenders}
      toggleAddOffender={toggleAddOffender}
      selected={selected}
      toggleSelected={toggleSelected}
      removeOffender={removeOffender}
      onMerge={onMerge}
      mode={mode}
      setMode={setMode}
      selectedImages={selectedImages}
      toggleSelectedImages={toggleSelectedImages}
      onSubmitImages={onSubmitImages}
    />
  );
};

export default CompareIncident;
