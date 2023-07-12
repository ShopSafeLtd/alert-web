import { useState } from 'react';
import type {
  RecycledItemQuery,
  RestoreIncidentMutation,
  DeleteIncidentMutation,
} from 'graphql/generated';
import {
  useRecycledItemQuery,
  useRestoreIncidentMutation,
  useDeleteIncidentMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

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
          id: 'aJnSOt',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The incident has been restored! ',
          id: '/PBSKb',
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
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The incident has been deleted.',
          id: 'kOsXhQ',
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
