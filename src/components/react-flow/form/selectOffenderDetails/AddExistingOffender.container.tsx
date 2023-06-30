import React from 'react';

import View from './AddExistingOffender.view';
import type { Offender } from './useSelectExistingOffender';
import useSelectExistingOffender from './useSelectExistingOffender';

interface Props {
  onClose: () => void;
  onSelect: (offender: Offender) => void;
  investigationId: string;
}

const SelectOffenderDetails = ({
  onClose,
  onSelect,
  investigationId,
}: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    setCurrentId,
    selectedOffender,
    openLightbox,
    lightBoxOpen,
  } = useSelectExistingOffender({ onClose, onSelect, investigationId });

  return (
    <View
      lightBoxOpen={lightBoxOpen}
      openLightbox={openLightbox}
      onSubmit={onSubmit}
      data={data}
      loading={loading}
      onClose={onClose}
      setCurrentId={setCurrentId}
      selectedOffender={selectedOffender}
    />
  );
};

export default SelectOffenderDetails;
