import React from 'react';

import type { Offender } from './useSelectExistingOffender';

import View from './AddExistingOffender.view';
import useSelectExistingOffender from './useSelectExistingOffender';

interface Props {
  investigationId: string;
  onClose: () => void;
  onSelect: (offender: Offender) => void;
}

const SelectOffenderDetails = ({
  investigationId,
  onClose,
  onSelect,
}: Props): JSX.Element => {
  const {
    data,
    lightBoxOpen,
    loading,
    onSubmit,
    openLightbox,
    selectedOffender,
    setCurrentId,
  } = useSelectExistingOffender({ investigationId, onClose, onSelect });

  return (
    <View
      data={data}
      lightBoxOpen={lightBoxOpen}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      openLightbox={openLightbox}
      selectedOffender={selectedOffender}
      setCurrentId={setCurrentId}
    />
  );
};

export default SelectOffenderDetails;
