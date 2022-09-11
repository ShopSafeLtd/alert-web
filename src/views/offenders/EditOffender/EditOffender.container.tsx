import React from 'react';
import { useParams } from 'react-router-dom';
import View from './EditOffender.view';
import useEditOffender from './useEditOffender';

interface Props {
  reviewed: boolean;
}
function EditOffender({ reviewed }: Props): JSX.Element {
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
    updateExclusion,
    banId,
    setBanId,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    onReject,
  } = useEditOffender({ offenderId, reviewed });
  return (
    <div>
      <View
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
        updateExclusion={updateExclusion}
        banId={banId}
        setBanId={setBanId}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        reviewed={reviewed}
        onReject={onReject}
      />
    </div>
  );
}

export default EditOffender;
