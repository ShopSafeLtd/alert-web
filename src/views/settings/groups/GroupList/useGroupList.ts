import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';

import {
  SchemeGroupsDocument,
  useSchemeGroupsQuery,
} from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { QueryMode } from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  addGroup: boolean;
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
}

const useGroupList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addGroup, setAddGroup] = useState(false);
  const [search, setSearch] = useState('');

  const { data, loading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            description: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
        scheme: { id: { equals: schemeId } },
      },
    },
  });

  const toggleAddGroup = () => {
    setAddGroup(!addGroup);
  };

  const updateGroupList: MutationUpdaterFn<CreateGroupMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<SchemeGroupsQuery>({
      query: SchemeGroupsDocument,
      variables: {
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              description: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
          ],
          scheme: { id: { equals: schemeId } },
        },
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<SchemeGroupsQuery>({
      data: {
        __typename: 'Query',
        groups: [...existingData.groups, res.createGroup],
      },
      query: SchemeGroupsDocument,
      variables: {
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              description: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
          ],
          scheme: { id: { equals: schemeId } },
        },
      },
    });
  };

  return {
    addGroup,
    data,
    loading,
    search,
    setSearch,
    toggleAddGroup,
    updateGroupList,
  };
};

export default useGroupList;
