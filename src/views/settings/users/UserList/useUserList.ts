import { useState } from 'react';
import type {
  ListUsersQuery,
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';
import {
  SortOrder,
  useListUsersQuery,
  QueryMode,
  useSchemeGroupsQuery,
  ListUsersDocument,
  Role,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { UserStatus } from 'types/enums/user_status';
import { UserSort } from 'types/enums/user_sort';

interface Return {
  data: ListUsersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  selectedGroups: string[];
  setSelectedGroups: (value: string[]) => void;
  addUser: boolean;
  toggleAddUser: () => void;
  updateUserList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateExitingUserList: MutationUpdaterFn<InviteExistingUserMutation>;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  toggleEditUser: (value?: string | undefined) => void;
  editUser: string | undefined;
  userStatus: UserStatus | undefined;
  setUserStatus: (value: UserStatus) => void;
  userRole: Role | undefined;
  setUserRole: (value: Role) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  order: UserSort;
  setOrder: (value: UserSort) => void;
  clearFilters: () => void;
}

const useUserList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, groups } = useStoreState((state) => state.user);
  const [addUser, setAddUser] = useState(false);
  const [editUser, toggleEditUser] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [sortFilter, setSortFilter] = useState(false);
  const [order, setOrder] = useState<UserSort>(UserSort.nameAsc);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [userStatus, setUserStatus] = useState<UserStatus>();
  const [userRole, setUserRole] = useState<Role>();

  const getDisAbled = () => {
    if (userStatus === UserStatus.DISABLED) return { equals: true };
    if (userStatus === UserStatus.ACTIVE) return { equals: false };
    return undefined;
  };
  const getNewUser = () => {
    if (userStatus === UserStatus.INVITED) return { equals: true };
    if (userStatus === UserStatus.ACTIVE) return { equals: false };
    return undefined;
  };
  const getOrderBy = {
    [UserSort.createdAtDesc]: {
      createdAt: SortOrder.Desc,
    },
    [UserSort.createdAtAsc]: {
      createdAt: SortOrder.Asc,
    },
    [UserSort.nameAsc]: {
      fullName: SortOrder.Asc,
    },
    [UserSort.nameDesc]: {
      fullName: SortOrder.Desc,
    },
  };

  const variables = {
    orderBy: getOrderBy[order],
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      schemes: {
        some: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
          recycled: {
            equals: false,
          },
          role: userRole
            ? {
                equals: userRole,
              }
            : undefined,
        },
      },
      recycled: {
        equals: false,
      },
      disabled: getDisAbled(),
      newUser: getNewUser(),
      groups:
        selectedGroups.length > 0
          ? {
              some: {
                id: {
                  in: selectedGroups,
                },
              },
            }
          : undefined,
      OR: [
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
      ],
    },
    groupWhere: {
      scheme: {
        id: {
          equals: schemeId,
        },
      },
    },
  };

  const { data, loading } = useListUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
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
    const existingData = store.readQuery<ListUsersQuery>({
      query: ListUsersDocument,
      variables,
    });

    if (!existingData?.listUsers) return;

    // write the new data to the Apollo store
    store.writeQuery<ListUsersQuery>({
      query: ListUsersDocument,
      data: {
        listUsers: {
          total: [...existingData.listUsers.users, res.createUserInDatabase]
            .length,
          users: [...existingData.listUsers.users, res.createUserInDatabase],
        },
        __typename: 'Query',
      },
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
    const existingData = store.readQuery<ListUsersQuery>({
      query: ListUsersDocument,
      variables,
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<ListUsersQuery>({
      query: ListUsersDocument,
      data: {
        listUsers: {
          total: [...existingData.listUsers.users, res.inviteExistingUser]
            .length,
          users: [...existingData.listUsers.users, res.inviteExistingUser],
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const onPaginationChange = (pageVale: number, pageSizeValue: number) => {
    setPage(pageVale);
    setPageSize(pageSizeValue);
  };

  return {
    data,
    loading,
    search,
    setSearch,
    groups:
      role === Role.SchemeAdmin
        ? groupsData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    selectedGroups,
    setSelectedGroups,
    addUser,
    toggleAddUser,
    updateUserList,
    updateExitingUserList,
    onPaginationChange,
    currentPage: page,
    currentPageSize: pageSize,
    editUser,
    toggleEditUser,
    userStatus,
    setUserStatus,
    userRole,
    setUserRole,
    order,
    setOrder,
    sortFilter,
    toggleSortFilter,
    clearFilters,
  };
};

export default useUserList;
