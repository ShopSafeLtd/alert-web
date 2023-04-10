import type { ViewInvestigationQuery } from 'graphql/generated';
import { useViewInvestigationQuery } from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from '../../../state';

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
  toggleAddDocument: () => void;
  addDocument: boolean;
  toggleAddDemDocument: () => void;
  addDemDocument: boolean;
  demId: string | null | undefined;
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
  const [addDocument, setAddDocument] = useState(false);
  const [addDemDocument, setAddDemDocument] = useState(false);
  const demId = useStoreState((state) => state.user.demId);
  const { data, loading } = useViewInvestigationQuery({
    variables: {
      where: {
        id: investigationId,
      },
    },
    onCompleted: ({ investigation }) => {
      if (investigation?.offenders && investigation.offenders.length > 0) {
        setOffenderIds(investigation.offenders.map(({ id }) => id));
      }
      if (investigation?.vehicles && investigation.vehicles.length > 0) {
        setVehicleIds(investigation.vehicles.map(({ id }) => id));
      }
      if (investigation?.crimeGroups && investigation.crimeGroups.length > 0) {
        setCrimeGroupIds(investigation.crimeGroups.map(({ id }) => id));
      }
      if (investigation?.incidents && investigation.incidents.length > 0) {
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

  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };
  const toggleAddDemDocument = () => {
    setAddDemDocument(() => !addDemDocument);
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
    addDemDocument,
    toggleAddDemDocument,
    addDocument,
    toggleAddDocument,
    demId,
  };
};

export default useViewInvestigation;
