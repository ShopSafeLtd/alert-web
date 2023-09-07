import React from 'react';
import View from './AddVehicle.view';
import useAddVehicle from './useAddVehicle';

const AddVehicle = (): JSX.Element => {
  const {
    onSubmit,
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
    saving,
    reportOnly,
    documentList,
    documentUploadProps,
    crimeGroupsData,
    addCrimeGroup,
    toggleAddCrimeGroup,
    updateCrimeGroupsList,
    removeCrimeGroup,
  } = useAddVehicle();

  return (
    <View
      onSubmit={onSubmit}
      // onClose={onClose}
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
      groups={groups}
      groupsLoading={groupsLoading}
      customGalleries={customGalleries}
      customGalleriesLoading={customGalleriesLoading}
      addCustomGallery={addCustomGallery}
      toggleAddCustomGallery={toggleAddCustomGallery}
      updateNewCustomGalleryData={updateNewCustomGalleryData}
      form={form}
      reportOnly={reportOnly}
      documentList={documentList}
      documentUploadProps={documentUploadProps}
      crimeGroupsData={crimeGroupsData}
      addCrimeGroup={addCrimeGroup}
      toggleAddCrimeGroup={toggleAddCrimeGroup}
      updateCrimeGroupsList={updateCrimeGroupsList}
      removeCrimeGroup={removeCrimeGroup}
    />
  );
};

export default AddVehicle;
