/* eslint-disable react/no-unused-prop-types */
import type { ReactNode } from 'react';

import { useStoreState } from '#/state';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { SortOrder } from 'graphql/types';
import React, { createContext, useContext, useMemo } from 'react';

interface GroupsContextT {
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  schemeId: string;
}

const GroupsContext = createContext<GroupsContextT | undefined>(undefined);

export const useGroupsContext = () => {
  const context = useContext(GroupsContext);
  if (context === undefined) {
    throw new Error('useGroupsContext must be used within a GroupsProvider');
  }
  return context;
};

const GroupsProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-first',
    skip: !schemeId || !userId,
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
    },
  });

  const groups = useMemo(
    () =>
      groupsData?.groups.map((group) => ({
        label: group.name,
        value: group.id,
      })) || [],
    [groupsData]
  );

  const value = useMemo(
    () => ({
      groups,
      groupsLoading,
      schemeId,
    }),
    [schemeId, groups, groupsLoading]
  );

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};

export default React.memo(GroupsProvider);
