import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import React from 'react';

import IncidentPoliceView from './IncidentPolice.view';
import IncidentPoliceReportingView from './IncidentPoliceReporting.view';

interface Props {
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  policeReporting: boolean;
  saving: boolean;
  usPoliceData?: boolean;
}

const IncidentPolice = ({
  form,
  generatingStatement,
  policeReporting,
  saving,
  usPoliceData,
}: Props) =>
  policeReporting ? (
    <IncidentPoliceReportingView
      form={form}
      generatingStatement={generatingStatement}
      saving={saving}
      usPoliceData={usPoliceData}
    />
  ) : (
    <IncidentPoliceView
      form={form}
      saving={saving}
      usPoliceData={usPoliceData}
    />
  );

export default IncidentPolice;
