import type { FormData } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';
import type { IncidentFormField } from 'graphql/types';

import React from 'react';

import View from './IncidentTypes.view';
import useIncidentTypes from './useIncidentTypes';

interface Props {
  form: FormInstance<FormData>;
  incidentForm: IncidentFormField[];
  setPoliceReporting: (value: boolean) => void;
}

const IncidentTypes = ({ form, incidentForm, setPoliceReporting }: Props) => {
  const {
    incidentTagsData,
    incidentTagsLoading,
    oneSelectedIncidentTypeOnly,
    tags,
    tagsLoading,
  } = useIncidentTypes({ form, setPoliceReporting });

  return (
    <View
      incidentForm={incidentForm}
      incidentTagsData={incidentTagsData}
      incidentTagsLoading={incidentTagsLoading}
      oneSelectedIncidentTypeOnly={oneSelectedIncidentTypeOnly}
      tags={tags}
      tagsLoading={tagsLoading}
    />
  );
};

export default IncidentTypes;
