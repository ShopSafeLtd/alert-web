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
    crimeTypes,
    data,
    fileList,
    goodsTypesData,
    groups,
    groupsLoading,
    imgChange,
    impactTags,
    involvedTags,
    loading,
    newImage,
    offenderImgChange,
    offendersData,
    onAddOffender,
    onAddVehicle,
    onCancelNewImage,
    onEditImage,
    onEditOffender,
    onEditVehicle,
    onReject,
    onRemoveOffender,
    onRemoveVehicle,
    // onSearchBusiness,
    onSubmit,
    primaryImage,
    recentOffenderData,
    recentOffenderLoading,
    removeImage,
    removeImageFromOffender,
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setPrimaryImage,
    setSearchOffenders,
    tagsLoading,
    toggleAddIncidentTag,
    updateIncidentTag,
    vehiclesData,
  } = useEditIncident({ incidentId, reviewed });
  return (
    <div>
      <View
        addIncidentTag={addIncidentTag}
        addRecentOffender={addRecentOffender}
        assignOffendersToImages={assignOffendersToImages}
        beforeUpload={beforeUpload}
        crimeTypes={crimeTypes}
        data={data}
        fileList={fileList}
        goodsTypesData={goodsTypesData}
        groups={groups}
        groupsLoading={groupsLoading}
        imgChange={imgChange}
        impactTags={impactTags}
        involvedTags={involvedTags}
        loading={loading}
        newImage={newImage}
        offenderImgChange={offenderImgChange}
        offendersData={offendersData}
        onAddOffender={onAddOffender}
        onAddVehicle={onAddVehicle}
        onCancelNewImage={onCancelNewImage}
        onEditImage={onEditImage}
        onEditOffender={onEditOffender}
        onEditVehicle={onEditVehicle}
        onReject={onReject}
        onRemoveOffender={onRemoveOffender}
        onRemoveVehicle={onRemoveVehicle}
        // onSearchBusiness={onSearchBusiness}
        onSubmit={onSubmit}
        primaryImage={primaryImage}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        removeImage={removeImage}
        removeImageFromOffender={removeImageFromOffender}
        reviewed={reviewed}
        saving={saving}
        searchOffenders={searchOffenders}
        setAddRecentOffender={setAddRecentOffender}
        setAssignToImage={setAssignToImage}
        setPrimaryImage={setPrimaryImage}
        setSearchOffenders={setSearchOffenders}
        tagsLoading={tagsLoading}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}
        vehiclesData={vehiclesData}
      />
    </div>
  );
};

export default EditIncident;
