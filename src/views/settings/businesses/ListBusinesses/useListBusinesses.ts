import { useState } from 'react';
import type {
  ListBusinessesQuery,
  ListBusinessesQueryVariables,
} from 'graphql/generated';
import {
  ListBusinessesDocument,
  useCreateBusinessMutation,
  QueryMode,
  SortOrder,
  useListBusinessesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';
import type { BusinessData } from 'types/DataType';

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
}

const useListBusinesses = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const [searchValue, onSearchChange] = useState('');
  const [addVisible, setAddVisible] = useState(false);
  const [linkVisible, setLinkVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data } = useListBusinessesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
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
    },
  });

  const [createBusiness] = useCreateBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      setAddVisible(false);
      notification.success({
        message: 'Business has been created',
        description: 'You new business has been add to alert.',
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

  const onSubmit = (values: BusinessData) => {
    createBusiness({
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
  };
};

export default useListBusinesses;
