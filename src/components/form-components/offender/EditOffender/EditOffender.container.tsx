import React from 'react';

import type { OffenderData } from './useEditOffender';

import View from './EditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  id: string;
  onClose: () => void;
  update: (value: OffenderData) => void;
}

const EditOffender = ({ id, onClose, update }: Props): JSX.Element => {
  const offenderId = id;
  const {
    addExclusion,
    addOffenderTag,
    ageCheck,
    banData,
    bansData,
    beforeUpload,
    data,
    deleteConfirm,
    editExclusion,
    fileList,
    form,
    groups,
    groupsLoading,
    imgChange,
    loading,
    onSubmit,
    saving,
    selectedItems,
    setAgeCheck,
    setBanData,
    setSelectedItems,
    tags,
    tagsLoading,
    toggleAddExclusion,
    toggleAddOffenderTag,
    toggleEditExclusion,
    updateExclusion,
    updateNewOffenderTagData,
  } = useEditOffender({ offenderId, onClose, update });
  return (
    <div>
      <View
        addExclusion={addExclusion}
        addOffenderTag={addOffenderTag}
        ageCheck={ageCheck}
        banData={banData}
        bansData={bansData}
        beforeUpload={beforeUpload}
        data={data}
        deleteConfirm={deleteConfirm}
        editExclusion={editExclusion}
        fileList={fileList}
        form={form}
        groups={groups}
        groupsLoading={groupsLoading}
        imgChange={imgChange}
        loading={loading}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving}
        selectedItems={selectedItems}
        setAgeCheck={setAgeCheck}
        setBanData={setBanData}
        setSelectedItems={setSelectedItems}
        tags={tags}
        tagsLoading={tagsLoading}
        toggleAddExclusion={toggleAddExclusion}
        toggleAddOffenderTag={toggleAddOffenderTag}
        toggleEditExclusion={toggleEditExclusion}
        updateExclusion={updateExclusion}
        updateNewOffenderTagData={updateNewOffenderTagData}
      />
    </div>
  );
};

export default EditOffender;
