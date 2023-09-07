import React from 'react';
import View from './AddOffender.view';

import useAddOffender from './useAddOffender';

const AddOffender = (): JSX.Element => {
  const {
    onSubmit,
    saving,
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    imgChange,
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateNewOffenderTagData,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    bansData,
    updateExclusion,
    banData,
    setBanData,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    form,
    adminRights,
    vehiclesData,
    crimeGroupsData,
    listVehiclesData,
    idVerified,
    onValuesChange,
    editImage,
    onEditImage,
    toggleEditImage,
    onAddCrimeGroup,
    onAddVehicle,
    onRemoveCrimeGroup,
    onRemoveImage,
    onRemoveVehicle,
    primaryImage,
    setPrimaryImage,
    customGalleries,
    customGalleriesLoading,
    addCustomGallery,
    toggleAddCustomGallery,
    updateNewCustomGalleryData,
    documentList,
    documentUploadProps,
    reportOnly,
  } = useAddOffender();

  return (
    <div>
      <View
        onAddCrimeGroup={onAddCrimeGroup}
        onAddVehicle={onAddVehicle}
        onRemoveCrimeGroup={onRemoveCrimeGroup}
        onRemoveImage={onRemoveImage}
        onRemoveVehicle={onRemoveVehicle}
        form={form}
        onSubmit={onSubmit}
        bansData={bansData}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        imgChange={imgChange}
        beforeUpload={beforeUpload}
        fileList={fileList}
        addOffenderTag={addOffenderTag}
        toggleAddOffenderTag={toggleAddOffenderTag}
        updateNewOffenderTagData={updateNewOffenderTagData}
        addExclusion={addExclusion}
        toggleAddExclusion={toggleAddExclusion}
        editExclusion={editExclusion}
        toggleEditExclusion={toggleEditExclusion}
        updateExclusion={updateExclusion}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        adminRights={adminRights}
        vehiclesData={vehiclesData}
        crimeGroupsData={crimeGroupsData}
        listVehiclesData={listVehiclesData}
        idVerified={idVerified}
        onValuesChange={onValuesChange}
        editImage={editImage}
        onEditImage={onEditImage}
        toggleEditImage={toggleEditImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        customGalleries={customGalleries}
        customGalleriesLoading={customGalleriesLoading}
        addCustomGallery={addCustomGallery}
        toggleAddCustomGallery={toggleAddCustomGallery}
        updateNewCustomGalleryData={updateNewCustomGalleryData}
        documentList={documentList}
        documentUploadProps={documentUploadProps}
        reportOnly={reportOnly}
      />
    </div>
  );
};

export default AddOffender;
