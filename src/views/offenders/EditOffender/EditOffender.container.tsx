import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  reviewed: boolean;
}

function EditOffender({ reviewed }: Props): JSX.Element {
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
    updateExclusion,
    banData,
    setBanData,
    bansData,
    adminRights,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    onReject,
    selectedItems,
    setSelectedItems,
    form,
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
  } = useEditOffender({ offenderId, reviewed });
  return (
    <div>
      <View
        form={form}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onSubmit={onSubmit}
        data={data}
        loading={loading}
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
        bansData={bansData}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        reviewed={reviewed}
        onReject={onReject}
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
      />
    </div>
  );
}

export default EditOffender;
