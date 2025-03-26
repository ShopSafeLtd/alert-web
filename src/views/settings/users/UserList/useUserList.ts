import type { UserListQuery } from '#/views/settings/users/UserList/__generated__/UserList.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { Role, UserStatus } from 'graphql/types';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/__generated__/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/__generated__/invite-exiting-user.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useUserListQuery } from '#/views/settings/users/UserList/__generated__/UserList.generated';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { ListUsersDocument } from 'graphql/users/queries/__generated__/list-users.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { UserSort } from 'types/enums/user_sort';

interface Return {
  addUser: boolean;
  clearFilters: () => void;
  currentPage: number;
  currentPageSize: number;
  data: UserListQuery | undefined;
  editUser: string | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  order: UserSort;
  search: string;
  selectedGroups: string[];
  setOrder: (value: UserSort) => void;
  setSearch: (value: string) => void;
  setSelectedGroups: (value: string[]) => void;
  setUserRole: (value: Role) => void;
  setUserStatus: (value: UserStatus[]) => void;
  sortFilter: boolean;
  toggleAddUser: () => void;
  toggleEditUser: (value?: string | undefined) => void;
  toggleSortFilter: () => void;
  updateExitingUserList: MutationUpdaterFn<InviteExistingUserMutation>;
  updateUserList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  userRole: Role | undefined;
  userStatus: UserStatus[] | undefined;
}

const useUserList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);
  const [addUser, setAddUser] = useState(false);
  const [editUser, toggleEditUser] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [sortFilter, setSortFilter] = useState(false);
  const [order, setOrder] = useState<UserSort>(UserSort.nameAsc);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [userStatus, setUserStatus] = useState<UserStatus[]>();
  const [userRole, setUserRole] = useState<Role>();

  const getOrderBy = {
    [UserSort.createdAtAsc]: {
      createdAt: SortOrder.Asc,
    },
    [UserSort.createdAtDesc]: {
      createdAt: SortOrder.Desc,
    },
    [UserSort.nameAsc]: {
      fullName: SortOrder.Asc,
    },
    [UserSort.nameDesc]: {
      fullName: SortOrder.Desc,
    },
  };

  const variables = {
    groupWhere: {
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
    orderBy: getOrderBy[order],
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      OR: search
        ? [
            {
              fullName: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              email: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              businesses: {
                some: {
                  name: {
                    contains: search,
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
          ]
        : undefined,
      groups:
        selectedGroups.length > 0
          ? {
              some: {
                id: {
                  in: selectedGroups,
                },
              },
            }
          : { some: { users: { some: { id: { equals: userId } } } } },
      recycled: {
        equals: false,
      },
      schemes: {
        some: {
          recycled: {
            equals: false,
          },
          role: userRole
            ? {
                equals: userRole,
              }
            : undefined,
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      status:
        userStatus && userStatus?.length > 0 ? { in: userStatus } : undefined,
    },
  };

  const { data, loading } = useUserListQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

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
    },
  });

  const toggleAddUser = () => {
    setAddUser(!addUser);
  };
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };
  const clearFilters = () => {
    setSelectedGroups([]);
    setUserStatus(undefined);
    setUserRole(undefined);
    setOrder(UserSort.nameAsc);
  };
  const updateUserList: MutationUpdaterFn<CreateUserInDatabaseMutation> = (
    store,
    { data: res }
  ) => {
    if (
      res?.createUserInDatabase === null ||
      res?.createUserInDatabase === undefined
    )
      return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<UserListQuery>({
      query: ListUsersDocument,
      variables,
    });

    if (!existingData?.listUsers) return;

    // write the new data to the Apollo store
    store.writeQuery<UserListQuery>({
      data: {
        __typename: 'Query',
        listUsers: {
          total: existingData.listUsers.total + 1,
          users: [...existingData.listUsers.users, res.createUserInDatabase],
        },
      },
      query: ListUsersDocument,
      variables,
    });
  };
  const updateExitingUserList: MutationUpdaterFn<InviteExistingUserMutation> = (
    store,
    { data: res }
  ) => {
    if (
      res?.inviteExistingUser === null ||
      res?.inviteExistingUser === undefined
    )
      return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<UserListQuery>({
      query: ListUsersDocument,
      variables,
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<UserListQuery>({
      data: {
        __typename: 'Query',
        listUsers: {
          total: existingData.listUsers.total + 1,

          users: [...existingData.listUsers.users, res.inviteExistingUser],
        },
      },
      query: ListUsersDocument,
      variables,
    });
  };

  const onPaginationChange = (pageVale: number, pageSizeValue: number) => {
    setPage(pageVale);
    setPageSize(pageSizeValue);
  };

  return {
    addUser,
    clearFilters,
    currentPage: page,
    currentPageSize: pageSize,
    data,
    editUser,
    groups:
      groupsData?.groups.map((group) => ({
        label: group.name,
        value: group.id,
      })) || [],
    groupsLoading,
    loading,
    onPaginationChange,
    order,
    search,
    selectedGroups,
    setOrder,
    setSearch,
    setSelectedGroups,
    setUserRole,
    setUserStatus,
    sortFilter,
    toggleAddUser,
    toggleEditUser,
    toggleSortFilter,
    updateExitingUserList,
    updateUserList,
    userRole,
    userStatus,
  };
};

export default useUserList;
