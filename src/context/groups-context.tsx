/* eslint-disable react/no-unused-prop-types */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import { useStoreState } from '#/state';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/scheme-groups.generated';
import { SortOrder } from 'graphql/types';

interface GroupsContextT {
  schemeId: string;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
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
    variables: {
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
      orderBy: {
        name: SortOrder.Asc,
      },
    },
    fetchPolicy: 'cache-first',
    skip: !schemeId || !userId,
  });

  const groups = useMemo(
    () =>
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    [groupsData]
  );

  const value = useMemo(
    () => ({
      schemeId,
      groups,
      groupsLoading,
    }),
    [schemeId, groups, groupsLoading]
  );

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};

export default React.memo(GroupsProvider);
