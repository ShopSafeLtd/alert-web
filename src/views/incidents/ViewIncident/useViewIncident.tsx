import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { LocationData } from 'types/DataType';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import useCanView from '#/utils/in-scheme';
import { useViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { useUpdateIncidentStatusMutation } from 'graphql/incidents/mutations/__generated__/update-incident-status.generated';
import { useUpdateIncidentLocationMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-location.generated';
import { useListIncidentStatusesQuery } from 'graphql/incidents/queries/__generated__/list-incident-statuses.generated';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import errorNotification from 'types/mutation_notifications/error_notification';
import successNotification from 'types/mutation_notifications/success_notification';

interface IncidentStatus {
  id: string;
  name: string;
  tooltip?: null | string;
}

interface Return {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editImages: boolean;
  editRights: boolean;
  hasApprovePermission: boolean;
  hideIncident: boolean;
  incidentStatuses: IncidentStatus[];
  loading: boolean;
  onEditAddress: (value: LocationData) => void;
  onStatusChange: (statusId: string) => Promise<void>;
  saving: boolean;
  setSaving: (value: boolean) => void;
  showAiDetails: boolean;
  statusLoading: boolean;
  toggleEditAddress: () => void;
  toggleEditImages: () => void;
  toggleShowAiDetails: () => void;
  userId: string;
}

const useViewIncident = (incidentId: string): Return => {
  const hasApprovePermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Approve,
      model: PermissionModel.Incidents,
    },
  });

  const restrictIncidentAccess =
    useAtomValue(currentSchemeAtom)?.restrictIncidentAccess ?? false;
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const currentScheme = useAtomValue(currentSchemeAtom);

  const [saving, setSaving] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [showAiDetails, setShowAiDetail] = useState(false);

  const { data, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },
  });
  useCanView({
    currentScheme: currentScheme?.id ?? '',
    schemes: data?.incident?.schemes.map(({ id }) => id),
    type: 'incident',
  });

  // Incident statuses
  const { data: statusesData, loading: statusesLoading } =
    useListIncidentStatusesQuery();
  const [updateIncidentStatus, { loading: updateStatusLoading }] =
    useUpdateIncidentStatusMutation();

  const onStatusChange = async (statusId: string): Promise<void> => {
    await updateIncidentStatus({
      refetchQueries: ['ViewIncident'],
      variables: {
        data: {
          statusId,
        },
        where: {
          id: incidentId,
        },
      },
    });
  };

  // location
  const [updateIncidentLocation] = useUpdateIncidentLocationMutation({
    onError: () => {
      errorNotification();
    },
  });
  const onEditAddress = (value: LocationData) => {
    setSaving(true);
    if (value)
      void updateIncidentLocation({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Address,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          id: incidentId,
          location: {
            create: {
              building: value.building,
              county: value.county,
              geoLat: value.geoLat || undefined,
              geoLng: value.geoLng || undefined,
              postcode: value.postcode,
              premises: '',
              street: value.street,
              townCity: value.townCity,
            },
          },
        },
      }).finally(() => {
        toggleEditAddress();
        setSaving(false);
      });
  };

  // function

  const toggleEditAddress = () => {
    setEditAddress(!editAddress);
  };
  const toggleEditImages = () => {
    setEditImages(!editImages);
  };

  const editRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Incidents,
    },
  });

  const deleteRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Incidents,
    },
  });

  const toggleShowAiDetails = () => setShowAiDetail(!showAiDetails);

  return {
    data,
    deleteRights,
    editAddress,
    editImages,
    editRights,
    hasApprovePermission,
    hideIncident:
      !hasRolePermission({
        permission: {
          method: PermissionMethod.Read,
          model: PermissionModel.Incidents,
        },
      }) && restrictIncidentAccess,
    incidentStatuses:
      (statusesData?.incidentStatuses as IncidentStatus[]) || [],
    loading: (data === null || data === undefined) && loading,
    onEditAddress,
    onStatusChange,
    saving,
    setSaving,
    showAiDetails,
    statusLoading: statusesLoading || updateStatusLoading,
    toggleEditAddress,
    toggleEditImages,
    toggleShowAiDetails,
    userId,
  };
};

export default useViewIncident;
