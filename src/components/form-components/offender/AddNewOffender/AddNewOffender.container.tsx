import type { OffenderData } from '#/types/DataType';

import React from 'react';

import View from './AddNewOffender.view';
import useAddNewOffender from './useAddNewOffender';

interface Props {
  addOverride?: string;
  hideImages?: boolean;
  onClose: () => void;
  update: (value: OffenderData) => void;
}
const AddNewOffender = ({
  addOverride,
  hideImages = false,
  onClose,
  update,
}: Props): JSX.Element => {
  const {
    ageCheck,
    beforeUpload,
    editImage,
    fileList,
    form,
    idVerified,
    imgChange,
    onEditImage,
    onRemoveImage,
    onSubmit,
    onValuesChange,
    primaryImage,
    saving,
    setAgeCheck,
    setPrimaryImage,
    toggleEditImage,
  } = useAddNewOffender({
    onClose,
    update,
  });
  return (
    <div>
      <View
        // onSearchOffender={onSearchOffender}
        addOverride={addOverride}
        ageCheck={ageCheck}
        beforeUpload={beforeUpload}
        editImage={editImage}
        fileList={fileList}
        form={form}
        hideImages={hideImages}
        idVerified={idVerified}
        imgChange={imgChange}
        onClose={onClose}
        onEditImage={onEditImage}
        onRemoveImage={onRemoveImage}
        onSubmit={onSubmit}
        onValuesChange={onValuesChange}
        primaryImage={primaryImage}
        saving={saving}
        setAgeCheck={setAgeCheck}
        setPrimaryImage={setPrimaryImage}
        toggleEditImage={toggleEditImage}
      />
    </div>
  );
};

export default AddNewOffender;
