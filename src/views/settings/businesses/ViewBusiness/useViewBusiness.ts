import type {
  BusinessesSideListQuery,
  BusinessesSideListQueryVariables,
} from '#/components/businesses/BusinessSideList/graphql/queries/__generated__/sidelist.generated';
import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ListActionsQuery } from 'graphql/actions/queries/__generated__/list-actions.generated';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/__generated__/add-users-to-business.generated';
import type {
  BusinessQuery,
  BusinessQueryVariables,
} from 'graphql/businesses/queries/__generated__/business.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type { CreateUserInDatabaseMutation } from 'graphql/users/mutations/__generated__/create-user-in-databse.generated';
import type { InviteExistingUserMutation } from 'graphql/users/mutations/__generated__/invite-exiting-user.generated';
import type {
  ListBusinessUsersQuery,
  ListBusinessUsersQueryVariables,
} from 'graphql/users/queries/__generated__/list-business-users.generated';
import type { LocationData } from 'types/DataType';

import { BusinessesSideListDocument } from '#/components/businesses/BusinessSideList/graphql/queries/__generated__/sidelist.generated';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { Modal, notification } from 'antd';
import { useListActionsQuery } from 'graphql/actions/queries/__generated__/list-actions.generated';
import { useDeleteBusinessMutation } from 'graphql/businesses/mutations/__generated__/delete-business.generated';
import { useRemoveUserFromBusinessMutation } from 'graphql/businesses/mutations/__generated__/remove-user-from-business.generated';
import { useUpdateBusinessLocationMutation } from 'graphql/businesses/mutations/__generated__/update-business-location.generated';
import {
  BusinessDocument,
  useBusinessQuery,
} from 'graphql/businesses/queries/__generated__/business.generated';
import { SortOrder } from 'graphql/types';
import {
  ListBusinessUsersDocument,
  useListBusinessUsersQuery,
} from 'graphql/users/queries/__generated__/list-business-users.generated';
import update from 'immutability-helper';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Return {
  actionsData: ListActionsQuery | undefined;
  actionsLoading: boolean;
  addTodo: boolean;
  addUserVisible: boolean;
  businessId: string | undefined;
  completeTodoVisible: null | string;
  data: BusinessQuery | undefined;
  deleteConfirm: (value: string) => void;
  editVisible: boolean;
  inviteUserVisible: boolean;
  linkDemVisible: boolean;
  loading: boolean;
  onEditAddress: (value: LocationData) => void;
  onRemoveBusiness: (value: string) => void;
  saving: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setViewTodoVisible: (value: null | string) => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  toggleAddTodo: () => void;
  toggleAddUser: () => void;
  toggleEdit: () => void;
  toggleInviteUser: () => void;
  toggleLinkDem: () => void;
  updateAddUsersToBusiness: MutationUpdaterFn<AddUsersToBusinessMutation>;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  updateUsersList: MutationUpdaterFn<CreateUserInDatabaseMutation>;
  updateUsersListExisting: MutationUpdaterFn<InviteExistingUserMutation>;
  usersData: ListBusinessUsersQuery | undefined;
  usersLoading: boolean;
  viewTodoVisible: null | string;
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
  const [viewTodoVisible, setViewTodoVisible] = useState<null | string>(null);
  const [completeTodoVisible, setCompleteTodoVisible] = useState<null | string>(
    null
  );
  const [saving, setSaving] = useState(false);
  const variables: BusinessQueryVariables = {
    incidentsWhere: {
      scheme: {
        id: {
          equals: currentScheme,
        },
      },
    },
    where: {
      id: params.id,
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
      orderBy: {
        fullName: SortOrder.Asc,
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
    },
  });

  const { data: actionsData } = useListActionsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: {
        createdAt: SortOrder.Desc,
      },
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
    },
  });
  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        questionGroupsWhere: {
          defaultForIncidents: {
            equals: true,
          },
        },
        where: {
          id: currentScheme,
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
          first: 24,
          orderBy: { name: SortOrder.Asc },
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
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
        data: {
          __typename: 'Query',
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
        },
        query: BusinessesSideListDocument,
        variables: {
          first: 24,
          orderBy: { name: SortOrder.Asc },
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
        },
      });
    },
  });
  const onEditAddress = (values: LocationData) => {
    setSaving(true);
    void updateBusinessLocation({
      variables: {
        data: {
          locations: {
            update: [
              {
                data: {
                  geoLat: { set: values.geoLat },
                  geoLng: { set: values.geoLng },
                },
                where: {
                  id: data?.business?.locations[0]?.id,
                },
              },
            ],
          },
          name: { set: data?.business?.name || '' },
          publicName: data?.business?.publicName || false,
        },
        where: {
          id: data?.business?.id,
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
        description: intl.formatMessage({
          defaultMessage: 'You new business has been add to alert.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Business has been created',
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
          data: {
            users: result.data?.removeUserFromBusiness.users,
          },
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
    },
  });

  const onRemoveBusiness = (userId: string) => {
    void removeUserFromBusiness({
      variables: {
        data: {
          id: userId,
        },
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        schemeWhere: {
          id: currentScheme,
        },
        where: {
          id: params.id,
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
        description: intl.formatMessage({
          defaultMessage: 'The business has been removed!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
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
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete this business?',
      }),
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
      data: {
        __typename: 'Query',
        business: {
          ...existingData.business,
          todos: [...existingData.business.todos, res.createTodo],
        },
      },
      query: BusinessDocument,
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
      data: {
        __typename: 'Query',
        business: update<BusinessQuery['business']>(existingData.business, {
          todos: {
            [existingData.business.todos.findIndex(
              ({ id }) => id === res.updateTodo?.id
            )]: {
              $set: res.updateTodo,
            },
          },
        }),
      },
      query: BusinessDocument,
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
      data: {
        __typename: 'Query',
        users: [...existingData.users, res.createUserInDatabase],
      },
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
      data: {
        __typename: 'Query',
        users: [...existingData.users, res.inviteExistingUser],
      },
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
        orderBy: {
          fullName: SortOrder.Asc,
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
      data: {
        __typename: 'Query',
        users: [...existingData.users, ...res.addUsersToBusiness.users],
      },
      query: ListBusinessUsersDocument,
      variables: {
        groupWhere: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
        orderBy: {
          fullName: SortOrder.Asc,
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

  return {
    actionsData,
    actionsLoading: !actionsData,
    addTodo,
    addUserVisible,
    businessId: params.id,
    completeTodoVisible,
    data,
    deleteConfirm,
    editVisible,
    inviteUserVisible,
    linkDemVisible,
    loading: !data,
    onEditAddress,
    onRemoveBusiness,
    saving,
    setCompleteTodoVisible,
    setViewTodoVisible,
    templatesData,
    templatesLoading,
    toggleAddTodo,
    toggleAddUser,
    toggleEdit,
    toggleInviteUser,
    toggleLinkDem,
    updateAddUsersToBusiness,
    updateTodo,
    updateTodoList,
    updateUsersList,
    updateUsersListExisting,
    usersData,
    usersLoading: !usersData,
    viewTodoVisible,
  };
};

export default useViewBusiness;
