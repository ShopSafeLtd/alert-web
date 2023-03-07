import {
  useViewInvestigationQuery,
  ViewInvestigationQuery,
} from 'graphql/generated';
import { useState } from 'react';

interface Return {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;
  offenderIds: string[];
  vehicleIds: string[];
  incidentIds: string[];
  crimeGroupIds: string[];
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addExistingVehicle: boolean;
  toggleAddExistingVehicle: () => void;
  addExistingCrimeGroup: boolean;
  toggleAddExistingCrimeGroup: () => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
}
const useViewInvestigation = (investigationId: string): Return => {
  const [offenderIds, setOffenderIds] = useState<string[]>([]);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [crimeGroupIds, setCrimeGroupIds] = useState<string[]>([]);
  const [incidentIds, setIncidentIds] = useState<string[]>([]);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);
  const [addExistingIncident, setAddExistingIncident] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);

  const { data, loading } = useViewInvestigationQuery({
    variables: {
      where: {
        id: investigationId,
      },
    },
    onCompleted: ({ investigation }) => {
      if (investigation?.offenders && investigation.offenders.length) {
        setOffenderIds(investigation.offenders.map(({ id }) => id));
      }
      if (investigation?.vehicles && investigation.vehicles.length) {
        setVehicleIds(investigation.vehicles.map(({ id }) => id));
      }
      if (investigation?.crimeGroups && investigation.crimeGroups.length) {
        setCrimeGroupIds(investigation.crimeGroups.map(({ id }) => id));
      }
      if (investigation?.incidents && investigation.incidents.length) {
        setIncidentIds(investigation.incidents.map(({ id }) => id));
      }
    },
  });

  const toggleAddExistingOffender = () => {
    setAddExistingOffender(() => !addExistingOffender);
  };

  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(() => !addExistingVehicle);
  };

  const toggleAddExistingCrimeGroup = () => {
    setAddExistingCrimeGroup(() => !addExistingCrimeGroup);
  };

  const toggleAddExistingIncident = () => {
    setAddExistingIncident(() => !addExistingIncident);
  };

  return {
    data,
    loading,

    offenderIds,
    vehicleIds,
    incidentIds,
    crimeGroupIds,
    addExistingOffender,
    toggleAddExistingOffender,
    addExistingVehicle,
    toggleAddExistingVehicle,
    addExistingCrimeGroup,
    toggleAddExistingCrimeGroup,
    addExistingIncident,
    toggleAddExistingIncident,
  };
};

export default useViewInvestigation;
