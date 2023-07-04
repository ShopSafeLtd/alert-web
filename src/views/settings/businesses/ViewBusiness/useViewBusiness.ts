import { useState } from 'react';
import type {
  AddUsersToBusinessMutation,
  BusinessQuery,
  CreateUserInDatabaseMutation,
  InviteExistingUserMutation,
  ListActionsQuery,
  ListBusinessUsersQuery,
  ListBusinessUsersQueryVariables,
} from 'graphql/generated';
import {
  ListBusinessUsersDocument,
  SortOrder,
  useBusinessQuery,
  useListActionsQuery,
  useListBusinessUsersQuery,
  useRemoveUserFromBusinessMutation,
} from 'graphql/generated';
import { useParams } from 'react-router';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';

interface Return {
  data: BusinessQuery | undefined;
  loading: boolean;
  businessId: string | undefined;
  editVisible: boolean;
  toggleEdit: () => void;
  inviteUserVisible: boolean;
  toggleInviteUser: () => void;
  addUserVisible: boolean;
  toggleAddUser: () => void;
  usersData: ListBusinessUsersQuery | undefined;
  usersLoading: boolean;
  updateUsersList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateUsersListExisting: MutationUpdaterFn<InviteExistingUserMutation>;
  updateAddUsersToBusiness: MutationUpdaterFn<AddUsersToBusinessMutation>;
  actionsData: ListActionsQuery | undefined;
  actionsLoading: boolean;
  onRemoveBusiness: (value: string) => void;
  toggleLinkDem: () => void;
  linkDemVisible: boolean;
}

const useViewBusiness = (): Return => {
  const params = useParams();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [editVisible, setEditVisible] = useState(false);
  const [inviteUserVisible, setInviteUserVisible] = useState(false);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [linkDemVisible, setLinkDemVisible] = useState(false);
  const { data } = useBusinessQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: params.id,
      },
    },
  });

  const { data: usersData } = useListBusinessUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupWhere: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
      where: {
        businesses: {
          some: {
            id: {
              equals: params.id,
            },
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Asc,
      },
    },
  });

  const { data: actionsData } = useListActionsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        business: {
          id: {
            equals: params.id,
          },
        },
        inScheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const [removeUserFromBusiness] = useRemoveUserFromBusinessMutation({
    onCompleted: () => {
      notification.success({
        message: 'Business has been created',
        description: 'You new business has been add to alert.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: (store, result) => {
      const existingData = store.readQuery<
        ListBusinessUsersQuery,
        ListBusinessUsersQueryVariables
      >({
        query: ListBusinessUsersDocument,
        variables: {
          groupWhere: {
            scheme: {
              id: {
                equals: currentScheme,
              },
            },
          },
          where: {
            businesses: {
              some: {
                id: {
                  equals: params.id,
                },
              },
            },
          },
        },
      });

      if (existingData && result.data)
        store.writeQuery<
          ListBusinessUsersQuery,
          ListBusinessUsersQueryVariables
        >({
          query: ListBusinessUsersDocument,
          variables: {
            groupWhere: {
              scheme: {
                id: {
                  equals: currentScheme,
                },
              },
            },
            where: {
              businesses: {
                some: {
                  id: {
                    equals: params.id,
                  },
                },
              },
            },
          },
          data: {
            users: result.data?.removeUserFromBusiness.users,
          },
        });
    },
  });

  const onRemoveBusiness = (userId: string) => {
    void removeUserFromBusiness({
      variables: {
        data: {
          id: userId,
        },
        schemeWhere: {
          id: currentScheme,
        },
        where: {
          id: params.id,
        },
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
    });
  };

  const toggleEdit = () => {
    setEditVisible(!editVisible);
  };

  const toggleLinkDem = () => {
    setLinkDemVisible(!linkDemVisible);
  };
  const toggleInviteUser = () => {
    setInviteUserVisible(!inviteUserVisible);
  };

  const toggleAddUser = () => {
    setAddUserVisible(!addUserVisible);
  };

  const updateUsersList: MutationUpdaterFn<CreateUserInDatabaseMutation> = (
    store,
    { data: res }
  ) => {
    if (
      res?.createUserInDatabase === null ||
      res?.createUserInDatabase === undefined
    )
      return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<
      ListBusinessUsersQuery,
      ListBusinessUsersQueryVariables
    >({
      query: ListBusinessUsersDocument,
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        where: {
          businesses: {
            some: {
              id: {
                equals: params.id,
              },
            },
          },
        },
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<ListBusinessUsersQuery, ListBusinessUsersQueryVariables>({
      query: ListBusinessUsersDocument,
      data: {
        users: [...existingData.users, res.createUserInDatabase],
        __typename: 'Query',
      },
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        where: {
          businesses: {
            some: {
              id: {
                equals: params.id,
              },
            },
          },
        },
      },
    });
  };

  const updateUsersListExisting: MutationUpdaterFn<
    InviteExistingUserMutation
  > = (store, { data: res }) => {
    if (
      res?.inviteExistingUser === null ||
      res?.inviteExistingUser === undefined
    )
      return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<
      ListBusinessUsersQuery,
      ListBusinessUsersQueryVariables
    >({
      query: ListBusinessUsersDocument,
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        where: {
          businesses: {
            some: {
              id: {
                equals: params.id,
              },
            },
          },
        },
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<ListBusinessUsersQuery, ListBusinessUsersQueryVariables>({
      query: ListBusinessUsersDocument,
      data: {
        users: [...existingData.users, res.inviteExistingUser],
        __typename: 'Query',
      },
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        where: {
          businesses: {
            some: {
              id: {
                equals: params.id,
              },
            },
          },
        },
      },
    });
  };

  const updateAddUsersToBusiness: MutationUpdaterFn<
    AddUsersToBusinessMutation
  > = (store, { data: res }) => {
    if (
      res?.addUsersToBusiness === null ||
      res?.addUsersToBusiness === undefined
    )
      return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<
      ListBusinessUsersQuery,
      ListBusinessUsersQueryVariables
    >({
      query: ListBusinessUsersDocument,
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        where: {
          businesses: {
            some: {
              id: {
                equals: params.id,
              },
            },
          },
        },
        orderBy: {
          fullName: SortOrder.Asc,
        },
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<ListBusinessUsersQuery, ListBusinessUsersQueryVariables>({
      query: ListBusinessUsersDocument,
      data: {
        users: [...existingData.users, ...res.addUsersToBusiness.users],
        __typename: 'Query',
      },
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        where: {
          businesses: {
            some: {
              id: {
                equals: params.id,
              },
            },
          },
        },
        orderBy: {
          fullName: SortOrder.Asc,
        },
      },
    });
  };

  return {
    data,
    loading: !data,
    businessId: params.id,
    editVisible,
    toggleEdit,
    inviteUserVisible,
    toggleInviteUser,
    usersData,
    usersLoading: !usersData,
    updateUsersList,
    updateUsersListExisting,
    addUserVisible,
    toggleAddUser,
    updateAddUsersToBusiness,
    actionsData,
    actionsLoading: !actionsData,
    onRemoveBusiness,
    toggleLinkDem,
    linkDemVisible,
  };
};

export default useViewBusiness;
