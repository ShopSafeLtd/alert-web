import React from 'react';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';

interface Props {
  onClose: () => void;
}
function AddNewOffender({ onClose }: Props): JSX.Element {
  const {
    onSubmit,
    saving,
    ageCheck,
    setAgeCheck,
    imgChange,
    beforeUpload,
    fileList,
  } = useAddNewOffender({
    onClose,
  });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        onClose={onClose}
        saving={saving}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        imgChange={imgChange}
        beforeUpload={beforeUpload}
        fileList={fileList}
      />
    </div>
  );
}

export default AddNewOffender;
