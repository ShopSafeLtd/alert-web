import React from 'react';
import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

const AddIncident = (): JSX.Element => {
  const {
    addIncidentTag,
    assignOffendersToImages,
    beforeUpload,
    fileList,
    form,
    imgChange,
    newImage,
    offenderImgChange,
    offendersData,
    onCancelNewImage,
    onSubmit,
    primaryAddress,
    recentOffenderData,
    recentOffenderLoading,
    removeImage,
    removeImageFromOffender,
    removeOffender,
    saving,
    searchOffenders,
    setAssignToImage,
    setSearchOffenders,
    toggleAddIncidentTag,
    updateIncidentTag,
    vehiclesData,
    formStages,
    onValuesChange,
    isTheft,
    addNewAddress,
    toggleAddNewAddress,
    updateNewAddressData,
    newAddressData,
    onAddOffender,
    dontKnowGoods,
    goodsVisible,
    knowGoods,
    onEditImage,
    onAddVehicle,
    onRemoveVehicle,
    primaryImage,
    setPrimaryImage,
    incidentForm,
    customQuestions,
  } = useAddIncident();

  return (
    <div>
      <View
        addIncidentTag={addIncidentTag}
        assignOffendersToImages={assignOffendersToImages}
        beforeUpload={beforeUpload}
        fileList={fileList}
        form={form}
        imgChange={imgChange}
        newImage={newImage}
        offenderImgChange={offenderImgChange}
        offendersData={offendersData}
        onCancelNewImage={onCancelNewImage}
        onSubmit={onSubmit}
        primaryAddress={primaryAddress}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={recentOffenderLoading}
        removeImage={removeImage}
        removeImageFromOffender={removeImageFromOffender}
        removeOffender={removeOffender}
        saving={saving}
        searchOffenders={searchOffenders}
        setAssignToImage={setAssignToImage}
        setSearchOffenders={setSearchOffenders}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}
        vehiclesData={vehiclesData}
        formStages={formStages}
        onValuesChange={onValuesChange}
        isTheft={isTheft}
        addNewAddress={addNewAddress}
        toggleAddNewAddress={toggleAddNewAddress}
        updateNewAddressData={updateNewAddressData}
        newAddressData={newAddressData}
        onAddOffender={onAddOffender}
        dontKnowGoods={dontKnowGoods}
        goodsVisible={goodsVisible}
        knowGoods={knowGoods}
        onEditImage={onEditImage}
        onAddVehicle={onAddVehicle}
        onRemoveVehicle={onRemoveVehicle}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        incidentForm={incidentForm}
        customQuestions={customQuestions}
      />
    </div>
  );
};

export default AddIncident;
