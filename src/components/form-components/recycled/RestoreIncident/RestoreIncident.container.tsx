import React from 'react';
import {
  RestoreIncidentMutation,
  DeleteIncidentMutation,
} from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
import View from './RestoreIncident.view';
import useRestoreIncident from './useRestoreIncident';

interface Props {
  onClose: () => void;
  incidentId: string | undefined;
  recycledId: string | undefined;
  updateRestore: MutationUpdaterFn<RestoreIncidentMutation>;
  updateDelete: MutationUpdaterFn<DeleteIncidentMutation>;
}

const RestoreIncident = ({
  onClose,
  incidentId,
  recycledId,
  updateRestore,
  updateDelete,
}: Props): JSX.Element => {
  const { onSubmit, onDelete, data, loading, saving } = useRestoreIncident({
    onClose,
    incidentId,
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

export default RestoreIncident;
