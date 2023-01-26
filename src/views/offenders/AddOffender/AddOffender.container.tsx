import React from 'react';
import View from './AddOffender.view';

import useAddOffender from './useAddOffender';

function AddOffender(): JSX.Element {
  const {
    onSubmit,
    saving,
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    imgChange,
    onPreview,
    removeImage,
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    bansData,
    updateExclusion,
    banData,
    setBanData,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    selectedItems,
    setSelectedItems,
    form,
    adminRights,
  } = useAddOffender();

  return (
    <div>
      <View
        form={form}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onSubmit={onSubmit}
        bansData={bansData}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        imgChange={imgChange}
        removeImage={removeImage}
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
        updateExclusion={updateExclusion}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        adminRights={adminRights}
      />
    </div>
  );
}

export default AddOffender;
