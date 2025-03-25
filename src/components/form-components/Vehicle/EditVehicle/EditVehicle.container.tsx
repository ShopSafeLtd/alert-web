import type { VehicleCardData, VehicleData } from 'types/DataType';

import React from 'react';

import View from './EditVehicle.view';
import useEditVehicle from './useEditVehicle';

interface Props {
  editData: VehicleCardData | null | undefined;
  onClose: () => void;
  showGroups?: boolean;
  update: (value: VehicleData) => void;
}

const EditVehicle = ({
  editData,
  onClose,
  showGroups,
  update,
}: Props): JSX.Element => {
  const {
    CrimeGroupsData,
    CrimeGroupsLoading,
    addCustomGallery,
    beforeUpload,
    customGalleries,
    customGalleriesLoading,
    editImage,
    fileList,
    form,
    groups,
    groupsLoading,
    imgChange,
    onEditImage,
    onRemoveImage,
    onSubmit,
    primaryImage,
    saving,
    setPrimaryImage,
    toggleAddCustomGallery,
    toggleEditImage,
    updateNewCustomGalleryData,
  } = useEditVehicle({
    editData,
    onClose,
    update,
  });

  return (
    <View
      CrimeGroupsData={CrimeGroupsData}
      CrimeGroupsLoading={CrimeGroupsLoading}
      addCustomGallery={addCustomGallery}
      beforeUpload={beforeUpload}
      customGalleries={customGalleries}
      customGalleriesLoading={customGalleriesLoading}
      editData={editData}
      editImage={editImage}
      fileList={fileList}
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      imgChange={imgChange}
      onClose={onClose}
      onEditImage={onEditImage}
      onRemoveImage={onRemoveImage}
      onSubmit={onSubmit}
      primaryImage={primaryImage}
      saving={saving}
      setPrimaryImage={setPrimaryImage}
      showGroups={showGroups}
      toggleAddCustomGallery={toggleAddCustomGallery}
      toggleEditImage={toggleEditImage}
      updateNewCustomGalleryData={updateNewCustomGalleryData}
    />
  );
};

export default EditVehicle;
