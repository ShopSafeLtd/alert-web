import type { UpsertDemGroupMutation } from '#/components/form-components/DemGroup/AddDemGroup/graphql/mutations/__generated__/upsert-dem-group.generated';
import type { DemGroupData } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

import { QueryMode } from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';

import type { DemGroupsQuery } from '../graphql/queries/__generated__/dem-groups.generated';

import {
  DemGroupsDocument,
  useDemGroupsQuery,
} from '../graphql/queries/__generated__/dem-groups.generated';

interface Return {
  addDemGroup: boolean;
  data: DemGroupsQuery | undefined;
  editData: DemGroupData | undefined;
  loading: boolean;
  pagination: { page: number; pageSize: number };
  resetPage: () => void;
  search: string;
  setEditData: (value: DemGroupData | undefined) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setSearch: (value: string) => void;
  toggleAddDemGroup: () => void;
  updateDemGroupList: MutationUpdaterFn<UpsertDemGroupMutation>;
}

const useDemGroupList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addDemGroup, setAddDemGroup] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 24 });
  const [editData, setEditData] = useState<DemGroupData | undefined>(undefined);
  const [search, setSearch] = useState('');

  const variables = {
    skip: (pagination.page - 1) * pagination.pageSize,
    take: pagination.pageSize,
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
      scheme: { id: { equals: schemeId } },
    },
  };
  const { data, loading } = useDemGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const toggleAddDemGroup = () => {
    setAddDemGroup(!addDemGroup);
  };

  const updateDemGroupList: MutationUpdaterFn<UpsertDemGroupMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing demDemGroup list data from Apollo store
    const existingData = store.readQuery<DemGroupsQuery>({
      query: DemGroupsDocument,
      variables,
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<DemGroupsQuery>({
      data: {
        __typename: 'Query',
        demGroups: {
          ...existingData.demGroups,
          edges: [
            ...existingData.demGroups.edges,
            { node: res.upsertDemGroup },
          ],
        },
      },
      query: DemGroupsDocument,
      variables,
    });
  };
  const resetPage = () => {
    if (pagination.page !== 1)
      setPagination({ page: 1, pageSize: pagination.pageSize });
  };
  return {
    addDemGroup,
    data,
    editData,
    loading,
    pagination,
    resetPage,
    search,
    setEditData,
    setPagination,
    setSearch,
    toggleAddDemGroup,
    updateDemGroupList,
  };
};

export default useDemGroupList;
