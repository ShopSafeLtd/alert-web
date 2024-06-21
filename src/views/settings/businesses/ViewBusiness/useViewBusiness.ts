import { useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import update from 'immutability-helper';
import type { LocationData } from 'types/DataType';
import type {
  ListBusinessUsersQuery,
  ListBusinessUsersQueryVariables,
} from 'graphql/users/queries/list-business-users.generated';
import { ListBusinessUsersDocument } from 'graphql/users/queries/list-business-users.generated';
import { useListBusinessUsersQuery } from 'graphql/users/queries/list-business-users.generated';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/create-user-in-databse.generated';
import type {
  BusinessQuery,
  BusinessQueryVariables,
} from 'graphql/businesses/queries/business.generated';
import {
  BusinessDocument,
  useBusinessQuery,
} from 'graphql/businesses/queries/business.generated';

import type { InviteExistingUserMutation } from 'graphql/users/mutations/invite-exiting-user.generated';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/add-users-to-business.generated';
import type { ListActionsQuery } from 'graphql/actions/queries/list-actions.generated';
import { useListActionsQuery } from 'graphql/actions/queries/list-actions.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/update-todo.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import { SortOrder } from 'graphql/types';
import type {
  BusinessesSideListQuery,
  BusinessesSideListQueryVariables,
} from '#/components/businesses/BusinessSideList/graphql/queries/sidelist.generated';
import { BusinessesSideListDocument } from '#/components/businesses/BusinessSideList/graphql/queries/sidelist.generated';
import { useUpdateBusinessLocationMutation } from 'graphql/businesses/mutations/update-business-location.generated';
import { useDeleteBusinessMutation } from 'graphql/businesses/mutations/delete-business.generated';
import { useRemoveUserFromBusinessMutation } from 'graphql/businesses/mutations/remove-user-from-business.generated';

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
  saving: boolean;
  deleteConfirm: (value: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  viewTodoVisible: string | null;
  setViewTodoVisible: (value: string | null) => void;
  completeTodoVisible: string | null;
  setCompleteTodoVisible: (value: string | null) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  onEditAddress: (value: LocationData) => void;
}

const useViewBusiness = (): Return => {
  const params = useParams();
  const intl = useIntl();
  const navigate = useNavigate();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [editVisible, setEditVisible] = useState(false);
  const [inviteUserVisible, setInviteUserVisible] = useState(false);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [linkDemVisible, setLinkDemVisible] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [viewTodoVisible, setViewTodoVisible] = useState<string | null>(null);
  const [completeTodoVisible, setCompleteTodoVisible] = useState<string | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const variables: BusinessQueryVariables = {
    where: {
      id: params.id,
    },
    incidentsWhere: {
      scheme: {
        id: {
          equals: currentScheme,
        },
      },
    },
  };
  const { data } = useBusinessQuery({
    fetchPolicy: 'cache-and-network',
    variables,
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
        schemes: {
          some: {
            scheme: {
              id: {
                equals: currentScheme,
              },
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
  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        where: {
          id: currentScheme,
        },
        questionGroupsWhere: {
          defaultForIncidents: {
            equals: true,
          },
        },
      },
    });

  // update Business
  const [updateBusinessLocation] = useUpdateBusinessLocationMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Location of the shop has been updated',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;

      const existingData = store.readQuery<
        BusinessesSideListQuery,
        BusinessesSideListQueryVariables
      >({
        query: BusinessesSideListDocument,
        variables: {
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
          orderBy: { name: SortOrder.Asc },
          first: 24,
        },
      });

      if (existingData === null) return;
      if (existingData.businessRelay.edges === undefined) return;

      const index = existingData?.businessRelay?.edges?.findIndex(
        ({ node: business }) => business.id === res.updateBusiness.id
      );
      if (index === -1) return;

      store.writeQuery<
        BusinessesSideListQuery,
        BusinessesSideListQueryVariables
      >({
        query: BusinessesSideListDocument,
        data: {
          businessRelay: {
            ...existingData.businessRelay,
            edges: existingData?.businessRelay?.edges?.map(
              ({ node: business }) => {
                if (business.id === res.updateBusiness.id) {
                  return {
                    node: {
                      ...business,
                      locations: res.updateBusiness.locations,
                    },
                  };
                }
                return { node: { ...business } };
              }
            ),
          },
          __typename: 'Query',
        },
        variables: {
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
          orderBy: { name: SortOrder.Asc },
          first: 24,
        },
      });
    },
  });
  const onEditAddress = (values: LocationData) => {
    setSaving(true);
    void updateBusinessLocation({
      variables: {
        where: {
          id: data?.business?.id,
        },
        data: {
          name: { set: data?.business?.name || '' },
          publicName: data?.business?.publicName || false,
          locations: {
            update: [
              {
                where: {
                  id: data?.business?.locations[0]?.id,
                },
                data: {
                  geoLat: { set: values.geoLat },
                  geoLng: { set: values.geoLng },
                },
              },
            ],
          },
        },
      },
      // optimisticResponse: {
      //   updateBusiness: {
      //     id: `${Math.random()}`,
      //     name: data?.business?.name,
      //     fullName: values.name,
      //     publicName: values.publicName,
      //     totalUsers: 0,
      //     parent: values.parent
      //       ? {
      //           id: values.parent.value,
      //           name: values.parent.label,
      //           fullName: values.parent.label,
      //           publicName: values.publicName,
      //         }
      //       : undefined,
      //     locations: [
      //       {
      //         id: `${Math.random()}`,
      //         full: `${values.building}, ${values.street}, ${values.townCity}, ${values.county}, ${values.postcode}`,
      //       },
      //     ],
      //   },
      // },
    });
  };
  const [removeUserFromBusiness] = useRemoveUserFromBusinessMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Business has been created',
        }),
        description: intl.formatMessage({
          defaultMessage: 'You new business has been add to alert.',
        }),
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

  // delete business
  const [deleteBusiness] = useDeleteBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      navigate('businesses');
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The business has been removed!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const deleteConfirm = (currentId: string) => {
    Modal.confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete this business?',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        setSaving(true);
        void deleteBusiness({
          variables: {
            id: currentId,
          },
        }).finally(() => setSaving(false));
      },
    });
  };

  // todo
  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;
    const existingData = store.readQuery<BusinessQuery>({
      query: BusinessDocument,
      variables,
    });

    if (!existingData?.business) return;
    store.writeQuery<BusinessQuery>({
      query: BusinessDocument,
      data: {
        business: {
          ...existingData.business,
          todos: [...existingData.business.todos, res.createTodo],
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const updateTodo: MutationUpdaterFn<UpdateTaskMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.updateTodo === null || res.updateTodo === undefined) return;
    // get existing group list data from Apollo store
    const existingData = store.readQuery<BusinessQuery, BusinessQueryVariables>(
      {
        query: BusinessDocument,
        variables,
      }
    );

    if (existingData === null) return;
    if (existingData?.business?.todos === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<BusinessQuery, BusinessQueryVariables>({
      query: BusinessDocument,
      data: {
        business: update<BusinessQuery['business']>(existingData.business, {
          todos: {
            [existingData.business.todos.findIndex(
              ({ id }) => id === res.updateTodo?.id
            )]: {
              $set: res.updateTodo,
            },
          },
        }),
        __typename: 'Query',
      },
      variables,
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
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
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
    saving,
    deleteConfirm,
    addTodo,
    toggleAddTodo,
    templatesData,
    templatesLoading,
    setViewTodoVisible,
    setCompleteTodoVisible,
    completeTodoVisible,
    viewTodoVisible,
    updateTodo,
    updateTodoList,
    onEditAddress,
  };
};

export default useViewBusiness;
