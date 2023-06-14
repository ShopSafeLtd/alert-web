import React from 'react';
import type { VehicleData } from 'types/DataType';
import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  fromIncident?: boolean | undefined;
  fromOffender?: boolean | undefined;
  saving?: boolean;
  showGroups?: boolean;
}

const AddVehicle = ({
  onClose,
  update,
  fromIncident,
  fromOffender,
  showGroups,
  saving,
}: Props): JSX.Element => {
  const {
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
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
  } = useAddVehicle({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      CrimeGroupsData={CrimeGroupsData}
      CrimeGroupsLoading={CrimeGroupsLoading}
      saving={saving}
      offendersData={offendersData}
      incidentsData={incidentsData}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      toggleLinkIncident={toggleLinkIncident}
      toggleLinkOffender={toggleLinkOffender}
      updateIncidentList={updateIncidentList}
      updateOffendersList={updateOffendersList}
      removeOffender={removeOffender}
      removeIncident={removeIncident}
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
      fromIncident={fromIncident}
      fromOffender={fromOffender}
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

export default AddVehicle;
