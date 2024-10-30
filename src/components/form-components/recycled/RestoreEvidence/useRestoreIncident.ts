import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/__generated__/delete-incident.generated';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/__generated__/restore-incident.generated';
import type { RecycledItemQuery } from 'graphql/recycled/queries/__generated__/recycled-item.generated';

import { notification } from 'antd';
import { useDeleteIncidentMutation } from 'graphql/recycled/mutations/__generated__/delete-incident.generated';
import { useRestoreIncidentMutation } from 'graphql/recycled/mutations/__generated__/restore-incident.generated';
import { useRecycledItemQuery } from 'graphql/recycled/queries/__generated__/recycled-item.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  incidentId: string | undefined;
  onClose: () => void;
  recycledId: string | undefined;
  updateDelete: MutationUpdaterFn<DeleteIncidentMutation>;
  updateRestore: MutationUpdaterFn<RestoreIncidentMutation>;
}
interface Return {
  data: RecycledItemQuery | undefined;
  loading: boolean;
  onDelete: () => void;
  onSubmit: () => void;
  saving: boolean;
}

const useRestoreIncident = ({
  incidentId,
  onClose,
  recycledId,
  updateDelete,
  updateRestore,
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
        description: intl.formatMessage({
          defaultMessage: 'The incident has been restored! ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Restored!',
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
        description: intl.formatMessage({
          defaultMessage: 'The incident has been deleted.',
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
    data,
    loading,
    onDelete,
    onSubmit,
    saving,
  };
};

export default useRestoreIncident;
