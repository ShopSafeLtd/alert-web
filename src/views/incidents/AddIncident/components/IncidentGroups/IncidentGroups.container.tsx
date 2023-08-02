import React from 'react';
import useIncidentGroups from './useIncidentGroups';
import View from './IncidentGroups.view';

interface Props {
  saving: boolean;
}

const IncidentGroups = ({ saving }: Props) => {
  const { groups, groupsLoading } = useIncidentGroups();

  return <View groups={groups} groupsLoading={groupsLoading} saving={saving} />;
};

export default IncidentGroups;
