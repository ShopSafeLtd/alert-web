import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  reviewed: boolean;
}

const EditOffender = ({ reviewed }: Props): JSX.Element => {
  const offenderId = useParams().id || '';
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
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    onAddExclusion,
    onUpdateExclusion,
    banData,
    setBanData,
    bansData,
    adminRights,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    onReject,
    selectedItems,
    setSelectedItems,
    form,
    vehiclesData,
    crimeGroupsData,
    listVehiclesData,
    idVerified,
    onValuesChange,
    addAddress,
    editAddress,
    toggleAddAddress,
    toggleEditAddress,
    addressesData,
    onDeleteAddress,
    onEditAddress,
    onSubmitAddress,
    editImage,
    onEditImage,
    toggleEditImage,
    onAddVehicle,
    onRemoveVehicle,
    onEditVehicle,
    onAddCrimeGroup,
    onRemoveCrimeGroup,
  } = useEditOffender({ offenderId, reviewed });
  return (
    <div>
      <View
        form={form}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
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
        beforeUpload={beforeUpload}
        fileList={fileList}
        addOffenderTag={addOffenderTag}
        toggleAddOffenderTag={toggleAddOffenderTag}
        updateOffenderTag={updateOffenderTag}
        addExclusion={addExclusion}
        toggleAddExclusion={toggleAddExclusion}
        editExclusion={editExclusion}
        toggleEditExclusion={toggleEditExclusion}
        onAddExclusion={onAddExclusion}
        onUpdateExclusion={onUpdateExclusion}
        bansData={bansData}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        reviewed={reviewed}
        onReject={onReject}
        adminRights={adminRights}
        vehiclesData={vehiclesData}
        onRemoveCrimeGroup={onRemoveCrimeGroup}
        crimeGroupsData={crimeGroupsData}
        onAddCrimeGroup={onAddCrimeGroup}
        listVehiclesData={listVehiclesData}
        idVerified={idVerified}
        onValuesChange={onValuesChange}
        addAddress={addAddress}
        editAddress={editAddress}
        toggleAddAddress={toggleAddAddress}
        toggleEditAddress={toggleEditAddress}
        addressesData={addressesData}
        onSubmitAddress={onSubmitAddress}
        onDeleteAddress={onDeleteAddress}
        onEditAddress={onEditAddress}
        editImage={editImage}
        onEditImage={onEditImage}
        toggleEditImage={toggleEditImage}
        onAddVehicle={onAddVehicle}
        onEditVehicle={onEditVehicle}
        onRemoveVehicle={onRemoveVehicle}
      />
    </div>
  );
};

export default EditOffender;
