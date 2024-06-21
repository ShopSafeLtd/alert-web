import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/restore-incident.generated';
import { useRestoreIncidentMutation } from 'graphql/recycled/mutations/restore-incident.generated';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/delete-incident.generated';
import { useDeleteIncidentMutation } from 'graphql/recycled/mutations/delete-incident.generated';
import type { RecycledItemQuery } from 'graphql/recycled/queries/recycled-item.generated';
import { useRecycledItemQuery } from 'graphql/recycled/queries/recycled-item.generated';

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

const useRestoreIncident = ({
  onClose,
  incidentId,
  recycledId,
  updateRestore,
  updateDelete,
}: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const { data, loading } = useRecycledItemQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        incidentId,
      },
    },
  });

  const [restoreIncident] = useRestoreIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Restored!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The incident has been restored! ',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: updateRestore,
  });
  const onSubmit = () => {
    setSaving(true);
    if (incidentId && recycledId)
      void restoreIncident({
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
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The incident has been deleted.',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: updateDelete,
  });

  const onDelete = () => {
    setSaving(true);
    if (incidentId)
      void deleteIncident({
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
