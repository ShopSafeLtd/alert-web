import React from 'react';
import type { VehicleCardData, VehicleData } from 'types/DataType';
import View from './EditVehicle.view';
import useEditVehicle from './useEditVehicle';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleCardData | undefined | null;
  showGroups?: boolean;
}

const EditVehicle = ({
  onClose,
  update,
  editData,
  showGroups,
}: Props): JSX.Element => {
  const {
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
    saving,
    adminRights,
    imgChange,
    beforeUpload,
    fileList,
    onRemoveImage,
    onEditImage,
    toggleEditImage,
    editImage,
    primaryImage,
    setPrimaryImage,
    groups,
    groupsLoading,
    customGalleries,
    customGalleriesLoading,
    addCustomGallery,
    toggleAddCustomGallery,
    updateNewCustomGalleryData,
    form,
  } = useEditVehicle({
    onClose,
    update,
    editData,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      CrimeGroupsData={CrimeGroupsData}
      CrimeGroupsLoading={CrimeGroupsLoading}
      saving={saving}
      adminRights={adminRights}
      imgChange={imgChange}
      beforeUpload={beforeUpload}
      fileList={fileList}
      onRemoveImage={onRemoveImage}
      editImage={editImage}
      onEditImage={onEditImage}
      toggleEditImage={toggleEditImage}
      primaryImage={primaryImage}
      setPrimaryImage={setPrimaryImage}
      editData={editData}
      showGroups={showGroups}
      groups={groups}
      groupsLoading={groupsLoading}
      customGalleries={customGalleries}
      customGalleriesLoading={customGalleriesLoading}
      addCustomGallery={addCustomGallery}
      toggleAddCustomGallery={toggleAddCustomGallery}
      updateNewCustomGalleryData={updateNewCustomGalleryData}
      form={form}
    />
  );
};

export default EditVehicle;
