import { useState } from 'react';
import { useStoreState } from 'state';

import type { MutationUpdaterFn } from '@apollo/client';
import type { RecycledItemsQuery } from 'graphql/recycled/queries/recycled-items.generated';
import {
  RecycledItemsDocument,
  useRecycledItemsQuery,
} from 'graphql/recycled/queries/recycled-items.generated';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/restore-incident.generated';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/delete-incident.generated';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/restore-offender.generated';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/delete-offender.generated';
import { SortOrder } from 'graphql/types';

interface Return {
  data: RecycledItemsQuery | undefined;
  loading: boolean;
  saving: boolean;
  currentId: string | undefined;
  setCurrentId: (value: string | undefined) => void;
  recycledId: string | undefined;
  setRecycledId: (value: string | undefined) => void;

  restoreIncident: boolean;
  toggleRestoreIncident: () => void;
  updateRestoreIncident: MutationUpdaterFn<RestoreIncidentMutation>;
  updateDeleteIncident: MutationUpdaterFn<DeleteIncidentMutation>;

  restoreOffender: boolean;
  toggleRestoreOffender: () => void;
  toggleRestore: (value: string | undefined) => void;
  updateRestoreOffender: MutationUpdaterFn<RestoreOffenderMutation>;
  updateDeleteOffender: MutationUpdaterFn<DeleteOffenderMutation>;
}

const useRecycleBin = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [currentId, setCurrentId] = useState<string | undefined>('');
  const [recycledId, setRecycledId] = useState<string | undefined>('');

  const [saving, setSaving] = useState(false);
  const [restoreOffender, setRestoreOffender] = useState(false);
  const [restoreIncident, setRestoreIncident] = useState(false);
  const variables = {
    schemeId,
    order: {
      deletedAt: SortOrder.Desc,
    },
  };
  const { data, loading } = useRecycledItemsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // update RestoreIncident
  const updateRestoreIncident: MutationUpdaterFn<RestoreIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      variables: {
        schemeId,
      },
    });

    if (existingData === null) return;

    store.writeQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      data: {
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.incident?.id !== res.restoreIncident?.id
        ),
        __typename: 'Query',
      },
      variables,
    });
  };
  // update DeleteIncident
  const updateDeleteIncident: MutationUpdaterFn<DeleteIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      data: {
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.incident?.id !== res.deleteIncident?.id
        ),
        __typename: 'Query',
      },
      variables,
    });
  };

  // update RestoreOffender
  const updateRestoreOffender: MutationUpdaterFn<RestoreOffenderMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      data: {
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.offender?.id !== res.restoreOffender?.id
        ),
        __typename: 'Query',
      },
      variables,
    });
  };
  // update DeleteOffender
  const updateDeleteOffender: MutationUpdaterFn<DeleteOffenderMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<RecycledItemsQuery>({
      query: RecycledItemsDocument,
      data: {
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.offender?.id !== res.deleteOffender?.id
        ),
        __typename: 'Query',
      },
      variables,
    });
  };
  // function
  const toggleRestoreOffender = () => {
    setSaving(!saving);
    setRestoreOffender(!restoreOffender);
  };
  const toggleRestoreIncident = () => {
    setSaving(!saving);
    setRestoreIncident(!restoreIncident);
  };
  const toggleRestore = (value: string | undefined) => {
    setSaving(!saving);
    if (value === 'Incident') {
      setRestoreIncident(!restoreIncident);
    } else if (value === 'Offender') {
      setRestoreOffender(!restoreOffender);
    }
  };
  return {
    data,
    loading,
    saving,
    currentId,
    setCurrentId,
    recycledId,
    setRecycledId,
    toggleRestore,
    restoreIncident,
    toggleRestoreIncident,
    updateRestoreIncident,
    updateDeleteIncident,
    restoreOffender,
    toggleRestoreOffender,
    updateRestoreOffender,
    updateDeleteOffender,
  };
};

export default useRecycleBin;
