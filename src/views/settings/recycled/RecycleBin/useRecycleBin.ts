import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/__generated__/delete-incident.generated';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/__generated__/delete-offender.generated';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/__generated__/restore-incident.generated';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/__generated__/restore-offender.generated';
import type {
  RecycledItemsQuery,
  RecycledItemsQueryVariables,
} from 'graphql/recycled/queries/__generated__/recycled-items.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  RecycledItemsDocument,
  useRecycledItemsQuery,
} from 'graphql/recycled/queries/__generated__/recycled-items.generated';
import { useRecycledItemsCountQuery } from 'graphql/recycled/queries/__generated__/recycled-items-count.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Return {
  currentId: string | undefined;
  data: RecycledItemsQuery | undefined;
  loading: boolean;
  pagination: { page: number; pageSize: number };
  recycledId: string | undefined;
  restoreIncident: boolean;
  restoreOffender: boolean;

  saving: boolean;
  setCurrentId: (value: string | undefined) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setRecycledId: (value: string | undefined) => void;
  toggleRestore: (value: string | undefined) => void;
  toggleRestoreIncident: () => void;
  toggleRestoreOffender: () => void;
  totalCount: number;
  updateDeleteIncident: MutationUpdaterFn<DeleteIncidentMutation>;
  updateDeleteOffender: MutationUpdaterFn<DeleteOffenderMutation>;
  updateRestoreIncident: MutationUpdaterFn<RestoreIncidentMutation>;
  updateRestoreOffender: MutationUpdaterFn<RestoreOffenderMutation>;
}

const useRecycleBin = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [currentId, setCurrentId] = useState<string | undefined>('');
  const [recycledId, setRecycledId] = useState<string | undefined>('');

  const [saving, setSaving] = useState(false);
  const [restoreOffender, setRestoreOffender] = useState(false);
  const [restoreIncident, setRestoreIncident] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 24 });
  const variables: RecycledItemsQueryVariables = {
    first: pagination.pageSize,
    order: {
      deletedAt: SortOrder.Desc,
    },
    schemeId,
    skip: (pagination.page - 1) * pagination.pageSize,
  };
  const { data, loading } = useRecycledItemsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { data: countData, loading: countLoading } = useRecycledItemsCountQuery(
    {
      fetchPolicy: 'cache-and-network',
      variables,
    }
  );

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

  const totalCount = countData?.recycledItemsCount || 0;
  return {
    currentId,
    data,
    loading: loading || countLoading,
    pagination,
    recycledId,
    restoreIncident,
    restoreOffender,
    saving,
    setCurrentId,
    setPagination,
    setRecycledId,
    toggleRestore,
    toggleRestoreIncident,
    toggleRestoreOffender,
    totalCount,
    updateDeleteIncident,
    updateDeleteOffender,
    updateRestoreIncident,
    updateRestoreOffender,
  };
};

export default useRecycleBin;
