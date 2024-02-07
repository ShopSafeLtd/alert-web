import React from 'react';
import type { IncidentFormField } from 'graphql/generated';
import View from './IncidentTypes.view';
import useIncidentTypes from './useIncidentTypes';

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
