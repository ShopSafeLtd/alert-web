import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditIncident.view';
import useEditIncident from './useEditIncident';

interface Props {
  reviewed: boolean;
}

const EditIncident = ({ reviewed }: Props): JSX.Element => {
  const incidentId = useParams().id || '';

  const {
    addIncidentTag,
    addRecentOffender,
    assignOffendersToImages,
    beforeUpload,
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
    removeImage,
    removeImageFromOffender,
    removeVehicle,
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setSearchOffenders,
    tags,
    tagsLoading,
    toggleAddIncidentTag,
    updateIncidentTag,
    updateVehiclesData,
    vehiclesData,
    goodsTypesData,
    onAddOffender,
    onEditOffender,
    onRemoveOffender,
  } = useEditIncident({ incidentId, reviewed });
  return (
    <div>
      <View
        addIncidentTag={addIncidentTag}
        addRecentOffender={addRecentOffender}
        assignOffendersToImages={assignOffendersToImages}
        beforeUpload={beforeUpload}
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
        removeImage={removeImage}
        removeImageFromOffender={removeImageFromOffender}
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
        updateIncidentTag={updateIncidentTag}
        updateVehiclesData={updateVehiclesData}
        vehiclesData={vehiclesData}
        onAddOffender={onAddOffender}
        onEditOffender={onEditOffender}
        onRemoveOffender={onRemoveOffender}
      />
    </div>
  );
};

export default EditIncident;
