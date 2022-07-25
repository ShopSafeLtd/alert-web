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
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,

    // banId,
    // setBanId,
    // deleteConfirm,
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
        addIncidentTag={addIncidentTag}
        toggleAddIncidentTag={toggleAddIncidentTag}
        updateIncidentTag={updateIncidentTag}

        // banId={banId}
        // setBanId={setBanId}
        // deleteConfirm={deleteConfirm}
      />
    </div>
  );
}

export default EditIncident;
