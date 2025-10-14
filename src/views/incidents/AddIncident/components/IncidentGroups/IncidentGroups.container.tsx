import React from 'react';

import View from './IncidentGroups.view';
import useIncidentGroups from './useIncidentGroups';

interface Props {
  saving: boolean;
}

const IncidentGroups = ({ saving }: Props) => {
  const { groups, groupsLoading } = useIncidentGroups();

  return <View groups={groups} groupsLoading={groupsLoading} saving={saving} />;
};

export default IncidentGroups;
