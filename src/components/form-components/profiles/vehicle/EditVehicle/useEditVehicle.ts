import { useEffect, useState } from 'react';
import {
  useListCrimeGroupsQuery,
  ListCrimeGroupsQuery,
  useListIncidentsQuery,
  ListIncidentsQuery,
  Role,
} from 'graphql/generated';

import { useStoreState } from 'state';
import { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import { VehicleData } from 'types/DataType';

interface FormData {
  make?: string;
  model?: string;
  colour?: string;
  registration?: string;
  crimeGroup: string[];
  incidents?: string[];
  offenders?: string[];
}

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleData | undefined;
}

interface Return {
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving: boolean;
  offendersData: OffenderData[];
  incidentsData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'];
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: string) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  adminRights: boolean;
}

const useEditVehicle = ({ onClose, update, editData }: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [incidentsData, setIncidentsData] = useState<
    Exclude<ListIncidentsQuery['listIncidents'], undefined | null>['incidents']
  >([]);

  useEffect(() => {
    setOffendersData(<[]>editData?.offenders);
    setIncidentsData(<[]>editData?.incidents);
  }, [editData]);

  const { data: listIncidentsData } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: CrimeGroupsData, loading: CrimeGroupsLoading } =
    useListCrimeGroupsQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update({
      id: editData?.id || '',
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      edited: true,
      crimeGroup:
        data?.crimeGroup && data.crimeGroup.length
          ? data?.crimeGroup?.map((id) => id)
          : [],
      incidents:
        incidentsData && incidentsData.length
          ? incidentsData.map(({ id }) => id)
          : [],
      offenders:
        offendersData && offendersData.length
          ? offendersData.map(({ id }) => id)
          : [],
    });
    onClose();
  };
  // function
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };

  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (!offendersData?.find(({ id }) => id === selectedOffender.id)) {
      setOffendersData([...offendersData, selectedOffender]);
    }
  };
  const updateIncidentList = (selectedIncidentId: string) => {
    if (
      listIncidentsData?.listIncidents?.incidents &&
      listIncidentsData.listIncidents.total > 0
    ) {
      const selectedIncident =
        listIncidentsData?.listIncidents?.incidents.filter(
          ({ id }) => id === selectedIncidentId
        );
      setIncidentsData([...incidentsData, ...selectedIncident]);
    }
  };
  const removeOffender = (offenderId: string | undefined) => {
    if (offenderId) {
      setOffendersData(
        offendersData?.filter((offender) => offender.id !== offenderId)
      );
    }
  };
  const removeIncident = (incidentId: string | undefined) => {
    if (incidentId) {
      setIncidentsData(
        incidentsData?.filter((incident) => incident.id !== incidentId)
      );
    }
  };

  return {
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
    saving,
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
    adminRights: role !== Role.User,
  };
};
export default useEditVehicle;
