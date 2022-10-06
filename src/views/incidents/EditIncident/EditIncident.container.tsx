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
    updateOffendersList,
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
    adminRights,
    listOffendersData,
    offenderImgChange,
  } = useEditIncident({ incidentId, reviewed });
  return (
    <div>
      <View
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
        updateOffendersList={updateOffendersList}
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
        adminRights={adminRights}
        listOffendersData={listOffendersData}
        offenderImgChange={offenderImgChange}
      />
    </div>
  );
}

export default EditIncident;
