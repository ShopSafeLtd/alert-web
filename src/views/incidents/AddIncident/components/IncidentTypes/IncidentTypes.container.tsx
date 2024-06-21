import React from 'react';

import View from './IncidentTypes.view';
import useIncidentTypes from './useIncidentTypes';
import type { IncidentFormField } from 'graphql/types';

interface Props {
  incidentForm: IncidentFormField[];
}

const IncidentTypes = ({ incidentForm }: Props) => {
  const {
    incidentTagsData,
    incidentTagsLoading,
    tagsLoading,
    tags,
    oneSelectedIncidentTypeOnly,
  } = useIncidentTypes();

  return (
    <View
      incidentTagsData={incidentTagsData}
      incidentTagsLoading={incidentTagsLoading}
      tagsLoading={tagsLoading}
      tags={tags}
      incidentForm={incidentForm}
      oneSelectedIncidentTypeOnly={oneSelectedIncidentTypeOnly}
    />
  );
};

export default IncidentTypes;
