import React from 'react';
import type { ImageCardData } from 'types/DataType';
import View from './EditImageList.view';
import useEditImageList from './useEditImageList';

interface Props {
  onClose: () => void;
  update: (value: ImageCardData[]) => void;
  images: ImageCardData[] | undefined | null;
  title: string;
  saving: boolean;
  facialDet?: boolean;
}

const EditImageList = ({
  onClose,
  update,
  images,
  title,
  saving: origSaving,
  facialDet,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    imgChange,
    beforeUpload,
    fileList,
    onRemoveImage,
    onEditImage,
    toggleEditImage,
    editImage,
    primaryImage,
    setPrimaryImage,
  } = useEditImageList({
    onClose,
    update,
    images,
    facialDet,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving || origSaving}
      imgChange={imgChange}
      beforeUpload={beforeUpload}
      fileList={fileList}
      onRemoveImage={onRemoveImage}
      onEditImage={onEditImage}
      toggleEditImage={toggleEditImage}
      editImage={editImage}
      primaryImage={primaryImage}
      setPrimaryImage={setPrimaryImage}
      title={title}
      facialDet={facialDet || false}
    />
  );
};

export default EditImageList;
