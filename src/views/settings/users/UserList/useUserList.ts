import { useState } from 'react';
import {
  useListSchemeUsersQuery,
  ListSchemeUsersQuery,
  QueryMode,
  useSchemeGroupsQuery,
  SchemeGroupsQuery,
  CreateUserInDatabaseMutation,
  ListSchemeUsersDocument,
  InviteExistingUserMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';

interface Return {
  data: ListSchemeUsersQuery | undefined;
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
}

const useUserList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [addUser, setAddUser] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const { data, loading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
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
            organisation: {
              contains: search,
              mode: QueryMode.Insensitive,
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
    },
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
    const existingData = store.readQuery<ListSchemeUsersQuery>({
      query: ListSchemeUsersDocument,
      variables: {
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
              organisation: {
                contains: search,
                mode: QueryMode.Insensitive,
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
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<ListSchemeUsersQuery>({
      query: ListSchemeUsersDocument,
      data: {
        users: [...existingData.users, res.createUserInDatabase],
        __typename: 'Query',
      },
      variables: {
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
              organisation: {
                contains: search,
                mode: QueryMode.Insensitive,
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
      },
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
    const existingData = store.readQuery<ListSchemeUsersQuery>({
      query: ListSchemeUsersDocument,
      variables: {
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
              organisation: {
                contains: search,
                mode: QueryMode.Insensitive,
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
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<ListSchemeUsersQuery>({
      query: ListSchemeUsersDocument,
      data: {
        users: [...existingData.users, res.inviteExistingUser],
        __typename: 'Query',
      },
      variables: {
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
              organisation: {
                contains: search,
                mode: QueryMode.Insensitive,
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
      },
    });
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
  };
};

export default useUserList;
