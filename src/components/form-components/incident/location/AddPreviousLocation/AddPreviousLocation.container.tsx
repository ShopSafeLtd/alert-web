import React from 'react';

import View from './AddExisitingLocation.view';
import useViewOffender from './useAddPreviousLocation';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}
const ViewOffender = ({ onClose, update }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    // checkedList, setCheckedList
  } = useViewOffender({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      data={data}
      loading={loading}
      // checkedList={checkedList}
      // setCheckedList={setCheckedList}
    />
  );
};

export default ViewOffender;
