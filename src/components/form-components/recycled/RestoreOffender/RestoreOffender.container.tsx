import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/__generated__/delete-offender.generated';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/__generated__/restore-offender.generated';

import React from 'react';

import View from './RestoreOffender.view';
import useRestoreOffender from './useRestoreOffender';

interface Props {
  offenderId: string | undefined;
  onClose: () => void;
  recycledId: string | undefined;
  updateDelete: MutationUpdaterFn<DeleteOffenderMutation>;
  updateRestore: MutationUpdaterFn<RestoreOffenderMutation>;
}

const RestoreOffender = ({
  offenderId,
  onClose,
  recycledId,
  updateDelete,
  updateRestore,
}: Props): JSX.Element => {
  const { data, loading, onDelete, onSubmit, saving } = useRestoreOffender({
    offenderId,
    onClose,
    recycledId,
    updateDelete,
    updateRestore,
  });
  return (
    <View
      data={data}
      loading={loading}
      onDelete={onDelete}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default RestoreOffender;
