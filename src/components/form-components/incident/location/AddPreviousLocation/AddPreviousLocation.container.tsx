import React from 'react';

import View from './AddPreviousLocation.view';
import useViewOffender from './useAddPreviousLocation';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}
const ViewOffender = ({ onClose, update }: Props): JSX.Element => {
  const {
    data,
    loading,
    onSubmit,
    saving,
    // checkedList, setCheckedList
  } = useViewOffender({
    onClose,
    update,
  });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      // checkedList={checkedList}
      // setCheckedList={setCheckedList}
    />
  );
};

export default ViewOffender;
