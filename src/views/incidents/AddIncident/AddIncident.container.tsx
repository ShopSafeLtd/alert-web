import React from 'react';
import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

const EditIncident = (): JSX.Element => {
  const {
    addIncidentTag,
    assignOffendersToImages,
    beforeUpload,
    crimeGroupsData,
    fileList,
    form,
    groups,
    groupsLoading,
    imgChange,
    newImage,
    offenderImgChange,
    offendersData,
    onCancelNewImage,
    onSearchBusiness,
    onSubmit,
    primaryAddress,
    recentOffenderData,
    recentOffenderLoading,
    removeCrimeGroup,
    removeImage,
    removeImageFromOffender,
    removeOffender,
    removeVehicle,
    saving,
    searchOffenders,
    setAssignToImage,
    setSearchOffenders,
    tags,
    tagsLoading,
    toggleAddIncidentTag,
    updateCrimeGroupsData,
    updateIncidentTag,
    updateVehiclesData,
    vehiclesData,
    formStages,
    onValuesChange,
    isTheft,
    goodsTypesData,
    addNewAddress,
    toggleAddNewAddress,
    updateNewAddressData,
    newAddressData,
    onAddOffender,
  } = useAddIncident();

  return (
    <div>
      <View
        addIncidentTag={addIncidentTag}
        assignOffendersToImages={assignOffendersToImages}
        beforeUpload={beforeUpload}
        crimeGroupsData={crimeGroupsData}
        fileList={fileList}
        form={form}
        groups={groups}
        groupsLoading={groupsLoading}
        imgChange={imgChange}
        newImage={newImage}
        offenderImgChange={offenderImgChange}
        offendersData={offendersData}
        onCancelNewImage={onCancelNewImage}
        onSearchBusiness={onSearchBusiness}
        onSubmit={onSubmit}
        primaryAddress={primaryAddress}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        removeCrimeGroup={removeCrimeGroup}
        removeImage={removeImage}
        removeImageFromOffender={removeImageFromOffender}
        removeOffender={removeOffender}
        removeVehicle={removeVehicle}
        saving={saving}
        searchOffenders={searchOffenders}
        setAssignToImage={setAssignToImage}
        setSearchOffenders={setSearchOffenders}
        tags={tags}
        tagsLoading={tagsLoading}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateCrimeGroupsData={updateCrimeGroupsData}
        updateIncidentTag={updateIncidentTag}
        updateVehiclesData={updateVehiclesData}
        vehiclesData={vehiclesData}
        formStages={formStages}
        onValuesChange={onValuesChange}
        isTheft={isTheft}
        goodsTypesData={goodsTypesData}
        addNewAddress={addNewAddress}
        toggleAddNewAddress={toggleAddNewAddress}
        updateNewAddressData={updateNewAddressData}
        newAddressData={newAddressData}
        onAddOffender={onAddOffender}
      />
    </div>
  );
};

export default EditIncident;
