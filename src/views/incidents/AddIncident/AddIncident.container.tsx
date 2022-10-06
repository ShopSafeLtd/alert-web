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
    saving,
    recentOffenderData,
    recentOffenderLoading,
    addRecentOffender,
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
    updateOffendersList,
    updatePreviousLocation,
    searchOffenders,
    setSearchOffenders,
    newImage,
    assignOffendersToImages,
    onCancelNewImage,
    setAssignToImage,
    removeImageFromOffender,
    removeImage,
    removeOffender,
    adminRights,
    listOffendersData,
    offenderImgChange,
  } = useEditIncident();

  return (
    <div>
      <View
        addExistingOffender={addExistingOffender}
        addIncidentTag={addIncidentTag}
        addNewLocation={addNewLocation}
        addOffender={addOffender}
        addPreviousLocation={addPreviousLocation}
        addressLoading={addressLoading}
        beforeUpload={beforeUpload}
        fileList={fileList}
        form={form}
        groups={groups}
        groupsLoading={groupsLoading}
        imgChange={imgChange}
        offendersData={offendersData}
        onSubmit={onSubmit}
        saving={saving}
        primaryAddress={primaryAddress}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        addRecentOffender={addRecentOffender}
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
        updateOffendersList={updateOffendersList}
        updatePreviousLocation={updatePreviousLocation}
        searchOffenders={searchOffenders}
        setSearchOffenders={setSearchOffenders}
        newImage={newImage}
        assignOffendersToImages={assignOffendersToImages}
        onCancelNewImage={onCancelNewImage}
        setAssignToImage={setAssignToImage}
        removeImageFromOffender={removeImageFromOffender}
        removeImage={removeImage}
        removeOffender={removeOffender}
        adminRights={adminRights}
        listOffendersData={listOffendersData}
        offenderImgChange={offenderImgChange}
      />
    </div>
  );
}

export default EditIncident;
