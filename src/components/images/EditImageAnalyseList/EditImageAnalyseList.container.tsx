import React from 'react';
import type { ImageCardData } from 'types/DataType';
import View from './EditImageAnalyseList.view';
import useEditImageAnalyseList from './useEditImageAnalyseList';

interface Props {
  onClose: () => void;
  update: (value: ImageCardData[]) => void;
  images: ImageCardData[] | undefined | null;
  title: string;
  saving: boolean;
}

const EditImageAnalyseList = ({
  onClose,
  update,
  images,
  title,
  saving: origSaving,
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
    onSelectFace,
    setUploadFaces,
    uploadFaces,
    facialRec,
  } = useEditImageAnalyseList({
    onClose,
    update,
    images,
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
      onSelectFace={onSelectFace}
      setUploadFaces={setUploadFaces}
      uploadFaces={uploadFaces}
      facialRec={facialRec}
    />
  );
};

export default EditImageAnalyseList;
