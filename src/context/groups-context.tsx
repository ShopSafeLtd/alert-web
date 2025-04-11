/* eslint-disable react/no-unused-prop-types */
import type { ReactNode } from 'react';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { createContext, useContext, useMemo } from 'react';

interface GroupsContextT {
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  refetch: () => void;
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
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);

  const {
    data: groupsData,
    loading: groupsLoading,
    refetch,
  } = useSchemeGroupsQuery({
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

  const refetchGroups = () => {
    void refetch();
  };
  const value = useMemo(
    () => ({
      groups,
      groupsLoading,
      refetch: refetchGroups,
      schemeId,
    }),
    [schemeId, groups, groupsLoading, refetch]
  );

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};

export default React.memo(GroupsProvider);
