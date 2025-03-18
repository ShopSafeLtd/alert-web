import React from 'react';

import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

const AddVehicle = (): JSX.Element => {
  const {
    addCrimeGroup,
    addCustomGallery,
    beforeUpload,
    crimeGroupsData,
    customGalleries,
    customGalleriesLoading,
    documentList,
    documentUploadProps,
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
    removeCrimeGroup,
    removeIncident,
    removeOffender,
    reportOnly,
    saving,
    setPrimaryImage,
    toggleAddCrimeGroup,
    toggleAddCustomGallery,
    toggleEditImage,
    toggleLinkIncident,
    toggleLinkOffender,
    updateCrimeGroupsList,
    updateIncidentList,
    updateNewCustomGalleryData,
    updateOffendersList,
  } = useAddVehicle();

  return (
    <View
      addCrimeGroup={addCrimeGroup}
      addCustomGallery={addCustomGallery}
      beforeUpload={beforeUpload}
      crimeGroupsData={crimeGroupsData}
      customGalleries={customGalleries}
      customGalleriesLoading={customGalleriesLoading}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      editImage={editImage}
      fileList={fileList}
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      imgChange={imgChange}
      incidentsData={incidentsData}
      linkIncident={linkIncident}
      linkOffender={linkOffender}
      offendersData={offendersData}
      onEditImage={onEditImage}
      onRemoveImage={onRemoveImage}
      onSubmit={onSubmit}
      primaryImage={primaryImage}
      removeCrimeGroup={removeCrimeGroup}
      removeIncident={removeIncident}
      removeOffender={removeOffender}
      reportOnly={reportOnly}
      // onClose={onClose}
      saving={saving}
      setPrimaryImage={setPrimaryImage}
      toggleAddCrimeGroup={toggleAddCrimeGroup}
      toggleAddCustomGallery={toggleAddCustomGallery}
      toggleEditImage={toggleEditImage}
      toggleLinkIncident={toggleLinkIncident}
      toggleLinkOffender={toggleLinkOffender}
      updateCrimeGroupsList={updateCrimeGroupsList}
      updateIncidentList={updateIncidentList}
      updateNewCustomGalleryData={updateNewCustomGalleryData}
      updateOffendersList={updateOffendersList}
    />
  );
};

export default AddVehicle;
