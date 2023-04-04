import React from 'react';
import type {
  RestoreOffenderMutation,
  DeleteOffenderMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './RestoreOffender.view';
import useRestoreOffender from './useRestoreOffender';

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
