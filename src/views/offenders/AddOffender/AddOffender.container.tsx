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
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    bansData,
    updateAddExclusion,
    updateEditExclusion,
    banData,
    setBanData,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
  } = useAddOffender();
  return (
    <div>
      <View
        onSubmit={onSubmit}
        bansData={bansData}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        imgChange={imgChange}
        fileList={fileList}
        addOffenderTag={addOffenderTag}
        toggleAddOffenderTag={toggleAddOffenderTag}
        updateOffenderTag={updateOffenderTag}
        addExclusion={addExclusion}
        toggleAddExclusion={toggleAddExclusion}
        editExclusion={editExclusion}
        toggleEditExclusion={toggleEditExclusion}
        updateAddExclusion={updateAddExclusion}
        updateEditExclusion={updateEditExclusion}
        banData={banData}
        setBanData={setBanData}
        deleteConfirm={deleteConfirm}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
      />
    </div>
  );
}

export default AddOffender;
