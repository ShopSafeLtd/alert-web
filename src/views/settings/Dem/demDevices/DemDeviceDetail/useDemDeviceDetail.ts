import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { DemDeviceQuery } from '../graphql/queries/__generated__/dem-device.generated';

import { useDeleteDemDeviceMutation } from '../graphql/mutations/__generated__/delete-dem-device.generated';
import { useUpdateDemDeviceMutation } from '../graphql/mutations/__generated__/update-dem-device-business.generated';
import { useDemDeviceQuery } from '../graphql/queries/__generated__/dem-device.generated';

interface Return {
  assignToBusiness: boolean;
  data: DemDeviceQuery | undefined;
  deleteConfirm: () => void;
  editDemDevice: boolean;
  loading: boolean;
  onAssignedBusiness: (value: string) => void;
  saving: boolean;
  toggleAssignToBusiness: () => void;
  toggleEditDemDevice: () => void;
}

const useDemDeviceDetail = (demDeviceId: string): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [editDemDevice, setEditDemDevice] = useState(false);
  const [assignToBusiness, setAssignToBusiness] = useState(false);

  const { data, loading } = useDemDeviceQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: demDeviceId,
      },
    },
  });
  const [updateDemDevice] = useUpdateDemDeviceMutation({
    onError: () => {
      errorNotification();
    },
  });

  const onAssignedBusiness = (value: string) => {
    setSaving(true);
    void updateDemDevice({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The dem device has been assigned to business.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Successfully Assigned!',
          }),
          placement: 'bottomRight',
        });
      },
      variables: {
        data: {
          businessId: value,
        },
        where: { id: demDeviceId },
      },
    }).finally(() => {
      setSaving(false);
      setAssignToBusiness(false);
    });
  };
  const [deleteDemDevice] = useDeleteDemDeviceMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The dem device has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const deleteConfirm = () => {
    setSaving(true);
    if (demDeviceId)
      void deleteDemDevice({
        variables: {
          id: demDeviceId,
        },
      });
  };
  const toggleEditDemDevice = () => setEditDemDevice(!editDemDevice);
  const toggleAssignToBusiness = () => setAssignToBusiness(!assignToBusiness);

  return {
    assignToBusiness,
    data,
    deleteConfirm,
    editDemDevice,
    loading,
    onAssignedBusiness,
    saving,
    toggleAssignToBusiness,
    toggleEditDemDevice,
  };
};

export default useDemDeviceDetail;
