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
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addExistingVehicle: boolean;
  toggleAddExistingVehicle: () => void;
  addExistingCrimeGroup: boolean;
  toggleAddExistingCrimeGroup: () => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  crimeGroupIds: string[];
  incidentIds: string[];
}

interface Props {
  investigationId: string;
}
const useViewDetails = ({ investigationId }: Props): Return => {
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [offenderIds, setOffenderIds] = useState<string[]>([]);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);
  const [crimeGroupIds, setCrimeGroupIds] = useState<string[]>([]);
  const [addExistingIncident, setAddExistingIncident] = useState(false);
  const [incidentIds, setIncidentIds] = useState<string[]>([]);

  const { data, loading } = useViewInvestigationQuery({
    fetchPolicy: 'cache-and-network',
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

  // function

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
    loading: data && data.investigation ? false : loading,
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

export default useViewDetails;
