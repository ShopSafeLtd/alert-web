import type { VehicleData } from 'types/DataType';

import React from 'react';

import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

interface Props {
  fromIncident?: boolean | undefined;
  fromOffender?: boolean | undefined;
  onClose: () => void;
  saving?: boolean;
  showGroups?: boolean;
  update: (value: VehicleData) => void;
}

const AddVehicle = ({
  fromIncident,
  fromOffender,
  onClose,
  saving,
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
    incidentsData,
    linkIncident,
    linkOffender,
    offendersData,
    onEditImage,
    onRemoveImage,
    onSubmit,
    primaryImage,
    removeIncident,
    removeOffender,
    setPrimaryImage,
    toggleAddCustomGallery,
    toggleEditImage,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateNewCustomGalleryData,
    updateOffendersList,
  } = useAddVehicle({
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
      editImage={editImage}
      fileList={fileList}
      form={form}
      fromIncident={fromIncident}
      fromOffender={fromOffender}
      groups={groups}
      groupsLoading={groupsLoading}
      imgChange={imgChange}
      incidentsData={incidentsData}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      offendersData={offendersData}
      onClose={onClose}
      onEditImage={onEditImage}
      onRemoveImage={onRemoveImage}
      onSubmit={onSubmit}
      primaryImage={primaryImage}
      removeIncident={removeIncident}
      removeOffender={removeOffender}
      saving={saving}
      setPrimaryImage={setPrimaryImage}
      showGroups={showGroups}
      toggleAddCustomGallery={toggleAddCustomGallery}
      toggleEditImage={toggleEditImage}
      toggleLinkIncident={toggleLinkIncident}
      toggleLinkOffender={toggleLinkOffender}
      updateIncidentList={updateIncidentList}
      updateNewCustomGalleryData={updateNewCustomGalleryData}
      updateOffendersList={updateOffendersList}
    />
  );
};

export default AddVehicle;
