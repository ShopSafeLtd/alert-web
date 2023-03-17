import React from 'react';
import View from './AddOffender.view';

import useAddOffender from './useAddOffender';

function AddOffender(): JSX.Element {
  const {
    onSubmit,
    saving,
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    imgChange,
    onPreview,
    removeImage,
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
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
    selectedItems,
    setSelectedItems,
    form,
    adminRights,
    addNewVehicle,
    addExistingVehicle,
    editVehicleId,
    setEditVehicleId,
    toggleAddNewVehicle,
    toggleAddExistingVehicle,
    vehiclesData,
    updateVehiclesData,
    removeVehicle,
    addNewCrimeGroup,
    addExistingCrimeGroup,
    editCrimeGroupId,
    setEditCrimeGroupId,
    toggleAddNewCrimeGroup,
    toggleAddExistingCrimeGroup,
    crimeGroupsData,
    updateCrimeGroupsData,
    removeCrimeGroup,
    listVehiclesData,
    listCrimeGroupsData,
    idVerified,
    onValuesChange,
  } = useAddOffender();

  return (
    <div>
      <View
        form={form}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onSubmit={onSubmit}
        bansData={bansData}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        imgChange={imgChange}
        removeImage={removeImage}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        fileList={fileList}
        addOffenderTag={addOffenderTag}
        toggleAddOffenderTag={toggleAddOffenderTag}
        updateOffenderTag={updateOffenderTag}
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
        addNewVehicle={addNewVehicle}
        addExistingVehicle={addExistingVehicle}
        editVehicleId={editVehicleId}
        setEditVehicleId={setEditVehicleId}
        toggleAddNewVehicle={toggleAddNewVehicle}
        toggleAddExistingVehicle={toggleAddExistingVehicle}
        vehiclesData={vehiclesData}
        updateVehiclesData={updateVehiclesData}
        removeVehicle={removeVehicle}
        removeCrimeGroup={removeCrimeGroup}
        addNewCrimeGroup={addNewCrimeGroup}
        addExistingCrimeGroup={addExistingCrimeGroup}
        editCrimeGroupId={editCrimeGroupId}
        setEditCrimeGroupId={setEditCrimeGroupId}
        toggleAddNewCrimeGroup={toggleAddNewCrimeGroup}
        toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
        crimeGroupsData={crimeGroupsData}
        updateCrimeGroupsData={updateCrimeGroupsData}
        listVehiclesData={listVehiclesData}
        listCrimeGroupsData={listCrimeGroupsData}
        idVerified={idVerified}
        onValuesChange={onValuesChange}
      />
    </div>
  );
}

export default AddOffender;
