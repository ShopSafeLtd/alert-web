import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/__generated__/delete-incident.generated';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/__generated__/delete-offender.generated';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/__generated__/restore-incident.generated';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/__generated__/restore-offender.generated';
import type { RecycledItemsQuery } from 'graphql/recycled/queries/__generated__/recycled-items.generated';

import {
  RecycledItemsDocument,
  useRecycledItemsQuery,
} from 'graphql/recycled/queries/__generated__/recycled-items.generated';
import { SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  currentId: string | undefined;
  data: RecycledItemsQuery | undefined;
  loading: boolean;
  recycledId: string | undefined;
  restoreIncident: boolean;
  restoreOffender: boolean;
  saving: boolean;

  setCurrentId: (value: string | undefined) => void;
  setRecycledId: (value: string | undefined) => void;
  toggleRestore: (value: string | undefined) => void;
  toggleRestoreIncident: () => void;

  toggleRestoreOffender: () => void;
  updateDeleteIncident: MutationUpdaterFn<DeleteIncidentMutation>;
  updateDeleteOffender: MutationUpdaterFn<DeleteOffenderMutation>;
  updateRestoreIncident: MutationUpdaterFn<RestoreIncidentMutation>;
  updateRestoreOffender: MutationUpdaterFn<RestoreOffenderMutation>;
}

const useRecycleBin = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [currentId, setCurrentId] = useState<string | undefined>('');
  const [recycledId, setRecycledId] = useState<string | undefined>('');

  const [saving, setSaving] = useState(false);
  const [restoreOffender, setRestoreOffender] = useState(false);
  const [restoreIncident, setRestoreIncident] = useState(false);
  const variables = {
    order: {
      deletedAt: SortOrder.Desc,
    },
    schemeId,
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
      data: {
        __typename: 'Query',
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.incident?.id !== res.restoreIncident?.id
        ),
      },
      query: RecycledItemsDocument,
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
      data: {
        __typename: 'Query',
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.incident?.id !== res.deleteIncident?.id
        ),
      },
      query: RecycledItemsDocument,
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
      data: {
        __typename: 'Query',
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.offender?.id !== res.restoreOffender?.id
        ),
      },
      query: RecycledItemsDocument,
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
      data: {
        __typename: 'Query',
        recycledItems: existingData?.recycledItems?.filter(
          (item) => item?.offender?.id !== res.deleteOffender?.id
        ),
      },
      query: RecycledItemsDocument,
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
    currentId,
    data,
    loading,
    recycledId,
    restoreIncident,
    restoreOffender,
    saving,
    setCurrentId,
    setRecycledId,
    toggleRestore,
    toggleRestoreIncident,
    toggleRestoreOffender,
    updateDeleteIncident,
    updateDeleteOffender,
    updateRestoreIncident,
    updateRestoreOffender,
  };
};

export default useRecycleBin;
