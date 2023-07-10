import React from 'react';
import View from './EditIncidentFeed.view';
import useEditIncidentFeed from './useEditIncidentFeed';

interface Props {
  onClose: () => void;
  incidentId: string;
}

const EditIncidentFeed = ({ onClose, incidentId }: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    crimeTypes,
    impactTags,
    involvedTags,
    tagsLoading,
    groups,
    groupsLoading,
    saving,
    onSearchBusiness,
  } = useEditIncidentFeed({
    onClose,
    incidentId,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      groups={groups}
      groupsLoading={groupsLoading}
      saving={saving}
      crimeTypes={crimeTypes}
      impactTags={impactTags}
      involvedTags={involvedTags}
      tagsLoading={tagsLoading}
      onSearchBusiness={onSearchBusiness}
    />
  );
};

export default EditIncidentFeed;
