/* eslint-disable react/no-unused-prop-types */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import { useStoreState } from '#/state';
import { Role, SortOrder, useSchemeGroupsQuery } from 'graphql/generated';

interface GroupsContextT {
  children?: ReactNode;
  schemeId: string;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
}

const GroupsContext = createContext<GroupsContextT | undefined>(undefined);

// Create a custom hook to use the context
export const useGroupsContext = () => {
  const context = useContext(GroupsContext);
  if (context === undefined) {
    throw new Error('useGroupsContext must be used within a GroupsProvider');
  }
  return context;
};

export const GroupsProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { id: userId, role } = useStoreState((state) => state.user);

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.SchemeAdmin
            ? undefined
            : {
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
    fetchPolicy: 'cache-and-network',
  });

  const groups = useMemo(
    () =>
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    [groupsData]
  );

  // Value to be provided through context
  const value = useMemo(
    () => ({
      schemeId,
      groups,
      userId,
      groupsLoading,
    }),
    [schemeId, groups, userId, groupsLoading]
  );

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};
