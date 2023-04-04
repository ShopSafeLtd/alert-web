import { useState } from 'react';
import type {
  ListCrimeGroupsQuery,
  ListIncidentsQuery,
} from 'graphql/generated';
import {
  useListCrimeGroupsQuery,
  SortOrder,
  useListIncidentsQuery,
  Role,
  useUpdateCrimeGroupMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';

import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import { useParams } from 'react-router';
import { notification } from 'antd';
// import { VehicleData } from 'types/DataType';

interface Props {
  onClose: () => void;
  // update: (value: VehicleData) => void;
}
interface FormData {
  make?: string;
  model?: string;
  colour?: string;
  registration?: string;
  crimeGroup?: string[];
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

const useAddVehicle = ({ onClose }: Props): Return => {
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

  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The vehicle has been added to the crime group! ',
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

  const onSubmit = (data: FormData) => {
    setSaving(true);
    updateCrimeGroup({
      variables: {
        where: {
          id: params.id || '',
        },
        data: {
          vehicles: {
            create: [
              {
                make: data.make || '',
                model: data.model || '',
                colour: data.colour || '',
                registration: data.registration || '',
                incidents: {
                  connect:
                    incidentsData && incidentsData.length > 0
                      ? incidentsData.map(({ id }) => ({ id }))
                      : undefined,
                },
                offenders: {
                  connect:
                    offendersData && offendersData.length > 0
                      ? offendersData.map(({ id }) => ({ id }))
                      : undefined,
                },
              },
            ],
          },
        },
      },
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
export default useAddVehicle;
