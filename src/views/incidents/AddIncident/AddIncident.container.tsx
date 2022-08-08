import React from 'react';
import View from './AddIncident.view';
import useEditIncident from './useAddIncident';

function EditIncident(): JSX.Element {
  const {
    onSubmit,
    form,
    saving,
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    primaryAddress,
    addressLoading,
    imgChange,
    fileList,
    beforeUpload,
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
    assignImage,
    toggleAssignImage,
    updateAssignImage,
  } = useEditIncident();
  return (
    <div>
      <View
        onSubmit={onSubmit}
        form={form}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        primaryAddress={primaryAddress}
        addressLoading={addressLoading}
        imgChange={imgChange}
        fileList={fileList}
        beforeUpload={beforeUpload}
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
        assignImage={assignImage}
        toggleAssignImage={toggleAssignImage}
        updateAssignImage={updateAssignImage}
      />
    </div>
  );
}

export default EditIncident;
