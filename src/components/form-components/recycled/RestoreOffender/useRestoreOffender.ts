import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/restore-offender.generated';
import { useRestoreOffenderMutation } from 'graphql/recycled/mutations/restore-offender.generated';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/delete-offender.generated';
import { useDeleteOffenderMutation } from 'graphql/recycled/mutations/delete-offender.generated';
import type { RecycledItemQuery } from 'graphql/recycled/queries/recycled-item.generated';
import { useRecycledItemQuery } from 'graphql/recycled/queries/recycled-item.generated';

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
  const intl = useIntl();
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Restored!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been restored! ',
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been deleted.',
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
