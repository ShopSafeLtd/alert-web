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
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setSearchOffenders,
    crimeTypes,
    impactTags,
    involvedTags,
    tagsLoading,
    toggleAddIncidentTag,
    updateIncidentTag,
    vehiclesData,
    goodsTypesData,
    onAddOffender,
    onEditOffender,
    onRemoveOffender,
    onEditImage,
    onAddVehicle,
    onEditVehicle,
    onRemoveVehicle,
  } = useEditIncident({ incidentId, reviewed });
  return (
    <div>
      <View
        onEditImage={onEditImage}
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
        reviewed={reviewed}
        saving={saving}
        searchOffenders={searchOffenders}
        setAddRecentOffender={setAddRecentOffender}
        setAssignToImage={setAssignToImage}
        setSearchOffenders={setSearchOffenders}
        crimeTypes={crimeTypes}
        impactTags={impactTags}
        involvedTags={involvedTags}
        tagsLoading={tagsLoading}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}
        vehiclesData={vehiclesData}
        onAddOffender={onAddOffender}
        onEditOffender={onEditOffender}
        onRemoveOffender={onRemoveOffender}
        onAddVehicle={onAddVehicle}
        onEditVehicle={onEditVehicle}
        onRemoveVehicle={onRemoveVehicle}
      />
    </div>
  );
};

export default EditIncident;
