import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/__generated__/delete-offender.generated';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/__generated__/restore-offender.generated';
import type { RecycledItemQuery } from 'graphql/recycled/queries/__generated__/recycled-item.generated';

import { notification } from 'antd';
import { useDeleteOffenderMutation } from 'graphql/recycled/mutations/__generated__/delete-offender.generated';
import { useRestoreOffenderMutation } from 'graphql/recycled/mutations/__generated__/restore-offender.generated';
import { useRecycledItemQuery } from 'graphql/recycled/queries/__generated__/recycled-item.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  offenderId: string | undefined;
  onClose: () => void;
  recycledId: string | undefined;
  updateDelete: MutationUpdaterFn<DeleteOffenderMutation>;
  updateRestore: MutationUpdaterFn<RestoreOffenderMutation>;
}
interface Return {
  data: RecycledItemQuery | undefined;
  loading: boolean;
  onDelete: () => void;
  onSubmit: () => void;
  saving: boolean;
}

const useRestoreOffender = ({
  offenderId,
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
        description: intl.formatMessage({
          defaultMessage: 'The offender has been restored! ',
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
        description: intl.formatMessage({
          defaultMessage: 'The offender has been deleted.',
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
    if (offenderId)
      void deleteOffender({
        variables: { where: { id: offenderId } },
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

export default useRestoreOffender;
