import React from 'react';
import View from './AddIncident.view';
import useEditIncident from './useAddIncident';

function EditIncident(): JSX.Element {
  const {
    onSubmit,
    saving,
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    primaryAddress,
    addressLoading,
    imgChange,
    fileList,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
    offendersData,
    deleteConfirm,
    addPreviousLocation,
    toggleAddPreviousLocation,
    updatePreviousLocation,
    addNewLocation,
    toggleAddNewLocation,
    updateNewLocation,
  } = useEditIncident();
  return (
    <div>
      <View
        onSubmit={onSubmit}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        primaryAddress={primaryAddress}
        addressLoading={addressLoading}
        imgChange={imgChange}
        fileList={fileList}
        addIncidentTag={addIncidentTag}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}
        addOffender={addOffender}
        toggleAddOffender={toggleAddOffender}
        addExistingOffender={addExistingOffender}
        toggleAddExistingOffender={toggleAddExistingOffender}
        updateOffenderList={updateOffenderList}
        offendersData={offendersData}
        deleteConfirm={deleteConfirm}
        addPreviousLocation={addPreviousLocation}
        toggleAddPreviousLocation={toggleAddPreviousLocation}
        addNewLocation={addNewLocation}
        toggleAddNewLocation={toggleAddNewLocation}
        updateNewLocation={updateNewLocation}
        updatePreviousLocation={updatePreviousLocation}
      />
    </div>
  );
}

export default EditIncident;
