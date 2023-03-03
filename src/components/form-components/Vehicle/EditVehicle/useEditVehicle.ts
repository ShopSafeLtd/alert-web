import { useState } from 'react';
import {
  useUpdateVehicleMutation,
  useListCrimeGroupsQuery,
  ListCrimeGroupsQuery,
  SortOrder,
  useListIncidentsQuery,
  ListIncidentsQuery,
  Role,
  VehicleQuery,
  useVehicleQuery,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import { useParams } from 'react-router';

export interface VehicleData {
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
}

interface Return {
  data: VehicleQuery | undefined;
  loading: boolean;
  onSubmit: (value: VehicleData) => void;
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

const useEditVehicle = ({ onClose }: Props): Return => {
  const params = useParams();
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  // const [offendersData, setOffendersData] = useState<| Exclude<
  //      ListOffendersQuery['listOffenders'],
  //       undefined | null
  //     >['offenders']
  //   | undefined>([]);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);

  const [incidentsData, setIncidentsData] = useState<
    Exclude<ListIncidentsQuery['listIncidents'], undefined | null>['incidents']
  >([]);

  const { data: VehicleData, loading } = useVehicleQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
    onCompleted: ({ vehicle }) => {
      setOffendersData(<[]>vehicle?.offenders);
      setIncidentsData(<[]>vehicle?.incidents);
    },
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
  const { data: listIncidentsData } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt: SortOrder.Desc,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  // const { data: listOffendersData } = useListOffendersQuery({
  //   variables: {
  //     scheme: {
  //       id: schemeId,
  //     },
  //     order: {
  //       updatedAt: SortOrder.Desc,
  //     },
  //   },
  //   fetchPolicy: 'cache-and-network',
  // });
  const [updateVehicle] = useUpdateVehicleMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The vehicle has been updated! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = (data: VehicleData) => {
    setSaving(true);
    updateVehicle({
      variables: {
        where: {
          id: params.id || '',
        },
        data: {
          make: data.make || '',
          model: data.model || '',
          colour: data.colour || '',
          registration: data.registration || '',
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          incidents:
            incidentsData && incidentsData.length
              ? incidentsData.map(({ id }) => ({ id }))
              : [],
          offenders:
            offendersData && offendersData.length
              ? offendersData.map(({ id }) => ({ id }))
              : [],
          schemes: schemeId,
        },
      },
    });
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
    data: VehicleData,
    loading,
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
