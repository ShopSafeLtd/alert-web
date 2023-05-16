import React from 'react';
import type { OffenderData } from 'types/DataType';
import useAddNewOffender from './useAddNewOffender';
import View from './AddNewOffender.view';

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  hideImages?: boolean;
}
const AddNewOffender = ({
  onClose,
  update,
  hideImages = false,
}: Props): JSX.Element => {
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
    update,
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
        hideImages={hideImages}
        // onSearchOffender={onSearchOffender}
      />
    </div>
  );
};

export default AddNewOffender;
