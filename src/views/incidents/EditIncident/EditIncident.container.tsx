import React from 'react';
import View from './EditIncident.view';
import useEditIncident from './useEditIncident';

function EditIncident(): JSX.Element {
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
    fileList,
    beforeUpload,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
    offendersData,
    deleteConfirm,
  } = useEditIncident();
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
        fileList={fileList}
        beforeUpload={beforeUpload}
        addIncidentTag={addIncidentTag}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}
        addOffender={addOffender}
        toggleAddOffender={toggleAddOffender}
        addExistingOffender={addExistingOffender}
        toggleAddExistingOffender={toggleAddExistingOffender}
        updateOffenderList={updateOffenderList}
        offendersData={offendersData}
        deleteConfirm={deleteConfirm}
      />
    </div>
  );
}

export default EditIncident;
