import type { FormData } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { IncidentFormField } from 'graphql/types';

import React from 'react';

import View from './IncidentTypes.view';
import useIncidentTypes from './useIncidentTypes';

interface Props {
  form: FormInstance<FormData>;
  incidentForm: IncidentFormField[];
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTagsLoading: boolean;
  setPoliceReporting: (value: boolean) => void;
  tagsData: TagsQuery | undefined;
}

const IncidentTypes = ({
  form,
  incidentForm,
  incidentTagsData: initIncidentTagsData,
  incidentTagsLoading,
  setPoliceReporting,
  tagsData,
}: Props) => {
  const {
    incidentTagsData,
    incidentTypeTooltip,
    oneSelectedIncidentTypeOnly,
    tags,
    tagsLoading,
  } = useIncidentTypes({
    form,
    incidentTagsData: initIncidentTagsData,
    setPoliceReporting,
    tagsData,
  });

  return (
    <View
      incidentForm={incidentForm}
      incidentTagsData={incidentTagsData}
      incidentTagsLoading={incidentTagsLoading}
      incidentTypeTooltip={incidentTypeTooltip}
      oneSelectedIncidentTypeOnly={oneSelectedIncidentTypeOnly}
      tags={tags}
      tagsLoading={tagsLoading}
    />
  );
};

export default IncidentTypes;
