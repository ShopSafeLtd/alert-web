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
    addIncidentTag,
    addRecentOffender,
    assignOffendersToImages,
    beforeUpload,
    crimeGroupsData,
    data,
    fileList,
    groups,
    groupsLoading,
    imgChange,
    loading,
    newImage,
    offenderImgChange,
    offendersData,
    onCancelNewImage,
    onPreview,
    onReject,
    onSearchBusiness,
    onSubmit,
    recentOffenderData,
    recentOffenderLoading,
    removeCrimeGroup,
    removeImage,
    removeImageFromOffender,
    removeOffender,
    removeVehicle,
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setSearchOffenders,
    tags,
    tagsLoading,
    toggleAddIncidentTag,
    updateCrimeGroupsData,
    updateIncidentTag,
    updateOffender,
    updateOffendersData,
    updateVehiclesData,
    vehiclesData,
    goodsTypesData,
  } = useEditIncident({ incidentId, reviewed });
  return (
    <div>
      <View
        addIncidentTag={addIncidentTag}
        addRecentOffender={addRecentOffender}
        assignOffendersToImages={assignOffendersToImages}
        beforeUpload={beforeUpload}
        crimeGroupsData={crimeGroupsData}
        data={data}
        fileList={fileList}
        goodsTypesData={goodsTypesData}
        groups={groups}
        groupsLoading={groupsLoading}
        imgChange={imgChange}
        loading={loading}
        newImage={newImage}
        offenderImgChange={offenderImgChange}
        offendersData={offendersData}
        onCancelNewImage={onCancelNewImage}
        onPreview={onPreview}
        onReject={onReject}
        onSearchBusiness={onSearchBusiness}
        onSubmit={onSubmit}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        removeCrimeGroup={removeCrimeGroup}
        removeImage={removeImage}
        removeImageFromOffender={removeImageFromOffender}
        removeOffender={removeOffender}
        removeVehicle={removeVehicle}
        reviewed={reviewed}
        saving={saving}
        searchOffenders={searchOffenders}
        setAddRecentOffender={setAddRecentOffender}
        setAssignToImage={setAssignToImage}
        setSearchOffenders={setSearchOffenders}
        tags={tags}
        tagsLoading={tagsLoading}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateCrimeGroupsData={updateCrimeGroupsData}
        updateIncidentTag={updateIncidentTag}
        updateOffender={updateOffender}
        updateOffendersData={updateOffendersData}
        updateVehiclesData={updateVehiclesData}
        vehiclesData={vehiclesData}
      />
    </div>
  );
}

export default EditIncident;
