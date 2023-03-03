import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditIncident.view';
import useEditIncident from './useEditIncident';

interface Props {
  reviewed: boolean;
}

function EditIncident({ reviewed }: Props): JSX.Element {
  const incidentId = useParams().id || '';

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
    fileList,
    beforeUpload,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffendersData,
    offendersData,
    onReject,
    recentOffenderData,
    recentOffenderLoading,
    addRecentOffender,
    setAddRecentOffender,
    searchOffenders,
    setSearchOffenders,
    newImage,
    assignOffendersToImages,
    onCancelNewImage,
    setAssignToImage,
    removeImageFromOffender,
    removeImage,
    removeOffender,
    listOffendersData,
    offenderImgChange,
    editOffenderId,
    setEditOffenderId,
    updateOffender,
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
    onSearchBusiness,
  } = useEditIncident({ incidentId, reviewed });
  return (
    <div>
      <View
        updateOffender={updateOffender}
        editOffenderId={editOffenderId}
        setEditOffenderId={setEditOffenderId}
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
        fileList={fileList}
        beforeUpload={beforeUpload}
        addIncidentTag={addIncidentTag}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}
        addOffender={addOffender}
        toggleAddOffender={toggleAddOffender}
        addExistingOffender={addExistingOffender}
        toggleAddExistingOffender={toggleAddExistingOffender}
        updateOffendersData={updateOffendersData}
        offendersData={offendersData}
        // deleteConfirm={deleteConfirm}
        reviewed={reviewed}
        onReject={onReject}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        addRecentOffender={addRecentOffender}
        setAddRecentOffender={setAddRecentOffender}
        searchOffenders={searchOffenders}
        setSearchOffenders={setSearchOffenders}
        newImage={newImage}
        assignOffendersToImages={assignOffendersToImages}
        onCancelNewImage={onCancelNewImage}
        setAssignToImage={setAssignToImage}
        removeImageFromOffender={removeImageFromOffender}
        removeImage={removeImage}
        removeOffender={removeOffender}
        listOffendersData={listOffendersData}
        offenderImgChange={offenderImgChange}
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
        onSearchBusiness={onSearchBusiness}
      />
    </div>
  );
}

export default EditIncident;
