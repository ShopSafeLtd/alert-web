import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/__generated__/delete-incident.generated';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/__generated__/restore-incident.generated';

import React from 'react';

import View from './RestoreIncident.view';
import useRestoreIncident from './useRestoreIncident';

interface Props {
  incidentId: string | undefined;
  onClose: () => void;
  recycledId: string | undefined;
  updateDelete: MutationUpdaterFn<DeleteIncidentMutation>;
  updateRestore: MutationUpdaterFn<RestoreIncidentMutation>;
}

const RestoreIncident = ({
  incidentId,
  onClose,
  recycledId,
  updateDelete,
  updateRestore,
}: Props): JSX.Element => {
  const { data, loading, onDelete, onSubmit, saving } = useRestoreIncident({
    incidentId,
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

export default RestoreIncident;
