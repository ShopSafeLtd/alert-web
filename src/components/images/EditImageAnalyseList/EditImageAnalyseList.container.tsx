import type { ImageCardData } from 'types/DataType';

import React from 'react';

import View from './EditImageAnalyseList.view';
import useEditImageAnalyseList from './useEditImageAnalyseList';

interface Props {
  images: ImageCardData[] | null | undefined;
  onClose: () => void;
  saving: boolean;
  title: string;
  update: (value: ImageCardData[]) => void;
}

const EditImageAnalyseList = ({
  images,
  onClose,
  saving: origSaving,
  title,
  update,
}: Props): JSX.Element => {
  const {
    beforeUpload,
    editImage,
    facialRec,
    fileList,
    imgChange,
    onCloseSelectFace,
    onEditImage,
    onRemoveImage,
    onSelectFace,
    onSubmit,
    primaryImage,
    saving,
    setPrimaryImage,
    toggleEditImage,
    uploadFaces,
    uploading,
  } = useEditImageAnalyseList({
    images,
    onClose,
    update,
  });

  return (
    <View
      beforeUpload={beforeUpload}
      editImage={editImage}
      facialRec={facialRec}
      fileList={fileList}
      imgChange={imgChange}
      onClose={onClose}
      onCloseSelectFace={onCloseSelectFace}
      onEditImage={onEditImage}
      onRemoveImage={onRemoveImage}
      onSelectFace={onSelectFace}
      onSubmit={onSubmit}
      primaryImage={primaryImage}
      saving={saving || origSaving}
      setPrimaryImage={setPrimaryImage}
      title={title}
      toggleEditImage={toggleEditImage}
      uploadFaces={uploadFaces}
      uploading={uploading}
    />
  );
};

export default EditImageAnalyseList;
