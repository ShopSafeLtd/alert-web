import { useState } from 'react';
import type {
  ListUsersQuery,
  SchemeGroupsQuery,
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
} from 'graphql/generated';
import {
  SortOrder,
  useListUsersQuery,
  QueryMode,
  useSchemeGroupsQuery,
  ListUsersDocument,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';

interface Return {
  data: ListUsersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groupsData: SchemeGroupsQuery | undefined;
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
}

const useUserList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [addUser, setAddUser] = useState(false);
  const [editUser, toggleEditUser] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const variables = {
    orderBy: { fullName: SortOrder.Asc },
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
        },
      },
      recycled: {
        equals: false,
      },
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
    groupsData,
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
  };
};

export default useUserList;
