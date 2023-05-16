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
    onPreview,
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
    onEditVehicle,
    onRemoveCrimeGroup,
    onRemoveImage,
    onRemoveVehicle,
  } = useAddOffender();

  return (
    <div>
      <View
        onAddCrimeGroup={onAddCrimeGroup}
        onAddVehicle={onAddVehicle}
        onEditVehicle={onEditVehicle}
        onRemoveCrimeGroup={onRemoveCrimeGroup}
        onRemoveImage={onRemoveImage}
        onRemoveVehicle={onRemoveVehicle}
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
        vehiclesData={vehiclesData}
        crimeGroupsData={crimeGroupsData}
        listVehiclesData={listVehiclesData}
        idVerified={idVerified}
        onValuesChange={onValuesChange}
        editImage={editImage}
        onEditImage={onEditImage}
        toggleEditImage={toggleEditImage}
      />
    </div>
  );
};

export default AddOffender;
