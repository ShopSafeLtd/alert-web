import React from 'react';
import View from './EditOffender.view';
import type { OffenderData } from './useEditOffender';
import useEditOffender from './useEditOffender';

interface Props {
  id: string;
  onClose: () => void;
  update: (value: OffenderData) => void;
}

const EditOffender = ({ id, onClose, update }: Props): JSX.Element => {
  const offenderId = id;
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
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateNewOffenderTagData,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    updateExclusion,
    banData,
    setBanData,
    bansData,
    adminRights,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    selectedItems,
    setSelectedItems,
    form,
  } = useEditOffender({ offenderId, onClose, update });
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
        beforeUpload={beforeUpload}
        fileList={fileList}
        addOffenderTag={addOffenderTag}
        toggleAddOffenderTag={toggleAddOffenderTag}
        updateNewOffenderTagData={updateNewOffenderTagData}
        addExclusion={addExclusion}
        toggleAddExclusion={toggleAddExclusion}
        editExclusion={editExclusion}
        toggleEditExclusion={toggleEditExclusion}
        updateExclusion={updateExclusion}
        bansData={bansData}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        onClose={onClose}
        adminRights={adminRights}
      />
    </div>
  );
};

export default EditOffender;
