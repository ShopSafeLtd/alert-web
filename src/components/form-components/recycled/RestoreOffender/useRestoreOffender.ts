import { useState } from 'react';
import type {
  RecycledItemQuery,
  RestoreOffenderMutation,
  DeleteOffenderMutation,
} from 'graphql/generated';
import {
  useRecycledItemQuery,
  useRestoreOffenderMutation,
  useDeleteOffenderMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';

interface Props {
  onClose: () => void;
  offenderId: string | undefined;
  recycledId: string | undefined;
  updateRestore: MutationUpdaterFn<RestoreOffenderMutation>;
  updateDelete: MutationUpdaterFn<DeleteOffenderMutation>;
}
interface Return {
  onSubmit: () => void;
  onDelete: () => void;
  data: RecycledItemQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useRestoreOffender = ({
  onClose,
  offenderId,
  recycledId,
  updateRestore,
  updateDelete,
}: Props): Return => {
  const [saving, setSaving] = useState(false);

  const { data, loading } = useRecycledItemQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        // id: recycledId,
        offenderId,
      },
    },
  });

  const [restoreOffender] = useRestoreOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Restored!',
        description: 'The offender has been restored! ',
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
    if (offenderId && recycledId)
      void restoreOffender({
        variables: {
          id: offenderId,
          recycledId,
        },
      });
  };

  const [deleteOffender] = useDeleteOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The offender has been Deleted! ',
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
    if (offenderId)
      void deleteOffender({
        variables: { where: { id: offenderId } },
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

export default useRestoreOffender;
