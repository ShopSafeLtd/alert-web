import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './RestoreOffender.view';
import useRestoreOffender from './useRestoreOffender';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/restore-offender.generated';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/delete-offender.generated';

interface Props {
  onClose: () => void;
  offenderId: string | undefined;
  recycledId: string | undefined;
  updateRestore: MutationUpdaterFn<RestoreOffenderMutation>;
  updateDelete: MutationUpdaterFn<DeleteOffenderMutation>;
}

const RestoreOffender = ({
  onClose,
  offenderId,
  recycledId,
  updateRestore,
  updateDelete,
}: Props): JSX.Element => {
  const { onSubmit, onDelete, data, loading, saving } = useRestoreOffender({
    onClose,
    offenderId,
    recycledId,
    updateRestore,
    updateDelete,
  });
  return (
    <View
      onSubmit={onSubmit}
      onDelete={onDelete}
      data={data}
      loading={loading}
      saving={saving}
    />
  );
};

export default RestoreOffender;
