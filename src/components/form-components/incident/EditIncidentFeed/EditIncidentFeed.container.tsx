import React from 'react';

import View from './EditIncidentFeed.view';
import useEditIncidentFeed from './useEditIncidentFeed';

interface Props {
  incidentId: string;
  onClose: () => void;
}

const EditIncidentFeed = ({ incidentId, onClose }: Props): JSX.Element => {
  const {
    data,
    groups,
    groupsLoading,
    impactTags,
    involvedTags,
    loading,
    onSubmit,
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
      data={data}
      groups={groups}
      groupsLoading={groupsLoading}
      impactTags={impactTags}
      involvedTags={involvedTags}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      tagsLoading={tagsLoading}
      usPoliceData={usPoliceData}
      // onSearchBusiness={onSearchBusiness}
    />
  );
};

export default EditIncidentFeed;
