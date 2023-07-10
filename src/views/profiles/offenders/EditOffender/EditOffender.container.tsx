import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  reviewed: boolean;
}

const EditOffender = ({ reviewed }: Props): JSX.Element => {
  const offenderId = useParams().id || '';
  const {
    onSubmit,
    data,
    loading,
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
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    onAddExclusion,
    onUpdateExclusion,
    banData,
    setBanData,
    bansData,
    adminRights,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    onReject,
    form,
    vehiclesData,
    crimeGroupsData,
    listVehiclesData,
    idVerified,
    onValuesChange,
    addAddress,
    editAddress,
    toggleAddAddress,
    toggleEditAddress,
    addressesData,
    onDeleteAddress,
    onEditAddress,
    onSubmitAddress,
    editImage,
    onEditImage,
    toggleEditImage,
    onAddVehicle,
    onRemoveVehicle,
    onAddCrimeGroup,
    onRemoveCrimeGroup,
    onRemoveImage,
    primaryImage,
    setPrimaryImage,
    customGalleries,
    customGalleriesLoading,
    toggleAddCustomGallery,
    updateNewOffenderTagData,
    addCustomGallery,
    updateNewCustomGalleryData,
  } = useEditOffender({ offenderId, reviewed });

  return (
    <div>
      <View
        form={form}
        onSubmit={onSubmit}
        data={data}
        loading={loading}
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
        addExclusion={addExclusion}
        toggleAddExclusion={toggleAddExclusion}
        editExclusion={editExclusion}
        toggleEditExclusion={toggleEditExclusion}
        onAddExclusion={onAddExclusion}
        onUpdateExclusion={onUpdateExclusion}
        bansData={bansData}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        reviewed={reviewed}
        onReject={onReject}
        adminRights={adminRights}
        vehiclesData={vehiclesData}
        onRemoveCrimeGroup={onRemoveCrimeGroup}
        crimeGroupsData={crimeGroupsData}
        onAddCrimeGroup={onAddCrimeGroup}
        listVehiclesData={listVehiclesData}
        idVerified={idVerified}
        onValuesChange={onValuesChange}
        addAddress={addAddress}
        editAddress={editAddress}
        toggleAddAddress={toggleAddAddress}
        toggleEditAddress={toggleEditAddress}
        addressesData={addressesData}
        onSubmitAddress={onSubmitAddress}
        onDeleteAddress={onDeleteAddress}
        onEditAddress={onEditAddress}
        editImage={editImage}
        onEditImage={onEditImage}
        toggleEditImage={toggleEditImage}
        onAddVehicle={onAddVehicle}
        onRemoveVehicle={onRemoveVehicle}
        onRemoveImage={onRemoveImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        customGalleries={customGalleries}
        customGalleriesLoading={customGalleriesLoading}
        toggleAddCustomGallery={toggleAddCustomGallery}
        updateNewOffenderTagData={updateNewOffenderTagData}
        addCustomGallery={addCustomGallery}
        updateNewCustomGalleryData={updateNewCustomGalleryData}
      />
    </div>
  );
};

export default EditOffender;
