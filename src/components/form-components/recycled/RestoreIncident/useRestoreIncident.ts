import { useState } from 'react';
import {
  RecycledItemQuery,
  useRecycledItemQuery,
  useRestoreIncidentMutation,
  useDeleteIncidentMutation,
  RestoreIncidentMutation,
  DeleteIncidentMutation,
} from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';

interface Props {
  onClose: () => void;
  incidentId: string | undefined;
  recycledId: string | undefined;
  updateRestore: MutationUpdaterFn<RestoreIncidentMutation>;
  updateDelete: MutationUpdaterFn<DeleteIncidentMutation>;
}
interface Return {
  onSubmit: () => void;
  onDelete: () => void;
  data: RecycledItemQuery | undefined;
  loading: boolean;
  saving: boolean;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useRestoreIncident = ({
  onClose,
  incidentId,
  recycledId,
  updateRestore,
  updateDelete,
}: Props): Return => {
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The incident has been restored! ',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
  const deleteNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The incident has been Deleted! ',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
  const { data, loading } = useRecycledItemQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        // id: recycledId,
        incidentId,
      },
    },
  });
  const [restoreIncident] = useRestoreIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
      setSaving(false);
    },
    update: updateRestore,
  });
  const onSubmit = () => {
    setSaving(true);
    if (incidentId && recycledId)
      restoreIncident({
        variables: {
          id: incidentId,
          recycledId,
        },
      });
  };

  const [deleteIncident] = useDeleteIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      deleteNotification('success');
    },
    onError: () => {
      deleteNotification('error');
      setSaving(false);
    },
    update: updateDelete,
  });

  const onDelete = () => {
    setSaving(true);
    if (incidentId)
      deleteIncident({
        variables: { where: { id: incidentId } },
      });
  };
  return {
    onSubmit,
    onDelete,
    data,
    loading,
    saving,
  };
};

export default useRestoreIncident;
