import { useState } from 'react';
import type {
  BusinessOrderBy,
  BusinessWhereInput,
  InputMaybe,
  ListBusinessesQuery,
  ListBusinessesQueryVariables,
} from 'graphql/generated';
import {
  ListBusinessesDocument,
  QueryMode,
  SortOrder,
  useCreateBusinessMutation,
  useDeleteBusinessMutation,
  useListBusinessesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { BusinessData } from 'types/DataType';
import { useIntl } from 'react-intl';

interface Return {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addVisible: boolean;
  toggleAddVisible: () => void;
  linkVisible: boolean;
  toggleLinkVisible: () => void;
  onSubmit: (value: BusinessData) => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const useListBusinesses = (): Return => {
  const intl = useIntl();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [searchValue, onSearchChange] = useState('');
  const [addVisible, setAddVisible] = useState(false);
  const [linkVisible, setLinkVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const variables: {
    where?: InputMaybe<BusinessWhereInput> | undefined;
    orderBy?: InputMaybe<BusinessOrderBy>;
  } = {
    where: {
      name: {
        contains: searchValue,
        mode: QueryMode.Insensitive,
      },

      schemes: {
        some: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
    orderBy: {
      name: SortOrder.Asc,
    },
  };
  const { data } = useListBusinessesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const [createBusiness] = useCreateBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      setAddVisible(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Business has been created',
          id: 'uILUkO',
        }),
        description: intl.formatMessage({
          defaultMessage: 'You new business has been add to alert.',
          id: 'sJoRW/',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, result) => {
      const existingData = store.readQuery<
        ListBusinessesQuery,
        ListBusinessesQueryVariables
      >({
        query: ListBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: '',
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
          orderBy: {
            name: SortOrder.Asc,
          },
        },
      });

      if (existingData && result.data)
        store.writeQuery<ListBusinessesQuery, ListBusinessesQueryVariables>({
          query: ListBusinessesDocument,
          variables: {
            where: {
              name: {
                contains: '',
                mode: QueryMode.Insensitive,
              },
              schemes: {
                some: {
                  id: {
                    equals: currentScheme,
                  },
                },
              },
            },
            orderBy: {
              name: SortOrder.Asc,
            },
          },
          data: {
            listBusinesses: {
              total: (existingData?.listBusinesses.total || 0) + 1,
              businesses: [
                ...existingData.listBusinesses.businesses,
                result.data?.createBusiness,
              ],
            },
          },
        });
    },
  });

  const [deleteBusiness] = useDeleteBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
          id: 'U0zgbv',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The business has been removed!',
          id: 'mSae6x',
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
        ListBusinessesQuery,
        ListBusinessesQueryVariables
      >({
        query: ListBusinessesDocument,
        variables,
      });

      if (existingData === null) return;
      if (existingData.listBusinesses.businesses === undefined) return;

      store.writeQuery<ListBusinessesQuery, ListBusinessesQueryVariables>({
        query: ListBusinessesDocument,
        data: {
          listBusinesses: {
            ...existingData.listBusinesses,
            businesses: existingData?.listBusinesses?.businesses?.filter(
              (business) => business?.id !== res?.deleteBusiness?.id
            ),
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const deleteConfirm = (currentId: string) => {
    Modal.confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete this business?',
        id: 'e1WPCT',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
        id: 'JDJoIZ',
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
  const onSubmit = (values: BusinessData) => {
    void createBusiness({
      variables: {
        data: {
          name: values.name,
          publicName: values.publicName || false,
          schemes: {
            connect: [
              {
                id: currentScheme,
              },
            ],
          },
          parent: values.parent
            ? {
                connect: {
                  id: values.parent.id,
                },
              }
            : undefined,
          location: {
            building: values.locations[0].building,
            county: values.locations[0].county,
            postcode: values.locations[0].postcode || '',
            street: values.locations[0].street || '',
            townCity: values.locations[0].townCity || '',
          },
        },
      },
      optimisticResponse: {
        createBusiness: {
          id: `${Math.random()}`,
          name: values.name,
          fullName: values.name,
          publicName: values.publicName || false,
          totalUsers: 0,
          parent: values.parent
            ? {
                id: values.parent.id,
                name: values.parent.name,
              }
            : null,
          locations: [
            {
              id: `${Math.random()}`,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              full: `${values.locations[0].building}, ${values.locations[0].street}, ${values.locations[0].townCity}, ${values.locations[0].county}, ${values.locations[0].postcode}`,
            },
          ],
          demId: '',
        },
      },
    });
  };
  const toggleAddVisible = () => {
    setAddVisible(!addVisible);
  };

  const toggleLinkVisible = () => {
    setLinkVisible(!linkVisible);
  };

  return {
    data,
    loading: !data,
    onSearchChange,
    searchValue,
    addVisible,
    toggleAddVisible,
    linkVisible,
    toggleLinkVisible,
    onSubmit,
    saving,
    deleteConfirm,
  };
};

export default useListBusinesses;
