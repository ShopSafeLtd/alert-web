import type { FormData } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';

import React from 'react';

import IncidentPoliceView from './IncidentPolice.view';
import IncidentPoliceReportingView from './IncidentPoliceReporting.view';

interface Props {
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  policeReporting: boolean;
  saving: boolean;
}

const IncidentPolice = ({
  form,
  generatingStatement,
  policeReporting,
  saving,
}: Props) =>
  policeReporting ? (
    <IncidentPoliceReportingView
      form={form}
      generatingStatement={generatingStatement}
      saving={saving}
    />
  ) : (
    <IncidentPoliceView form={form} saving={saving} />
  );

export default IncidentPolice;
