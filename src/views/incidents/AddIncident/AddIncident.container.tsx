import React from 'react';
import View from './AddIncident.view';
import useEditIncident from './useAddIncident';

function EditIncident(): JSX.Element {
  const {
    addExistingOffender,
    addIncidentTag,
    addNewLocation,
    addOffender,
    addPreviousLocation,
    addRecentOffender,
    addressLoading,
    beforeUpload,
    fileList,
    form,
    groups,
    groupsLoading,
    imgChange,
    offendersData,
    onSubmit,
    primaryAddress,
    recentOffenderData,
    recentOffenderLoading,
    saving,
    setAddRecentOffender,
    tags,
    tagsLoading,
    toggleAddExistingOffender,
    toggleAddIncidentTag,
    toggleAddNewLocation,
    toggleAddOffender,
    toggleAddPreviousLocation,
    updateIncidentTag,
    updateNewLocation,
    updateOffenderList,
    updatePreviousLocation,
    searchOffenders,
    setSearchOffenders,
    newImage,
    assignOffendersToImages,
    onCancelNewImage,
    setAssignToImage,
    onPreview,
    removeImageFromOffender,
    removeImage,
    removeOffender,
  } = useEditIncident();

  return (
    <div>
      <View
        addExistingOffender={addExistingOffender}
        addIncidentTag={addIncidentTag}
        addNewLocation={addNewLocation}
        addOffender={addOffender}
        addPreviousLocation={addPreviousLocation}
        addRecentOffender={addRecentOffender}
        addressLoading={addressLoading}
        beforeUpload={beforeUpload}
        fileList={fileList}
        form={form}
        groups={groups}
        groupsLoading={groupsLoading}
        imgChange={imgChange}
        offendersData={offendersData}
        onSubmit={onSubmit}
        primaryAddress={primaryAddress}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        saving={saving}
        setAddRecentOffender={setAddRecentOffender}
        tags={tags}
        tagsLoading={tagsLoading}
        toggleAddExistingOffender={toggleAddExistingOffender}
        toggleAddIncidentTag={toggleAddIncidentTag}
        toggleAddNewLocation={toggleAddNewLocation}
        toggleAddOffender={toggleAddOffender}
        toggleAddPreviousLocation={toggleAddPreviousLocation}
        updateIncidentTag={updateIncidentTag}
        updateNewLocation={updateNewLocation}
        updateOffenderList={updateOffenderList}
        updatePreviousLocation={updatePreviousLocation}
        searchOffenders={searchOffenders}
        setSearchOffenders={setSearchOffenders}
        newImage={newImage}
        assignOffendersToImages={assignOffendersToImages}
        onCancelNewImage={onCancelNewImage}
        setAssignToImage={setAssignToImage}
        onPreview={onPreview}
        removeImageFromOffender={removeImageFromOffender}
        removeImage={removeImage}
        removeOffender={removeOffender}
      />
    </div>
  );
}

export default EditIncident;
