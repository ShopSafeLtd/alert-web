import React from 'react';
import useIncidentGroups from './useIncidentGroups';
import View from './IncidentGroups.view';

interface Props {
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  saving: boolean;
}

const IncidentGroups = ({ formStages, saving }: Props) => {
  const { groups, groupsLoading } = useIncidentGroups();

  return (
    <View
      groups={groups}
      groupsLoading={groupsLoading}
      formStages={formStages}
      saving={saving}
    />
  );
};

export default IncidentGroups;
