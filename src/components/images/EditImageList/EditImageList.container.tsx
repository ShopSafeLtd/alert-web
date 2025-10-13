import type { ImageCardData } from 'types/DataType';

import React from 'react';

import View from './EditImageList.view';
import useEditImageList from './useEditImageList';

interface Props {
  facialDet?: boolean;
  images: ImageCardData[] | null | undefined;
  onClose: () => void;
  saving: boolean;
  title: string;
  update: (value: ImageCardData[]) => void;
}

const EditImageList = ({
  facialDet,
  images,
  onClose,
  saving: origSaving,
  title,
  update,
}: Props): JSX.Element => {
  const {
    beforeUpload,
    editImage,
    fileList,
    imgChange,
    onEditImage,
    onRemoveImage,
    onSubmit,
    primaryImage,
    saving,
    setPrimaryImage,
    toggleEditImage,
  } = useEditImageList({
    facialDet,
    images,
    onClose,
    update,
  });

  return (
    <View
      beforeUpload={beforeUpload}
      editImage={editImage}
      facialDet={facialDet || false}
      fileList={fileList}
      imgChange={imgChange}
      onClose={onClose}
      onEditImage={onEditImage}
      onRemoveImage={onRemoveImage}
      onSubmit={onSubmit}
      primaryImage={primaryImage}
      saving={saving || origSaving}
      setPrimaryImage={setPrimaryImage}
      title={title}
      toggleEditImage={toggleEditImage}
    />
  );
};

export default EditImageList;
