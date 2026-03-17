import React from 'react';

import View from './EditIncidentFeed.view';
import useEditIncidentFeed from './useEditIncidentFeed';

interface Props {
  incidentId: string;
  onClose: () => void;
}

const EditIncidentFeed = ({ incidentId, onClose }: Props): JSX.Element => {
  const {
    customQuestions,
    data,
    groups,
    groupsLoading,
    impactTags,
    involvedTags,
    loading,
    onSubmit,
    onTypesChanged,
    saving,
    tagsLoading,
    usPoliceData,
    // onSearchBusiness,
  } = useEditIncidentFeed({
    incidentId,
    onClose,
  });

  return (
    <View
      customQuestions={customQuestions}
      data={data}
      groups={groups}
      groupsLoading={groupsLoading}
      impactTags={impactTags}
      involvedTags={involvedTags}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      onTypesChanged={onTypesChanged}
      saving={saving}
      tagsLoading={tagsLoading}
      usPoliceData={usPoliceData}
      // onSearchBusiness={onSearchBusiness}
    />
  );
};

export default EditIncidentFeed;
