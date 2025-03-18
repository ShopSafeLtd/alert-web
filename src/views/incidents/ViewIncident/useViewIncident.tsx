import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { LocationData } from 'types/DataType';

import hasPermission from '#/utils/has-permission';
import hasRolePermission from '#/utils/has-role-permission';
import useCanView from '#/utils/in-scheme';
import { useViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { useUpdateIncidentLocationMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-location.generated';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useMemo, useState } from 'react';
import { useStoreState } from 'state';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import errorNotification from 'types/mutation_notifications/error_notification';
import successNotification from 'types/mutation_notifications/success_notification';

interface Return {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editImages: boolean;
  editRights: boolean;
  hasApprovePermission: boolean;
  hideIncident: boolean;
  loading: boolean;
  onEditAddress: (value: LocationData) => void;
  saving: boolean;
  setSaving: (value: boolean) => void;
  toggleEditAddress: () => void;
  toggleEditImages: () => void;
  userId: string;
}

const useViewIncident = (incidentId: string): Return => {
  const hasApprovePermission = hasRolePermission({
    permission: {
      method: PermissionMethod.Approve,
      model: PermissionModel.Incidents,
    },
  });

  const { id: schemeId, restrictIncidentAccess } = useStoreState(
    (state) => state.scheme
  );
  const { id: userId, schemes } = useStoreState((state) => state.user);

  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === schemeId),
    [schemes, schemeId]
  );
  const permissions = currentScheme?.permissions;

  const [saving, setSaving] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editImages, setEditImages] = useState(false);

  const { data, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },
  });
  useCanView({
    currentScheme: currentScheme?.scheme.id || '',
    schemes: data?.incident?.schemes.map(({ id }) => id),
    type: 'incident',
  });

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

  const editRights = hasPermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Incidents,
    },
    permissions,
  });

  const deleteRights = hasPermission({
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Incidents,
    },
    permissions,
  });

  return {
    data,
    deleteRights,
    editAddress,
    editImages,
    editRights,
    hasApprovePermission,
    hideIncident:
      hasRolePermission({
        permission: {
          method: PermissionMethod.Read,
          model: PermissionModel.Incidents,
        },
      }) && restrictIncidentAccess,
    loading: (data === null || data === undefined) && loading,
    onEditAddress,
    saving,
    setSaving,
    toggleEditAddress,
    toggleEditImages,
    userId,
  };
};

export default useViewIncident;
